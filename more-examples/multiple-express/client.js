const http = require('http');

const options = {
  hostname: '127.0.0.1',
  port: 8080,
  path: '/',
  method: 'GET',
};

const makeRequest = () => {
  const request = http.request(options, response => {
    response.on('data', data => {
      console.log(data.toString());
    });
  });

  request.on('error', error => {
    console.error(error);
  });

  request.end();
};

module.exports = {
  makeRequest,
};
