// A spike test verifies whether the system survives
// and performs under sudden and massive rushes of utilization.
// https://grafana.com/docs/k6/latest/testing-guides/test-types/spike-testing/

import { sleep, check } from "k6";
import { get } from "./_shared.js";

/** @type {import("@types/k6/options").Options} */
export const options = {
  stages: [
    { duration: "2m", target: 2000 },
    { duration: "1m", target: 0 },
  ],
  tags: {
    owner: "kamontat",
    test_type: "z5",
    test_name: "spike",
  },
};

export default () => {
  const res = get("k8s");
  check(res, {
    "check header": r => r.html("h1").text() === "Welcome to nginx!",
  });

  sleep(1);
};
