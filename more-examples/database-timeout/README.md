# Basic example with a query that delays


Setup mysql container for the example using either docker or podman:
```
docker | podman pull mysql
docker | podman run --name my-db -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql
docker | podman container ls
docker | podman exec -it container_id_here bash
mysql -u root -p mysql
mysql> ALTER USER root IDENTIFIED WITH mysql_native_password BY 'password';
mysql> create database test;
```

Install and run:
```
npm install
npm start
```

Open another terminal and run:
```
curl -X GET localhost:3000
```

The circuit breaker will fire a mysql SQL statement that delays for 11 seconds
which is more than the default opossum timeout, and it will trigger
the circuit breaker failure.

```
Result:
Error: Timed out after 10000ms failures: 1, timeouts: 1
```

