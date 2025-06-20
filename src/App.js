import React, { useState, useEffect } from 'react';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import NameInput from './modules/NameInput';
import { getBrowserInfo } from './browserInfo';
import ClassicCalculator from './modules/ClassicCalculator';
import ScientificCalculator from './modules/ScientificCalculator';
import FunkyDemo from './modules/FunkyDemo';

import './App.css';

function App() {
  const { showNameInput, calculatorStyle, demoFlag } = useFlags();
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
  

  // Check if the demoFlag is enabled
  // If enabled, display a funky demo mode with a spinning emoji and a welcome message
  // This will create a welcome page and not load the calculators
  if (demoFlag) {
    return (
      <div className="App">
        <FunkyDemo />
      </div>
    );
  }


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
        <ScientificCalculator client={ldClient} />
      </div>
    );
  }
}

export default App;
