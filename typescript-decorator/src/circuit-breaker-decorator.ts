import CircuitBreaker from 'opossum'

// Creation of CircuitBreakerOptionsType as type which is defined using with CircuitBreakable for config
export type CircuitBreakerOptionsType = {
  timeout?: number,
  errorThresholdPercentage?: number,
  resetTimeout?: number
}

// Creation of CircuitBreakableConfig as type which is defined using with CircuitBreakable for config
export type CircuitBreakableConfig = {
  defaultResult: any,
  circuitBreakerConfig?: CircuitBreakerOptionsType
}


export const breakerOptions = {
  timeout: 500,
  errorThresholdPercentage: 10,
  resetTimeout: 5000
}

// Creation of CircuitBreakable as decorator which is defined using CircuitBreaker from opposum
export const CircuitBreakable = (circuitBreakableConfig : CircuitBreakableConfig): any => {
  return (_target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    return {
      get() {
        const wrapperFn = async (...args: any[]) => {
          const breaker = new CircuitBreaker(descriptor.value.bind(this),
            {
              ...breakerOptions,
              ...circuitBreakableConfig.circuitBreakerConfig,
            })

          return breaker.fire(...args)
          .then((res) => res)
            .catch((err) => {
              console.log('error', err)
              console.log(`Circuit breaker failed for request ${descriptor.value}`, err)
              return circuitBreakableConfig.defaultResult
            })
        }

        Object.defineProperty(this, propertyKey, {
          ...descriptor,
          value: wrapperFn
        })

        return wrapperFn
      }
    }
  }
}
