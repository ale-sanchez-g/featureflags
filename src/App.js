import React, { useState, useEffect } from 'react';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import NameInput from './modules/NameInput';
import { getBrowserInfo } from './browserInfo';
import ClassicCalculator from './modules/ClassicCalculator';
import ScientificCalculator from './modules/ScientificCalculator';

import './App.css';

function App() {
  const { showNameInput, calculatorStyle } = useFlags();
  const ldClient = useLDClient();
  const [name, setName] = useState('');
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

  // Display Classic Calculator if classicCalc flag is true
  if (calculatorStyle) {
    return (
      <div className="App">
        <ClassicCalculator client={ldClient} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <ScientificCalculator />
      </div>
    );
  }
}

export default App;
