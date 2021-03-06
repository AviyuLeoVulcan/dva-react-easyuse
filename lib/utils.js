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

var getRoot = function (dirpath) {
    if (!dirpath || dirpath === "/") return null
    var files = fs.readdirSync(dirpath)
    if (contains(files, "package.json")) {
        return dirpath
    }
    return getRoot(path.dirname(dirpath))
};

module.exports.mkdirs = mkdirs
module.exports.getRoot = getRoot

module.exports.getPath = function (createType) {
    switch (createType) {
        case "component":
            rootPath = getRoot(process.cwd())
            if (!rootPath) return null;
            return path.join(rootPath, 'src', 'components')
        case "model":
            rootPath = getRoot(process.cwd())
            if (!rootPath) return null;
            return path.join(rootPath, 'src', 'models')
        case "route":
            rootPath = getRoot(process.cwd())
            if (!rootPath) return null;
            return path.join(rootPath, 'src', 'routes') 
        case "service":
            rootPath = getRoot(process.cwd())
            if (!rootPath) return null;
            return path.join(rootPath, 'src', 'services') 
            return path.join(rootPath, 'src', 'routes')
        case "layout":
            rootPath = getRoot(process.cwd())
            if (!rootPath) return null;
            return path.join(rootPath, 'src', 'layouts')
        default:
            return null;
    }
}