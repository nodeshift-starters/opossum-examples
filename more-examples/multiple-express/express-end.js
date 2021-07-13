const express = require('express');
const CircuitBreaker = require('opossum');

const randomFailure = (echo) => {
  return Date.now() % 5 === 0 ? Promise.reject("\n") : Promise.resolve(echo);
};

const options = {};
const breaker = new CircuitBreaker(randomFailure, options);
const app = express();

app.get('/', (req, res) => {
  breaker.fire('\n')
    .then((result) => {
      result += `success: ${breaker.stats.successes}`;
      res.send(result);
    })
    .catch((err) => {
      const { failures, fallbacks, rejects, timeouts } = breaker.stats;
      err += `failures: ${failures}, fallbacks: ${fallbacks}, rejects: ${rejects}, timeouts: ${timeouts}`;
      res.send(err);
    });
});

app.listen(3000);
