<template>
  <div id="app">
    <h1>Opossum Circuit Breaker Example</h1>
    <p>
      When you click the button here, this simple app calls a flakey web service
      that takes longer and longer to respond. The app circuit breaker is
      configured to timeout after
      <b>500ms</b> and execute a fallback command. Every <b>20 seconds</b>, the
      flakey service is reset and the pattern is repeated.
    </p>
    <p>
      If more than 3 errors are observed by the circuit within a single timeout
      period, then it begins to fail fast, rejecting the network call outright
      and executing the fallback function.
    </p>
    <p>
      This should allow you to see all of the various events that occur when
      using a circuit breaker.
    </p>
    <div>
      <button @click="makeRequest">Flakey Service</button>
      <button @click="clear">Clear</button>
    </div>
    <div>
      <p
        v-for="(element, index) in responseList.slice().reverse()"
        :key="index"
        :class="element.state.toLowerCase()"
      >
        <span>{{ element.state }} </span>
        <span>{{ element.body }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import opossum from 'opossum';

export default {
  name: 'App',
  data() {
    return {
      responseList: [],
      route: 'http://localhost:3000/flakeyService',
      circuit: undefined,
      circuitBreakerOptions: {
        timeout: 500,
        errorThresholdPercentage: 50,
        resetTimeout: 5000
      }
    };
  },
  methods: {
    makeRequest() {
      this.circuit.fire().catch(e => console.error(e));
    },
    clear() {
      this.responseList = [];
    }
  },
  created() {
    this.circuit = new opossum(
      () => axios.get(this.route),
      this.circuitBreakerOptions
    );
  },
  mounted() {
    this.circuit.fallback(() => ({
      body: `${this.route} unavailable right now. Try later.`
    }));

    this.circuit.on('success', result => {
      const event = {
        state: 'SUCCESS',
        body: `${JSON.stringify(result.data)}`
      };
      this.responseList.push(event);
    });

    this.circuit.on('timeout', () => {
      const event = {
        state: 'TIMEOUT',
        body: `${this.route} is taking too long to respond.`
      };
      this.responseList.push(event);
    });

    this.circuit.on('reject', () => {
      const event = {
        state: 'REJECTED',
        body: `The breaker for ${this.route} is open. Failing fast.`
      };
      this.responseList.push(event);
    });

    this.circuit.on('open', () => {
      const event = {
        state: 'OPEN',
        body: `The breaker for ${this.route} just opened.`
      };
      this.responseList.push(event);
    });

    this.circuit.on('halfOpen', () => {
      const event = {
        state: 'HALF_OPEN',
        body: `The breaker for ${this.route} is half open.`
      };
      this.responseList.push(event);
    });

    this.circuit.on('close', () => {
      const event = {
        state: 'CLOSE',
        body: `The breaker for ${this.route} has closed. Service OK.`
      };
      this.responseList.push(event);
    });

    this.circuit.on('fallback', data => {
      const event = {
        state: 'FALLBACK',
        body: `${JSON.stringify(data)}`
      };
      this.responseList.push(event);
    });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 auto;
  width: 900px;
}

button {
  box-shadow: inset 0px 1px 3px 0px #91b8b3;
  background: linear-gradient(to bottom, #768d87 5%, #6c7c7c 100%);
  background-color: #768d87;
  border-radius: 5px;
  border: 1px solid #566963;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 11px 23px;
  text-decoration: none;
  text-shadow: 0px -1px 0px #2b665e;
  outline: none;
  margin: 30px 10px 30px 0;
}
button:active {
  background: linear-gradient(to bottom, #6c7c7c 5%, #768d87 100%);
  background-color: #6c7c7c;
}

.clear {
  cursor: pointer;
  color: #3336ff;
}
.success {
  color: darkgreen;
}
.open {
  color: red;
}
.fallback {
  color: darkblue;
}
.rejected {
  color: darkorange;
}
.close {
  color: green;
}
.timeout {
  color: darksalmon;
}
</style>
