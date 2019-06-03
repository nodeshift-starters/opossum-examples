#!/bin/bash

APPURL=$(oc get -o template route express-prometheus-minishift --template="http://{{.spec.host}}/api/greeting")

# 80 requests
# 10 concurrent requests
# keep alive header along the request
for i in {1..60} ; do
  ab -n 1000 -c 100 -k $APPURL
  sleep 1
done