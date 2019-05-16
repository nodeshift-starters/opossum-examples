#!/bin/bash

APPURL=$(oc get -o template route express-prometheus-minishift --template="http://{{.spec.host}}/api/greeting")

# 10 requests
# 2 concurrent requests
ab -n 10 -c 2 $APPURL
