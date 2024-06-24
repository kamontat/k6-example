#!/usr/bin/env bash

K6_PROMETHEUS_RW_SERVER_URL=https://prometheus-sumato.cognius.net/api/v1/write \
  k6 run -o experimental-prometheus-rw "$@"
