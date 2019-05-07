# prometheus example

Example based on the blog post: https://developers.redhat.com/blog/2018/12/21/monitoring-node-js-applications-on-openshift-with-prometheus/


## Customize for your app

Change the name of your app (replace all the entries on each file):

. [package.json](https://github.com/nodeshift-starters/opossum-examples/prometheus/blob/master/package.json)

. [get-app-url.sh](https://github.com/nodeshift-starters/opossum-examples/prometheus/blob/master/get-app-url.sh)

. [prometheus.yml](https://github.com/nodeshift-starters/opossum-examples/prometheus/blob/master/prometheus.yml)

. [bench-test.sh](https://github.com/nodeshift-starters/opossum-examples/prometheus/blob/master/bench-test.sh)

## How to setup and run 

1. Clone this repository
2. Start minishift: `./scripts/minishift-start.sh`
3. Deploy the app:  `./scripts/deploy-app.sh`
4. Get app URLs: `./scripts/get-app-url.sh`
5. Install prometheus `./scripts/install-prometheus.sh`
6. Run the bench test `./scripts/bench-test.sh`
7. Access prometheus URL: `https://prom-myproject.192.168.99.100.nip.io/`
8. Execute the PromQL: `my_application:hello_duration_sum / my_application:hello_duration_count`

## Versions

```
oc version
oc v3.11.0+0cbc58b

minishift version
minishift v1.33.0+ba29431

node --version
v10.15.3

docker version
Client:
 Version:           18.09.4
 API version:       1.39
 Go version:        go1.10.8
 Git commit:        d14af54
 Built:             Wed Mar 27 18:36:04 2019
 OS/Arch:           linux/amd64
 Experimental:      false

Server: Docker Engine - Community
 Engine:
  Version:          18.09.4
  API version:      1.39 (minimum version 1.12)
  Go version:       go1.10.8
  Git commit:       d14af54
  Built:            Wed Mar 27 18:04:46 2019
  OS/Arch:          linux/amd64
  Experimental:     false

cat /etc/redhat-release 
Fedora release 29 (Twenty Nine)
```

