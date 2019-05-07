'use strict';

const opossum = require('opossum');
const express = require('express');
const bodyParser = require('body-parser');
const probe = require('kube-probe');

const app = express();
const port = process.argv[2] || 8080;
const circuit = opossum(somethingThatCouldFail);

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
  response.send(circuit.metrics.metrics);
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

function somethingThatCouldFail(echo) {
  return (Date.now() % 5 === 0)
    ? Promise.reject(new Error('Random failure'))
    : Promise.resolve(echo);
}