const express = require("express");
const cors = require('cors');
const boom = require("@hapi/boom");

const app = express();

const delayInitValue = 20;
let delay = delayInitValue;

// reset delay every 20 seconds
setInterval(() => {
  if (delay !== delayInitValue) {
    delay = delayInitValue;
    console.log("Resetting flakey service delay to", delay);
  }
}, 20000);

app.use(cors());

app.get("/flakeyService", (req, res) => {
  console.log("Flakey service delay", delay);
  // if we're really slowing down, just reply with an error
  if (delay > 1000) {
    console.log("Long delay encountered, returning Error 423 (Locked)");
    const {
      output: { statusCode, payload },
    } = boom.locked("Flakey service is flakey");
    res.status(statusCode).send(payload);
    return;
  }

  setTimeout(() => {
    console.log("Replying with flakey response after delay of", delay);
    delay = delay * 2;
    res.send({
      body: "Flakey service response",
      delay,
    });
  }, delay);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
