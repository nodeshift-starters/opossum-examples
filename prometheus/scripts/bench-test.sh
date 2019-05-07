#!/bin/bash

ab -n 500000 -c 100 http://express-prometheus-minishift-myproject.192.168.99.100.nip.io/api/greeting
