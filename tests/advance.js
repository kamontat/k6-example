import http from "k6/http";
import exec from "k6/execution";

import { sleep } from "k6";
import { endpoints } from "./_shared.js";

const endpoint = endpoints.k8s;

// NOTES: Add types for autocomplete
/** @type {import("@types/k6/options").Options} */
export const options = {
  vus: 10,
  iterations: 10,
  // NOTES: Add tags for search on Grafana
  tags: {
    owner: "kamontat",
  },
};

export default function () {
  http.get(endpoint);

  // NOTES: Show information from each execution
  console.log(`Execution context
    Instance info
    -------------
    Vus active: ${exec.instance.vusActive}
    Iterations completed: ${exec.instance.iterationsCompleted}
    Iterations interrupted:  ${exec.instance.iterationsInterrupted}
    Iterations completed:  ${exec.instance.iterationsCompleted}
    Iterations active:  ${exec.instance.vusActive}
    Initialized vus:  ${exec.instance.vusInitialized}
    Time passed from start of run(ms):  ${exec.instance.currentTestRunDuration}
    
    Scenario info
    -------------
    Name of the running scenario: ${exec.scenario.name}
    Executor type: ${exec.scenario.executor}
    Scenario start timestamp: ${exec.scenario.startTime}
    Percenatage complete: ${exec.scenario.progress}
    Iteration in instance: ${exec.scenario.iterationInInstance}
    Iteration in test: ${exec.scenario.iterationInTest}
    
    Test info
    ---------
    All test options: ${JSON.stringify(exec.test.options)}
    
    VU info
    -------
    Iteration id: ${exec.vu.iterationInInstance}
    Iteration in scenario: ${exec.vu.iterationInScenario}
    VU ID in instance: ${exec.vu.idInInstance}
    VU ID in test: ${exec.vu.idInTest}
    Metrics data: ${JSON.stringify(exec.vu.metrics.metadata)}
    Metrics tags: ${JSON.stringify(exec.vu.metrics.tags)}`);

  sleep(1);
}
