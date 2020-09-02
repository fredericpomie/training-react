const crypto = require("crypto");

import { trim } from "lodash";

function hash(content) {
  return crypto.createHash("md5").update(content).digest("hex").slice(0, 6);
}
module.exports = {
  interceptors: {
    response: { use: jest.fn() },
    request: { use: jest.fn() },
  },
  create() {
    return this;
  },
  get(url, config) {
    return this.request({
      method: "GET",
      url,
      body: config ? config.params : null,
    });
  },
  post(url, body) {
    return this.request({
      method: "POST",
      url,
      body,
    });
  },
  put(url, body) {
    return this.request({
      method: "PUT",
      url,
      body,
    });
  },
  delete(url) {
    return this.request({
      method: "DELETE",
      url,
    });
  },
  request({ method, url, body, params }) {
    const parts = [method.toUpperCase(), trim(url.replace(/\W+/g, "_"), "_")];

    if (body) {
      if (body instanceof FormData) {
        let formData = "";
        for (const [key, value] of body.entries()) {
          formData += `${key}:${value}`;
        }
        parts.push(hash(formData));
      } else {
        parts.push(hash(JSON.stringify(body)));
      }
    }

    if (params) {
      parts.push(hash(JSON.stringify(params)));
    }

    const filename = `${__dirname}/responses/${parts.join("_")}.json`;

    return new Promise((resolve, reject) => {
      import(filename)
        .then((data) => {
          if (data.isAxiosError) {
            reject(data);
          } else {
            resolve({ data });
          }
        })
        .catch(() => {
          throw new Error(`Please create ${filename}`);
        });
    });
  },
};
