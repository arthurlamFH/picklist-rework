const { saveJSON } = require('./saveJSON');

function generatePickList(csvData, language) {
    let trimData = []
    let occupationList = {
        "listLabel": "Occupation List",
        "list": []
    };

    csvData.forEach(function(ele) {
        let label = capitalizeFirstLetter(ele[0]);
        let temp = (language === 'en') ? capitalizeFirstLetter(ele[4]) : capitalizeFirstLetter(ele[ele.length - 1]);
        let categoryCode = addZeros(ele[1]);
        let occupationCode = addZeros(ele[2]);

        if(occupationCode === '000') {
            trimData = [];
            occupationList.list.push({
                "label": label,
                "value": `${label} - ${categoryCode}`,
                "listLabel": `${label} - Description`,
                "list": trimData
            });
        } else {
            trimData.push(
                {
                  "label" : temp,
                  "value" : `${temp} - ${occupationCode}`
                }
            );
        }
        
        return saveJSON(`./${language}/occupation-list-${language}.json`, occupationList)
    });
};


function addZeros(code) {
    if(code <=9) return ('00' + code.toString());
    if(code > 9 && code <=99) return ('0' + code.toString());
    return code.toString();
}

function capitalizeFirstLetter(string) {
    return string.trim().toLowerCase().replace(new RegExp("(?:\\b|_)([a-z])", "g"), function($1) {
        return $1.toUpperCase();
    });
};

module.exports = {
    generatePickList
}
