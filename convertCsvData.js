const fs = require('fs');
const Papa = require('papaparse');
const csvFile = fs.createReadStream('./OCC_MASTER_Sept29_ACTIVE-FINAL - OCC_ACTV_Sept29.csv');

let csvData = [];

Papa.parse(csvFile, {
    step: function(result) {
        csvData.push(result.data)
    },
    complete: function() {
        console.log(csvData);
    }
});

module.exports = csvData



