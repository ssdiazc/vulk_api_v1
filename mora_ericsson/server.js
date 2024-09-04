const requestTemplate = require("./data/rq_template");
const customerData = require("./data/customers");
const utilities = require("../utilities/utilities.index");

module.exports = customerData.forEach(async (customer, index) => {
  let tempRQData = requestTemplate
    .replace("type_id_replace", customer.documentType)
    .replace("number_id_replace", customer.documentNumber);

  const requestOptions = {
    hostname: "apigwsfclaro.claro.com.co",
    port: 8070,
    path: "/PaymentReferencesMgmt/v1.0",
    method: "POST",
    headers: {
      ApkSitSfic: "pxt5eVIxqakYdeR18vQ20cgTk4uhiBUC",
      "Content-Type": "application/xml",
      "Content-Length": tempRQData.length,
    },
  };

  await utilities
    .sendRequest(tempRQData, customer.documentNumber, requestOptions)
    .then(
      (responseData) => {
        let hasDebt = responseData?.includes(
          "<collectionInd>true</collectionInd>"
        );
        let tempResponse = {
          index: customer.documentNumber,
          collectionInd: hasDebt,
          data: responseData,
        };
        utilities.addElementToFile(
          utilities.formattedDataToJSON(tempResponse),
          utilities.PAYMENT_REFERENCES_RESULT_FILE_NAME,
          utilities.RESULT_FILE_EXTENSION,
          customer.documentNumber
        );
      },
      (error) => {
        console.log(error);
      }
    );
});
