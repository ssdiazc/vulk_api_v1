const https = require("https");
const utilities = require("../utilities/utilities.index");

module.exports = {
  sendRequest: async function (inputData, index, requestOptions) {
    return new Promise((resolve, reject) => {
      const req = https.request(requestOptions, (res) => {
        let responseBody = "";

        res.on("data", (chunk) => {
          responseBody += chunk;
        });

        res.on("end", () => {
          resolve(responseBody);
        });
      });

      req.on("error", (err) => {
        reject(err);
      });

      req.write(inputData);
      req.end();
    });
  },
};
