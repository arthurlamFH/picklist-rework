const fs = require('fs');
const Papa = require('papaparse');
const csvFile = fs.createReadStream('./OCC_MASTER_Sept29_ACTIVE-FINAL - OCC_ACTV_Sept29.csv');

const { generatePickList } = require('./script');

let csvData = [];

Papa.parse(csvFile, {
    step: function(results) {
        csvData.push(results.data)
    },
    complete: function() {
        try {
            generatePickList(csvData, 'en');
            generatePickList(csvData, 'fr');
        } catch (error) {
            console.log(error)
        }
    }
});




