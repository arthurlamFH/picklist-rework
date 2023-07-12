// script to conver csv data to json picklist, and output to corresponding folder
let data = require('./data')

let trimData = []
let pickList = {};

data.forEach(function(ele) {
  let label = capitalizeFirstLetter(ele[0].trim().toLowerCase());
  let temp = capitalizeFirstLetter(ele[4].trim().toLowerCase());
  let code = ele[2];
  
  if(code <=9) code = '00' + code;
  if(code <=99) code = '0' + code;

  if(trimData.length === 0) {
    pickList = {
        "label": label,
        "value": `${label} - ${'0' + ele[1].toString()}`,
        "listLabel": `${label} - Description`,
        "list": trimData
    }
  }

  trimData.push(
    {
      "label" : temp,
      "value" : `${temp} - ${code}`
    }
   )

   return pickList
})

function capitalizeFirstLetter(string) {
    return string.replace(new RegExp("(?:\\b|_)([a-z])", "g"), function($1) {
        return $1.toUpperCase();
    });
}

console.log(pickList)