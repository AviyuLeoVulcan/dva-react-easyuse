var fs = require("fs")
var path = require("path")
var chalk = require('chalk').default;
var childprocess = require('child_process');
var utils = require('./utils');
var model = require('./model')

const filetemplate = `
import React from 'react';
//import { Row, Col } from 'antd';
//import { Switch, Route, withRouter, NavLink, Link } from 'dva/router';
import { connect } from 'dva'; 

class <<<filename>>> extends React.Component {
	render() {
        return (
            <div><<<filename>>> Component</div>
        )
    }

export default withRouter(connect()(<<<filename>>>));
`

checkCommonRoutes = function (routesfile) {
    if (!fs.existsSync(routesfile)) {
        console.log(chalk.red("[Failed]", "can't find file src/common/router.js"))
        process.exit(-1)
    }
}

checkFileFolder = function (filename) {
    var rootPath = utils.getPath("route")
    if (!rootPath) throw Error("path error")
    var filefolder = path.join(rootPath, filename)
    if (fs.existsSync(filefolder)) {
        console.log(chalk.red("[Failed] " + filefolder + " existed!"))
        process.exit(-1)
    }
    utils.mkdirs(filefolder)
    return filefolder
}


module.exports = function route(filename, cmd) {
    var routesfile = path.join(utils.getRoot(process.cwd()), "src/common/router.js")
    checkCommonRoutes(routesfile)
    var filefolder = checkFileFolder(filename)
    var routeName = path.basename(filefolder)
    var jsfile = path.join(filefolder, "index.js")
    var lessfile = path.join(filefolder, "index.less")

    var buffer = fs.readFileSync(routesfile)
    var str = buffer.toString()

    var matches = str.match(/('[\s\S]{0,100}':[\s\S]{0,50}component: dynamicWrapper[\s\S]{0,200})\},/gm)
    var lastOne = matches[matches.length - 1]
    var lastOneIndex = str.indexOf(lastOne)
    var subPosition = lastOne.length + lastOneIndex
    var start = str.substr(0, subPosition)
    var end = str.substr(subPosition + 1)

    var result = ""
    if (cmd.models) {
        result = `
    '/${filename}': {
      component: dynamicWrapper(app, [${cmd.models.split(',').map(a => '"' + a + '"').join(',')}], () => import('../routes/${filename}')),
    },` 
        cmd.models.split(',').forEach(element => { 
            model(element);
        });
    } else {
        result = `
    '/${filename}': {
      component: dynamicWrapper(app, [], () => import('../routes/${filename}')),
    },`
    }
    var allstr = start + result + end
    fs.writeFileSync(routesfile, allstr)


    var content = filetemplate.replace(/<<<filename>>>/g, routeName)
    createFile(jsfile, content)
    createFile(lessfile, "")
    console.log(chalk.green("route create success!"))
    console.log(chalk.cyan(jsfile))
    console.log(chalk.cyan(lessfile))
    console.log(chalk.cyan("Route:"))
    console.log(chalk.cyan(result)) 
}


String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};