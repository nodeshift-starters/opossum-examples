# prometheus example

Example based on the blog post: https://developers.redhat.com/blog/2018/12/21/monitoring-node-js-applications-on-openshift-with-prometheus/

## How to setup and run

1. Clone this repository
2. Start minishift: `./scripts/minishift-start.sh`
3. Install prometheus `./scripts/install-prometheus.sh`
4. Deploy the app:  `./scripts/deploy-app.sh`
5. Run the bench test `./scripts/bench-test.sh`
6. Get app URLs: `./scripts/get-app-url.sh`
7. Access prometheus server URL and execute the PromQL associated with the circuit to see the results.

