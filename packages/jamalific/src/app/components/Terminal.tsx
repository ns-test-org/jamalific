'use client';

import { useState, useEffect, useRef } from 'react';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: 'output',
      content: 'Welcome to Simple Web Terminal v1.0',
      timestamp: new Date()
    },
    {
      type: 'output',
      content: 'Type "help" for available commands.',
      timestamp: new Date()
    }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Focus input on mount and when clicking terminal
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();
    
    // Add command to history
    if (trimmedCommand && !commandHistory.includes(trimmedCommand)) {
      setCommandHistory(prev => [...prev, trimmedCommand]);
    }
    
    // Add input line
    setLines(prev => [...prev, {
      type: 'input',
      content: `$ ${command}`,
      timestamp: new Date()
    }]);

    // Process command
    let output = '';
    let isError = false;

    switch (trimmedCommand) {
      case '':
        // Empty command, just show prompt
        break;
      case 'help':
        output = `Available commands:
  help     - Show this help message
  clear    - Clear the terminal
  echo     - Echo back text (usage: echo [text])
  date     - Show current date and time
  whoami   - Show current user
  pwd      - Show current directory
  ls       - List directory contents
  about    - About this terminal`;
        break;
      case 'clear':
        setLines([]);
        setCurrentInput('');
        return;
      case 'date':
        output = new Date().toString();
        break;
      case 'whoami':
        output = 'guest';
        break;
      case 'pwd':
        output = '/home/guest';
        break;
      case 'ls':
        output = 'documents  downloads  pictures  videos';
        break;
      case 'about':
        output = `Simple Web Terminal Test App
Built with Next.js and React
A demonstration of terminal-like interface in the browser`;
        break;
      default:
        if (trimmedCommand.startsWith('echo ')) {
          const text = command.slice(5);
          output = text || '';
        } else {
          output = `Command not found: ${trimmedCommand}. Type 'help' for available commands.`;
          isError = true;
        }
    }

    // Add output if there is any
    if (output) {
      setLines(prev => [...prev, {
        type: isError ? 'error' : 'output',
        content: output,
        timestamp: new Date()
      }]);
    }

    setCurrentInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className="w-full max-w-4xl mx-auto bg-black border border-orange-500 rounded-lg overflow-hidden shadow-2xl"
      onClick={handleTerminalClick}
    >
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-orange-500">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
        </div>
        <div className="text-orange-400 text-sm font-mono">
          Terminal
        </div>
        <div className="w-16"></div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="h-96 overflow-y-auto p-4 font-mono text-sm"
      >
        {lines.map((line, index) => (
          <div key={index} className="mb-1">
            {line.type === 'input' && (
              <div className="text-orange-400">{line.content}</div>
            )}
            {line.type === 'output' && (
              <div className="text-orange-300 whitespace-pre-line">{line.content}</div>
            )}
            {line.type === 'error' && (
              <div className="text-red-400">{line.content}</div>
            )}
          </div>
        ))}
        
        {/* Current Input Line */}
        <div className="flex items-center text-orange-400">
          <span className="mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-orange-400 font-mono"
            placeholder="Type a command..."
            autoComplete="off"
            spellCheck="false"
          />
          <span className="animate-pulse text-orange-400">█</span>
        </div>
      </div>
    </div>
  );
}


