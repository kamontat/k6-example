#!/usr/bin/env bash

K6_BROWSER_EXECUTABLE_PATH="$(npx @puppeteer/browsers install chrome@stable | sed -n 's/^chrome@[^ ]* //p')"
K6_BROWSER_HEADLESS=true

export K6_BROWSER_EXECUTABLE_PATH
export K6_BROWSER_HEADLESS
"$PWD/scripts/run.sh" "$@"
