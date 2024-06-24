import http from "k6/http";
import { sleep } from "k6";

// Must have file extension
import { endpoints } from "./_shared.js";

const endpoint = endpoints.k8s;
export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 10,
  // A string specifying the total duration of the test run.
  duration: "30s",
};

export default function () {
  http.get(endpoint);
  sleep(1);
}
