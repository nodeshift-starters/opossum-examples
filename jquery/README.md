# JQuery Example

This example exposes a simple service at the route `http://localhost:3000/flakeyService`.
For every request the service receives, the response time is increased.
[The service returns a `423 (Locked)` error if the response time is above 1000ms.](https://github.com/nodeshift-starters/opossum-examples/blob/main/jquery/index.js#L39) This example also has a web frontend at `http://localhost:3000/` for interacting with the service.

1. Navigate to the `examples/jquery/` directory	
  ```sh	
  $ cd examples/jquery/	
  ```

2. Start the server.
  ```sh
  $ npm install
  $ npm start
  ```

3. Browse to the web frontend at `http://localhost:3000` and click the _Flaky Service_ button repeatedly to interact with the service.
  Notice the response time increases with every interaction. Once the response time is greater than the [timeout setting](https://github.com/nodeshift-starters/opossum-examples/blob/main/jquery/app.js#L16), the [fallback action](https://github.com/nodeshift-starters/opossum-examples/blob/main/jquery/app.js#L23) is triggered.

