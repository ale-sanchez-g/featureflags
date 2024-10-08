import React, { useState } from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';
// import sendMetricToDynatrace from './SendMetrics.js';

const ClassicCalculator = () => {
    const { advanceFunctions } = useFlags();
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handleClick = (value) => {
        setInput(input + value);
    };

    const handleClear = () => {
        setInput('');
        setResult('');
      };

    const handleCalculate = () => {
    try {
        let startTime = new Date()
        // eslint-disable-next-line no-eval
        setResult(eval(input).toString());
        let endTime = new Date()
        var diff = endTime - startTime;
        console.log('Time taken to calculate: ', diff);
        // sendMetricToDynatrace('classicCalculation,app="calculator"', diff)
    } catch (error) {
        setResult('Error');
    }
    };

  return (
    <div>
      <h1 className="welcome-title">Classic Calculator</h1>
      <div className="calculator">
        <div className="display">
            <div className="input">{input}</div>
            <div className="result">{result}</div>
        </div>
        <div className="buttons">
            <button onClick={handleClear}>C</button>
            <button onClick={() => handleClick('/')}>/</button>
            <button onClick={() => handleClick('*')}>*</button>
            <button onClick={() => handleClick('-')}>-</button>

            <button onClick={() => handleClick('7')}>7</button>
            <button onClick={() => handleClick('8')}>8</button>
            <button onClick={() => handleClick('9')}>9</button>
            <button onClick={() => handleClick('+')}>+</button>

            <button onClick={() => handleClick('4')}>4</button>
            <button onClick={() => handleClick('5')}>5</button>
            <button onClick={() => handleClick('6')}>6</button>
            <button onClick={handleCalculate}>=</button>

            <button onClick={() => handleClick('1')}>1</button>
            <button onClick={() => handleClick('2')}>2</button>
            <button onClick={() => handleClick('3')}>3</button>
            {advanceFunctions && <button className="special-key" onClick={() => handleClick('(')}>(</button>}

            <button className="zero" onClick={() => handleClick('0')}>0</button>
            <button onClick={() => handleClick('.')}>.</button>
            {advanceFunctions && <button className="special-key" onClick={() => handleClick(')')}>)</button>}

        </div>
      </div>
    </div>
  );
};

export default ClassicCalculator;