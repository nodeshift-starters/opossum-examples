#!/bin/bash

APPURL=$(oc get -o template route express-prometheus-minishift --template="http://{{.spec.host}}/api/greeting")
ab -n 5000 -c 100 $APPURL
