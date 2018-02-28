var path = require('path')
var fs = require('fs')
var mkdirs = require('node-mkdirs');

function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}

var getRoot = function(dirpath) {  
    if (!dirpath || dirpath === "/") return null
    var files = fs.readdirSync(dirpath)
    if(contains(files,"package.json")){
        return dirpath
    }
    return getRoot(path.dirname(dirpath))
}; 
module.exports.mkdirs = mkdirs
module.exports.getPath = function (createType) { 
    switch (createType) {
        case "component":            
            return getRoot(process.cwd()) 
            break;
        case "model":
            
            break; 
        case "route":
            
            break; 
        default:
            break;
    }
}