var f = require('./fileUtils');
var process = require('process');

var map = new Map();
var filedata = '';

f.readfile(process.argv[2], function(lines){
  for (line of lines){

    var arr = line.split(' ');
    var oldvalue = map.get(arr[0]);
    var newvalue = parseInt(arr[1]);
    if (oldvalue !== undefined ) newvalue += oldvalue;
    map.set(arr[0], newvalue);
  }
  for( var [key, value] of map.entries()){
         if(filedata == ''){
             filedata = key + ' ' + value + '\n'
         } else {
             filedata = filedata + key + ' ' + value + '\n'
            }
  }
     f.writefile(process.argv[3], filedata, function(filepath)  {
         f.readfile(filepath,(data) =>{
             console.log(data)
          })
      })
});
