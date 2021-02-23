const express = require('express');
const util = require('util');
const mysql = require('mysql');
const CircuitBreaker = require('opossum');

const app = express();

const config = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test',
};

// thanks for this approach: https://codeburst.io/node-js-mysql-and-async-await-6fb25b01b628
function makeDb() {
  const connection = mysql.createConnection(config);
  return {
    query(sql, args) {
      return util.promisify(connection.query).call(connection, sql, args);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    },
  };
}

const options = {};
const breaker = new CircuitBreaker(mysqlQuery, options);

app.get('/', (req, res) => {
  breaker
    .fire('DO SLEEP(11)')
    .then((result) => {
      result += `success: ${breaker.stats.successes}`;
      res.send(result);
    })
    .catch((err) => {
      err += ` failures: ${breaker.stats.failures}, timeouts: ${breaker.stats.timeouts}`;
      res.send(err);
    });
});

async function mysqlQuery(query) {
  const db = makeDb();
  try {
    return await db.query(query);
  } catch (err) {
    console.error(err);
  } finally {
    await db.close();
  }
}

app.listen(3000);
