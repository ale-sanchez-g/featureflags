import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initialize } from '@harnessio/ff-javascript-client-sdk';

const sdkKey = 'fbe5ab03-ff85-4f42-9984-c12bae758b0d'; // Replace with your actual SDK key

const client = initialize(sdkKey, {
  identifier: 'reactclientsdk', // Replace with your user identifier
  attributes: {
    email: 'hello@devops1.com.au' // Replace with your user attributes
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));

const Main = () => {
  const [isFeatureEnabled, setIsFeatureEnabled] = useState(false);

  useEffect(() => {
    client.on('ready', () => {
      const flagValue = client.variation('My_Test_Flag', false); // Replace with your feature flag key
      setIsFeatureEnabled(flagValue);
    });
  }, []);

  return (
    <React.StrictMode>
      {isFeatureEnabled ? <App /> : <div>We are on maintanance MODE!</div>}
    </React.StrictMode>
  );
};

root.render(<Main />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();