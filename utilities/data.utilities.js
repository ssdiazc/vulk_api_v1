const fs = require("fs");
const constantsUtilities = require("./constants.utilities");
module.exports = {
  formattedDataToJSON(dataFromOrigin) {
    let responseData = "";
    try {
      let buffer = Buffer.from(dataFromOrigin);
      responseData = JSON.parse(buffer?.toString());
    } catch {
      responseData = [dataFromOrigin];
    }
    return responseData;
  },

  writeFile(data, fileName, ext, index) {
    fs.writeFile(
      `.${constantsUtilities.RESULT_LOCATION_PATH}${fileName}.${ext}`,
      JSON.stringify(data).toString(),
      (error) => {
        if (error) {
          console.error(error);
          throw error;
        }
        console.log(`${index} - data.json written correctly`);
      }
    );
  },

  addElementToFile: async function (tempResponse, fileName, ext, index) {
    fs.readFile(
      `.${constantsUtilities.RESULT_LOCATION_PATH}${fileName}.${ext}`,
      (error, data) => {
        try {
          if (error) {
            if (error.code === "ENOENT") {
              this.writeFile([tempResponse], fileName, ext, index);
            } else {
              console.error(error);
            }
          } else {
            const readedData = this.formattedDataToJSON(data);
            readedData.push(tempResponse);
            this.writeFile(readedData, fileName, ext, index);
          }
        } catch (error) {
          console.error(error);
        }
      }
    );
  },

  deleteFile(fileName, ext) {
    fs.unlinkSync(`${fileName}.${ext}`);
  },
};
