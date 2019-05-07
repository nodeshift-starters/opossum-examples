#!/bin/bash

oc get -o template route express-prometheus-minishift --template="http://{{.spec.host}}/api/greeting"
echo -e "\n"
oc get -o template route express-prometheus-minishift --template="http://{{.spec.host}}/metrics"
echo -e "\n"