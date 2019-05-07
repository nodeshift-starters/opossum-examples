#!/bin/bash

minishift config set vm-driver virtualbox
minishift config set cpus 2
minishift config set memory 4096

minishift start