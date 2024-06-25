// Run to verify that the system works well under minimal load
// and to gather baseline performance values.
// https://grafana.com/docs/k6/latest/testing-guides/test-types/smoke-testing/

import { sleep, check } from "k6";
import { get } from "./_shared.js";

/** @type {import("@types/k6/options").Options} */
export const options = {
  vus: 3,
  duration: "1m",
  tags: {
    ...tags,
    test_type: "z1",
    test_name: "smoke",
  },
};

export default () => {
  const res = get("k8s");
  check(res, {
    "check header": r => r.html("h1").text() === "Welcome to nginx!",
  });

  sleep(1);
};
