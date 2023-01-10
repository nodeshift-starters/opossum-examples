import { CircuitBreakable } from "./circuit-breaker-decorator"

export class CircuitBreakerExample {
  constructor() {
    
  }

  // usage of CircuitBreakable as decorator which is defined using CircuitBreaker from opposum
  @CircuitBreakable({
    defaultResult: '', // default response of the method below
    circuitBreakerConfig: {
      timeout: 200, // custom timeout for this method
      errorThresholdPercentage: 20, // custom errorThresholdPercentage for this method
      resetTimeout: 3000 // custom resetTimeout for this method
    }
  })
  async someAsyncMethodThatNeedNetworkCall(): Promise<any> {
    let data
    // code that get data asynchronously that has risk to fail
    return data
  }
}
