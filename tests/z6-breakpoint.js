// Breakpoint testing aims to find system limits.
// https://grafana.com/docs/k6/latest/testing-guides/test-types/breakpoint-testing/

import { sleep, check } from "k6";
import { get } from "./_shared.js";

/** @type {import("@types/k6/options").Options} */
export const options = {
  executor: "ramping-arrival-rate",
  stages: [{ duration: "1h", target: 50000 }],
  tags: {
    ...tags,
    test_type: "z6",
    test_name: "breakpoint",
  },
  thresholds: {
    checks: ["rate>0.9"],
  },
};

export default () => {
  const res = get("k8s");
  check(res, {
    "check header": r => r.html("h1").text() === "Welcome to nginx!",
    "status ok": r => r.status === 200,
  });

  sleep(1);
};
