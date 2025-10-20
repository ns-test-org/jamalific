'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const Button = ({ onClick, className, children, ...props }: any) => (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-semibold rounded-lg transition-all duration-150 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-purple-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-purple-600 mb-2">Purple Calculator</h1>
          <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Display */}
        <div className="bg-purple-50 rounded-2xl p-6 mb-6 border-2 border-purple-100">
          <div className="text-right text-3xl font-mono text-purple-900 min-h-[40px] flex items-center justify-end overflow-hidden">
            {display}
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button
            onClick={clear}
            className="col-span-2 bg-purple-500 hover:bg-purple-600 text-white"
          >
            Clear
          </Button>
          <Button
            onClick={() => inputOperation('÷')}
            className="bg-purple-400 hover:bg-purple-500 text-white"
          >
            ÷
          </Button>
          <Button
            onClick={() => inputOperation('×')}
            className="bg-purple-400 hover:bg-purple-500 text-white"
          >
            ×
          </Button>

          {/* Row 2 */}
          <Button
            onClick={() => inputNumber('7')}
            className="bg-purple-100 hover:bg-purple-200 text-purple-800"
          >
            7
          </Button>
          <Button
            onClick={() => inputNumber('8')}
            className="bg-purple-100 hover:bg-purple-200 text-purple-800"
          >
            8
          </Button>
          <Button
            onClick={() => inputNumber('9')}
            className="bg-purple-100 hover:bg-purple-200 text-purple-800"
          >
            9
          </Button>
          <Button
            onClick={() => inputOperation('-')}
            className="bg-purple-400 hover:bg-purple-500 text-white"
          >
            -
          </Button>

          {/* Row 3 */}
          <Button
            onClick={() => inputNumber('4')}
            className="bg-purple-100 hover:bg-purple-200 text-purple-800"
          >
            4
          </Button>
          <Button
            onClick={() => inputNumber('5')}
            className="bg-purple-100 hover:bg-purple-200 text-purple-800"
          >
            5
          </Button>
          <Button
            onClick={() => inputNumber('6')}
            className="bg-purple-100 hover:bg-purple-200 text-purple-800"
          >
            6
          </Button>
          <Button
            onClick={() => inputOperation('+')}
            className="bg-purple-400 hover:bg-purple-500 text-white"
          >
            +
          </Button>

          {/* Row 4 */}
          <Button
            onClick={() => inputNumber('1')}
            className="bg-purple-100 hover:bg-purple-200 text-purple-800"
          >
            1
          </Button>
          <Button
            onClick={() => inputNumber('2')}
            className="bg-purple-100 hover:bg-purple-200 text-purple-800"
          >
            2
          </Button>
          <Button
            onClick={() => inputNumber('3')}
            className="bg-purple-100 hover:bg-purple-200 text-purple-800"
          >
            3
          </Button>
          <Button
            onClick={performCalculation}
            className="row-span-2 bg-purple-600 hover:bg-purple-700 text-white"
          >
            =
          </Button>

          {/* Row 5 */}
          <Button
            onClick={() => inputNumber('0')}
            className="col-span-2 bg-purple-100 hover:bg-purple-200 text-purple-800"
          >
            0
          </Button>
          <Button
            onClick={() => inputNumber('.')}
            className="bg-purple-100 hover:bg-purple-200 text-purple-800"
          >
            .
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-purple-600 text-sm">Simple & Beautiful</p>
        </div>
      </div>
    </div>
  );
}



