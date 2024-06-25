// Run to verify that the system works well under typical load.
// Typical load might be a regular day in production or an average moment.
// https://grafana.com/docs/k6/latest/testing-guides/test-types/load-testing/

import { sleep, check } from "k6";
import { get } from "./_shared.js";

/** @type {import("@types/k6/options").Options} */
export const options = {
  stages: [
    { duration: "5m", target: 100 },
    { duration: "30m", target: 100 },
    { duration: "5m", target: 0 },
  ],
  tags: {
    ...tags,
    test_type: "z2",
    test_name: "volume",
  },
};

export default () => {
  const res = get("k8s");
  check(res, {
    "check header": r => r.html("h1").text() === "Welcome to nginx!",
  });

  sleep(1);
};
