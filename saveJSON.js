const fs = require('fs');

exports.saveJSON = function(filename = '', list) {
    return fs.writeFileSync(filename, JSON.stringify(list))
}