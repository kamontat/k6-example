import { browser } from "k6/experimental/browser";
import { endpoints } from "../_shared.js";

/** @type {import("@types/k6/options").Options} */
export const options = {
  scenarios: {
    ui: {
      executor: "shared-iterations",
      options: {
        browser: {
          type: "chromium",
        },
      },
      vus: 1,
      tags: {
        owner: "kamontat",
        test_type: "b1",
        test_name: "simple",
      },
    },
  },
};

export default async function () {
  const page = browser.newPage();

  try {
    await page.goto(endpoints.k8s);
    page.screenshot({ path: "screenshots/simple.png" });
  } finally {
    page.close();
  }
}
