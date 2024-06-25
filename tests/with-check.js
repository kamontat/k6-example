import { check, sleep } from "k6";

import { get, tags } from "./_shared.js";

/** @type {import("@types/k6/options").Options} */
export const options = {
  stages: [
    { duration: "30s", target: 20 },
    { duration: "1m30s", target: 10 },
    { duration: "20s", target: 0 },
  ],
  tags,
};

export default function () {
  const res = get("k8s");
  check(res, { "status was 200": r => r.status == 200 });

  sleep(1);
}
