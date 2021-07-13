# Opossum Multiple-Express Example

This example uses multiple express.js servers and a client to perform the requests. The opossum module is present only to the last express.js server in the chain.

### Architecture
client -> express (middleman) -> express (end)

### Steps

```sh
$ npm install
$ npm start
```

Open a new terminal and run:

```sh
$ npm test
```

Result: 

```
success: 153

success: 154

failures: 27, fallbacks: 0, rejects: 0, timeouts: 0

failures: 28, fallbacks: 0, rejects: 0, timeouts: 0

success: 155

success: 156

success: 157

success: 158

success: 159

success: 160

success: 161

failures: 29, fallbacks: 0, rejects: 0, timeouts: 0

...
```

This example is based on this use case: https://github.com/nodeshift/opossum/issues/181
