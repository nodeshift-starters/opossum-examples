#!/bin/bash

echo
echo "Application API"
oc get -o template route express-prometheus-minishift --template="http://{{.spec.host}}/api/greeting"
echo -e "\n\nApplication metrics"
oc get -o template route express-prometheus-minishift --template="http://{{.spec.host}}/metrics"
echo -e "\n\nPrometheus server"
oc get -o template route prom --template="http://{{.spec.host}}/"
echo