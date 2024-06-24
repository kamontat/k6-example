// focuses on extended periods of averaging-load.
// https://grafana.com/docs/k6/latest/testing-guides/test-types/soak-testing/

import { sleep, check } from "k6";
import { get } from "./_shared.js";

/** @type {import("@types/k6/options").Options} */
export const options = {
  stages: [
    { duration: "5m", target: 100 },
    { duration: "8h", target: 100 },
    { duration: "5m", target: 0 },
  ],
  tags: {
    owner: "kamontat",
    test_type: "z4",
    test_name: "soak",
  },
};

export default () => {
  const res = get("k8s");
  check(res, {
    "check header": r => r.html("h1").text() === "Welcome to nginx!",
  });

  sleep(1);
};
