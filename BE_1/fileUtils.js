var fs = require("fs");


// fs.readFile('data.txt', function (err, data) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log( data.toString());
// });


var readfile = function(file, callback) {
  fs.readFile(file, function(err, data) {
    if (err) throw err;
    callback(data.toString().split("\n"));
  });
}

var writefile = function(file, data, callback) {
  fs.writeFile(file, data, function(err) {
    if (err) throw err;
  });
}

module.exports.readfile = readfile;
module.exports.writefile = writefile;
