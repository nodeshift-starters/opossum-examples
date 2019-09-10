import Controller from '@ember/controller';
import circuitBreaker from 'opossum';

const circuitrBreakerOptions = { timeout: 500, maxFailures: 3, resetTimeout: 5000 };

export default Controller.extend({
  init () {
    this._super(...arguments);
    const self = this;
    this.responses = [];
    this.circuit = new circuitBreaker(() => fetch('flakeyService').then((result) => {
      if (result.status > 399) {
        return Promise.reject(result);
      }

      return result;
    }), circuitrBreakerOptions);
    this.circuit.on('success', async (result) => {
      const res = await result.json();
      self.responses.pushObject({body: res.body, state: 'SUCCESS'});
    });
    this.circuit.on('timeout', async () => {
      self.responses.pushObject({ state: `TIMEOUT`, body: `Route is taking too long to respond.` });
    });
    this.circuit.on('open', async () => {
      self.responses.pushObject({ state: `OPEN`, body: `The breaker for Route just opened.` });
    });
    this.circuit.on('reject', async () => {
      self.responses.pushObject({ state: `REJECTED`, body: `The breaker for Route is open. Failing fast.` });
    });
    this.circuit.on('halfOpen', async () => {
      self.responses.pushObject({ state: `HALF_OPEN`, body: `The breaker for Route is half open.` });
    });
    this.circuit.on('close', async () => {
      self.responses.pushObject({ state: `CLOSE`, body: `The breaker for Route has closed. Service OK.` });
    });
    this.circuit.on('fallback', async (result) => {
      self.responses.pushObject({ state: `FALLBACK`, body: result.body });
    });
    this.circuit.fallback(() => {
      return {body: 'Route is unavailable right now. Try Later'};
    });
  },
  actions: {
    makeRequest: async function () {
      await this.circuit.fire();//await fetch('/flakeyService');
      // const json = await response.json();
      // this.responses.pushObject(json)
    }
  }
});
