import CircuitBreaker from 'opossum';

const delay = (delay) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });

const breaker = new CircuitBreaker(delay);

breaker
  .fire(100)
  .then((_) => {
    console.log(
      'fires',
      breaker.stats.fires,
      'successes',
      breaker.stats.successes
    );
  })
  .catch((error) => console.error(error));
