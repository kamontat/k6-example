import http from "k6/http";

export const endpoints = {
  k6: "https://test.k6.io",
  k8s: "https://k6-test-server.cognius.net",
};

export const tags = {
  owner: "kamontat",
};

/**
 * @param {keyof endpoints} key
 */
export const get = key => {
  return http.get(endpoints[key]);
};
