import React, { useState, useEffect } from 'react';
import axios from 'axios';
import opossum from 'opossum';

import './App.css';

const App = () => {
  const [responseList, setResponseList] = useState([]);
  const [circuit, setCircuit] = useState(null);
  const [route] = useState('http://localhost:3000/flakeyService');
  const [circuitBreakerOptions] = useState({
    timeout: 500,
    errorThresholdPercentage: 50,
    resetTimeout: 5000,
  });

  useEffect(() => {
    const tmpCircuit = new opossum(
      () => axios.get(route),
      circuitBreakerOptions
    );
    setCircuit(tmpCircuit);
  }, [route, circuitBreakerOptions]);

  useEffect(() => {
    if (circuit === null) {
      return;
    }

    circuit.fallback(() => ({
      body: `${route} unavailable right now. Try later.`,
    }));

    circuit.on('success', result => {
      const event = {
        state: 'SUCCESS',
        body: `${JSON.stringify(result.data)}`,
      };
      setResponseList(list => [...list, event]);
    });

    circuit.on('timeout', () => {
      const event = {
        state: 'TIMEOUT',
        body: `${route} is taking too long to respond.`,
      };
      setResponseList(list => [...list, event]);
    });

    circuit.on('reject', () => {
      const event = {
        state: 'REJECTED',
        body: `The breaker for ${route} is open. Failing fast.`,
      };
      setResponseList(list => [...list, event]);
    });

    circuit.on('open', () => {
      const event = {
        state: 'OPEN',
        body: `The breaker for ${route} just opened.`,
      };
      setResponseList(list => [...list, event]);
    });

    circuit.on('halfOpen', () => {
      const event = {
        state: 'HALF_OPEN',
        body: `The breaker for ${route} is half open.`,
      };
      setResponseList(list => [...list, event]);
    });

    circuit.on('close', () => {
      const event = {
        state: 'CLOSE',
        body: `The breaker for ${route} has closed. Service OK.`,
      };
      setResponseList(list => [...list, event]);
    });

    circuit.on('fallback', data => {
      const event = {
        state: 'FALLBACK',
        body: `${JSON.stringify(data)}`,
      };
      setResponseList(list => [...list, event]);
    });
  }, [circuit, route]);

  const clearResponseList = () => {
    setResponseList([]);
  };

  const makeRequest = () => {
    circuit.fire().catch(e => console.error(e));
  };

  return (
    <div className="App">
      <h1>Opossum Circuit Breaker Example</h1>
      <p>
        When you click the button here, this simple app calls a flakey web
        service that takes longer and longer to respond. The app circuit breaker
        is configured to timeout after
        <b>500ms</b> and execute a fallback command. Every <b>20 seconds</b>,
        the flakey service is reset and the pattern is repeated.
      </p>
      <p>
        If more than 3 errors are observed by the circuit within a single
        timeout period, then it begins to fail fast, rejecting the network call
        outright and executing the fallback function.
      </p>
      <p>
        This should allow you to see all of the various events that occur when
        using a circuit breaker.
      </p>
      <div>
        <button onClick={makeRequest}>Flakey Service</button>
        <button onClick={clearResponseList}>Clear</button>
      </div>
      <div>
        {responseList
          .slice()
          .reverse()
          .map((element, index) => (
            <p key={index} className={element.state.toLowerCase()}>
              <span>{element.state} </span>
              <span>{element.body}</span>
            </p>
          ))}
      </div>
    </div>
  );
};

export default App;
