// Stress testing assesses how the system performs
// when loads are heavier than usual.
// https://grafana.com/docs/k6/latest/testing-guides/test-types/stress-testing/

import { sleep, check } from "k6";
import { get } from "./_shared.js";

/** @type {import("@types/k6/options").Options} */
export const options = {
  stages: [
    { duration: "5m", target: 200 },
    { duration: "30m", target: 200 },
    { duration: "5m", target: 0 },
  ],
  tags: {
    owner: "kamontat",
    test_type: "z3",
    test_name: "stress",
  },
};

export default () => {
  const res = get("k8s");
  check(res, {
    "check header": r => r.html("h1").text() === "Welcome to nginx!",
  });

  sleep(1);
};
