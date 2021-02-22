const express = require('express');
const axios = require('axios').default;

const app = express();

app.get('/', (req, res) => {
  axios.get('http://localhost:3000')
    .then(result => res.send(result.data))
    .catch(err => res.send(err));
});

app.listen(8080);
