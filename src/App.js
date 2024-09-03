import React, { useState, useEffect } from 'react';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import NameInput from './NameInput';
import { getBrowserInfo } from './browserInfo';

import './App.css';

function App() {
  const { showNameInput } = useFlags();
  const ldClient = useLDClient();
  const [name, setName] = useState('');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleNameSubmit = (name) => {
    setName(name);
  };

  useEffect(() => {
    if (name) {
      const { browserName, osName, platform } = getBrowserInfo();
      ldClient.identify({
        key: `context-key-${name.toLowerCase()}`,
        custom: {
          browser: browserName,
          os: osName,
          device: platform,
        },
      });
    }
  }, [ldClient, name]);
  
  if (showNameInput && !name) {
    return <NameInput onSubmit={handleNameSubmit} />;
  }

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleCalculate = () => {
    try {
      // eslint-disable-next-line no-eval
      setResult(eval(input).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <div>
      {showNameInput && <h1 className="welcome-title">Welcome, {name}!</h1>}
      <div className="App">
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
            <button className="zero" onClick={() => handleClick('0')}>0</button>
            <button onClick={() => handleClick('.')}>.</button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
