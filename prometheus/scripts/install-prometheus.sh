#!/bin/bash

# Create the prom secret
oc create secret generic prom --from-file=../yml/prometheus.yml
 
# Create the prom-alerts secret
oc create secret generic prom-alerts --from-file=../yml/alertmanager.yml
 
# Create the prometheus instance
oc process -f https://raw.githubusercontent.com/openshift/origin/master/examples/prometheus/prometheus-standalone.yaml | oc apply -f -