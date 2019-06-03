#!/bin/bash

minishift config set vm-driver virtualbox
minishift config set cpus 4
minishift config set memory 8GB

minishift start