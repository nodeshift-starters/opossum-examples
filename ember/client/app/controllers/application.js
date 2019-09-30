import Controller from '@ember/controller';
import circuitBreaker from 'opossum';

const circuitrBreakerOptions = { timeout: 500, maxFailures: 3, resetTimeout: 5000 };

export default Controller.extend({
  init () {
    this._super(...arguments);
    const self = this;
    this.responses = [];
    // Adding this just for access in the opossum events
    // We are specifying the name of the service in the fetch below to get around
    // CORS.  We've added a --proxy flag in the package.json, so Ember knows
    // where to the flakeyService is
    this.route = 'http://localhost:3001/flakeyService';
    this.circuit = new circuitBreaker(() => fetch('flakeyService').then((result) => {
      if (result.status > 399) {
        return Promise.reject(result);
      }

      return result;
    }), circuitrBreakerOptions);
    this.circuit.on('success', async (result) => {
      self.responses.pushObject({body: `${JSON.stringify(await result.json())}`, state: 'SUCCESS'});
    });
    this.circuit.on('timeout', async () => {
      self.responses.pushObject({ state: `TIMEOUT`, body: `${self.route} is taking too long to respond.` });
    });
    this.circuit.on('open', async () => {
      self.responses.pushObject({ state: `OPEN`, body: `The breaker for ${self.route} just opened.` });
    });
    this.circuit.on('reject', async () => {
      self.responses.pushObject({ state: `REJECTED`, body: `The breaker for ${self.route} is open. Failing fast.` });
    });
    this.circuit.on('halfOpen', async () => {
      self.responses.pushObject({ state: `HALF_OPEN`, body: `The breaker for ${self.route} is half open.` });
    });
    this.circuit.on('close', async () => {
      self.responses.pushObject({ state: `CLOSE`, body: `The breaker for ${self.route} has closed. Service OK.` });
    });
    this.circuit.on('fallback', async (result) => {
      self.responses.pushObject({ state: `FALLBACK`, body: `${JSON.stringify(result)}` });
    });
    this.circuit.fallback(() => {
      return {body: `${self.route} unavailable right now. Try later.`};
    });
  },
  actions: {
    makeRequest: async function () {
      await this.circuit.fire();
    },
    clear: function () {
      this.set('responses', []);
    }
  }
});
