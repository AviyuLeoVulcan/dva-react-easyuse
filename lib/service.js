var fs = require("fs")
var path = require("path")
var chalk = require('chalk').default;
var utils = require('./utils');

const filetemplate = `import request from '../utils/request';

const <<<filename>>>ApiConfig = [
    //api config
    //example { name: 'login', url: '/account/login', method: 'post' },
];

const servicesMap = {};
<<<filename>>>ApiConfig.forEach(resource => {
    servicesMap[resource.name] = async function(data) {
        return request(resource.url, { method: resource.method, prefix: resource.prefix, data })
    }
})

export default servicesMap;
`

module.exports = function service(filename) {
    var cwd = process.cwd();
    rootPath = utils.getPath("service")
    if (!rootPath) throw Error("path error")
    utils.mkdirs(rootPath)
    jsfile = path.join(rootPath, filename + ".js") 
    if (fs.existsSync(jsfile)) { 
        console.log(chalk.yellow("service file " + jsfile + " is exsited!"))
        return
    }
    var content = filetemplate.replace(/<<<filename>>>/g, filename)
    fs.writeFile(jsfile, content, function (err) {
        if (err) {
            console.error(err);
        }
    })
    console.log(chalk.green(`service ${filename} create success!`))
    console.log(chalk.cyan("service file " + jsfile + " created!"))
} 