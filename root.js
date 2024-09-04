const dataUtilities = require("./utilities/data.utilities");
const constantsUtilites = require("./utilities/constantes.utilities");
const prompt = require("prompt-sync")();

console.log(`Possible file names and extensions:`);
console.log(constantsUtilites);
const fileName = prompt("type the file name that you want to delete:");
const fileExt = prompt("type the file extension that you want to delete:");

dataUtilities.deleteFile(fileName, fileExt);
