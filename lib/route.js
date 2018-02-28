var fs = require("fs")
var path = require("path")
var chalk = require('chalk').default;
var childprocess = require('child_process');
var utils = require('./utils');

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
 

module.exports = function route(filename, cmd) {
    var cwd = process.cwd();
    var routesfile = path.join(utils.getRoot(cwd), "src/common/routes.js")
    if (!fs.existsSync(routesfile)) {
        console.log(chalk.red("[Failed]", "can't find file src/common/routes.js"))
        process.exit()
    }
    var rootPath = utils.getPath("route")
    if (!rootPath) throw Error("path error")
    var filefolder = path.join(rootPath, filename) 
    utils.mkdirs(filefolder) 
    var routeName = path.basename(filefolder)
    var jsfile = path.join(filefolder, "index.js")
    var lessfile = path.join(filefolder, "index.less")
    fs.exists(jsfile, function (exists) {
        if (exists) {
            console.log(chalk.red("javascript file " + jsfile + " is exsited!"))
            process.exit()
        } else {
            var buffer = fs.readFileSync(routesfile)
            var str = buffer.toString()
            // var index = str.indexOf("// router insert flag")
            // if (index <= 0) {
            //     console.log(chalk.red("[Failed]", "can't find router insert flag"))
            //     process.exit()
            // } 
            var a = str.match(/('[\s\S]{0,100}':[\s\S]{0,50}component: dynamicWrapper[\s\S]{0,200})\},/gm) 
            
            console.log(a[a.length-1])
            var b = str.indexOf(a[a.length-1])
            var c = b+a[a.length-1].length
            console.log(c) 
            var start = str.substr(0,c)
            var end = str.substr(c+1)
            
            var result = ""
            if (cmd.models) {
                result = `
    '/${filename}': {
      component: dynamicWrapper(app, [${cmd.models.split(',').map(a => '"' + a + '"').join(',')}], () => import('../routes/${filename}')),
    },`
            } else {
                result =`
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
        }
    })
}
 

String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};