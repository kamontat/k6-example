import { Trend, Rate, Gauge } from "k6/metrics";
import { sleep } from "k6";

import { get } from "./_shared.js";

export const RTT = new Trend("RoundtripTime");
export const HeaderOK = new Rate("HeaderOK");
export const ContentSize = new Gauge("ContentSize");

/** @type {import("@types/k6/options").Options} */
export const options = {
  thresholds: {
    ContentSize: ["value == 615"],
    HeaderOK: ["rate > 0.99"],
    // must be within specified milliseconds.
    RoundtripTime: ["p(99)<1000", "p(70)<750", "avg<500", "min<300"],
  },
  tags: {
    owner: "kamontat",
  },
};

export default function () {
  const res = get("k8s");
  const contentOK = res.html("h1").text() === "Welcome to nginx!";

  HeaderOK.add(contentOK);
  ContentSize.add(res.body.length);
  RTT.add(res.timings.duration);

  sleep(1);
}
