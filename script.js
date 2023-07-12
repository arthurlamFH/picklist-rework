// script to conver csv data to json picklist, and output to corresponding folder
const {saveJSON} = require('./saveJSON');

let data = require('./data')

let trimData = []
let pickList = {};


generatePickList('en', 'Casino-Gaming');
generatePickList('fr', 'Casino Et Jeux');

function generatePickList(language, title) {
    data.forEach(function(ele) {
        let label = capitalizeFirstLetter(ele[0].trim().toLowerCase());
        let temp = (language === 'en') ? capitalizeFirstLetter(ele[4].trim().toLowerCase()) : capitalizeFirstLetter(ele[ele.length - 1].trim().toLowerCase());
        let categoryCode = ele[1];
        let occupationCode = ele[2];
        
        if(categoryCode <=9) categoryCode = '00' + categoryCode;
        if(categoryCode <=99) categoryCode = '0' + categoryCode;
        if(occupationCode <=9) occupationCode = '00' + occupationCode;
        if(occupationCode <=99) occupationCode = '0' + occupationCode;
      
        if(trimData.length === 0) {
          pickList = {
              "label": title,
              "value": `${label} - ${categoryCode}`,
              "listLabel": `${label} - Description`,
              "list": trimData
          }
        }
      
        trimData.push(
            {
              "label" : temp,
              "value" : `${temp} - ${occupationCode}`
            }
        )
      
        return saveJSON(`./${language}/categories/${title} - ${categoryCode}.json`, pickList)
    })
}

function capitalizeFirstLetter(string) {
    return string.replace(new RegExp("(?:\\b|_)([a-z])", "g"), function($1) {
        return $1.toUpperCase();
    });
}


