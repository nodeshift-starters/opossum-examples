#!/bin/bash

APPURL=$(oc get -o template route express-prometheus-minishift --template="http://{{.spec.host}}/api/greeting")

# 80K requests
# 100 concurrent requests
ab -n 80000 -c 100 $APPURL