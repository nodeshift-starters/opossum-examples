'use strict';

const Opossum = require('opossum');
const PrometheusMetrics = require('opossum-prometheus');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.argv[2] || 8080;
const circuit = new Opossum(somethingThatCouldFail, {
  errorThresholdPercentage: 10,
  resetTimeout: 2000
});

// Provide the circuit to the Opossum Prometheus plugin module
const prometheus = new PrometheusMetrics([circuit]);


let failureCounter = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/greeting', (request, response) => {
  const name = request.query.name ? request.query.name : 'World';
  circuit.fire(`Hello, ${name}`)
    .then(result => {
      response.send({
        content: result
      });
    })
    .catch(err => {
      response.send({
        error: err.toString()
      });
    });
});

probe(app);

app.get('/metrics', (request, response) => {
  response.send(prometheus.metrics);
});

app.use('/ready', (request, response) => {
  return response.sendStatus(200);
});

app.use('/live', (request, response) => {
  return response.sendStatus(200);
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

function somethingThatCouldFail(echo) {
  if (Date.now() % 5 === 0) {
    console.log(++failureCounter);
    return Promise.reject(new Error(`Random failure ${failureCounter}`));
  } else {
    return Promise.resolve(echo);
  }
}
