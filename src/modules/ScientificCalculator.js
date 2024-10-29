import React, { useState } from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';

const ScientificCalculator = ({ client }) => {
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
            // Add random Synthetic delay to simulate a slow calculation in metrics
            // const delay = Math.floor(Math.random() * 5000) + 1000;
            // eslint-disable-next-line no-eval
            setResult(eval(input).toString());
            let endTime = new Date()
            let diff = (endTime - startTime);
            console.log('Time taken to calculate: ', diff);
            // Send data to LaunchDarkly using track
            client.track('calculationTime', { duration: diff });
            // sendMetricToDynatrace('classicCalculation,app="calculator"', diff)
        } catch (error) {
            setResult('Error');
            // Send data to LaunchDarkly using track
            client.track('errorCalculation', { calcError: true });
        }
    };

    const handleScientificFunction = (func) => {
        try {
            let startTime = new Date()
            // eslint-disable-next-line no-eval
            const value = eval(input);
            let result;
            switch (func) {
                case 'sin':
                    result = Math.sin(value);
                    break;
                case 'cos':
                    result = Math.cos(value);
                    break;
                case 'tan':
                    result = Math.tan(value);
                    break;
                case 'log':
                    result = Math.log10(value);
                    break;
                case 'ln':
                    result = Math.log(value);
                    break;
                case 'sqrt':
                    result = Math.sqrt(value);
                    break;
                case 'square':
                    result = Math.pow(value, 2);
                    break;
                default:
                    result = 'Error';
            }
            setResult(result.toString());
            let endTime = new Date()
            let diff = (endTime - startTime);
            // Send data to LaunchDarkly using track
            client.track('calculationTime', { duration: diff });
        } catch (error) {
            setResult('Error');
            // Send data to LaunchDarkly using track
            client.track('errorCalculation', { calcError: true });
        }
    };

    return (
        <div>
            <h1 className="welcome-title">Scientific Calculator</h1>
            <div className="calculator-advanced">
                <div className="display">
                    <div className="input">{input}</div>
                    <div className="result">{result}</div>
                </div>
                <div className="buttons">
                    <button className="operator" onClick={handleClear}>C</button>
                    <button className="operator" onClick={() => handleClick('/')}>/</button>
                    <button className="operator" onClick={() => handleClick('*')}>*</button>
                    <button className="operator" onClick={() => handleClick('-')}>-</button>
                    <button className="operator" onClick={() => handleClick('+')}>+</button>

                    <button className="operator" onClick={() => handleScientificFunction('sin')}>sin</button>
                    <button className="operator" onClick={() => handleScientificFunction('cos')}>cos</button>
                    <button onClick={() => handleClick('7')}>7</button>
                    <button onClick={() => handleClick('8')}>8</button>
                    <button onClick={() => handleClick('9')}>9</button>
                    
                    <button className="operator" onClick={() => handleScientificFunction('tan')}>tan</button>
                    <button className="operator" onClick={() => handleScientificFunction('log')}>log</button>
                    <button onClick={() => handleClick('4')}>4</button>
                    <button onClick={() => handleClick('5')}>5</button>
                    <button onClick={() => handleClick('6')}>6</button>



                    <button className="operator" onClick={() => handleScientificFunction('ln')}>ln</button>
                    <button className="operator" onClick={handleCalculate}>=</button>
                    <button onClick={() => handleClick('1')}>1</button>
                    <button onClick={() => handleClick('2')}>2</button>
                    <button onClick={() => handleClick('3')}>3</button>

                    <button className="operator" onClick={() => handleScientificFunction('sqrt')}>√</button>
                    <button className="operator"    onClick={() => handleScientificFunction('square')}>x²</button>
                    <button className="zero" onClick={() => handleClick('0')}>0</button>
                    <button onClick={() => handleClick('.')}>.</button>
                    {advanceFunctions && <button className="special-key" onClick={() => handleClick(')')}>)</button>}
                    {advanceFunctions && <button className="special-key" onClick={() => handleClick('(')}>(</button>}
                </div>
            </div>
        </div>
    );
};

export default ScientificCalculator;