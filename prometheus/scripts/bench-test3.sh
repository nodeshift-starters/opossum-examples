#!/bin/bash

APPURL=$(oc get -o template route express-prometheus-minishift --template="http://{{.spec.host}}/api/greeting")

# 80 requests
# 10 concurrent requests
# keep alive header along the request
ab -n 80 -c 10 -k $APPURL