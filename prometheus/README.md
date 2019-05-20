# prometheus example

Example based on the blog post: https://developers.redhat.com/blog/2018/12/21/monitoring-node-js-applications-on-openshift-with-prometheus/

## How to setup and run 

1. Clone this repository
2. Start minishift: `./scripts/minishift-start.sh`
3. Deploy the app:  `./scripts/deploy-app.sh`
4. Get app URLs: `./scripts/get-app-url.sh`
5. Install prometheus `./scripts/install-prometheus.sh`
6. Run the bench test `./scripts/bench-test.sh`
7. Access prometheus URL: `https://prom-myproject.192.168.99.100.nip.io/` and execute the PromQL associated with the opossum to see the results.

