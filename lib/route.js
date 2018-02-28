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

module.exports = function route(filename,cmd) { 
    var cwd = process.cwd();
    var rootPath = utils.getPath("route")
    if (!rootPath) throw Error("path error")
    var filefolder = path.join(rootPath, filename)
    utils.mkdirs(filefolder)
    jsfile = path.join(filefolder, "index.js")
    lessfile = path.join(filefolder, "index.less")
    readmefile = path.join(filefolder, "README.md")
    fs.exists(jsfile, function (exists) {
        if (exists) {
            console.log(chalk.red("javascript file " + jsfile + " is exsited!"))
            process.exit()
        } else {
            var content = filetemplate.replace(/<<<filename>>>/g, filename)
            createFile(jsfile, content)
            createFile(lessfile, "")
            console.log(chalk.green("route create success!"))
            console.log(chalk.cyan(jsfile))
            console.log(chalk.cyan(lessfile)) 
            var routesfile = path.join(utils.getRoot(cwd),"/common/routes.js")
            var buffer = fs.readFileSync(routesfile)
            var str = buffer.toString() 
            var index = str.indexOf("// router insert flag")  
            result = str.replace("// router insert flag",`'/${filename}': {
    component: dynamicWrapper(app, [${cmd.models.split(',').map(a=>'"'+a+'"').join(',')}], () => import('../routes/${filename}')),
    },
    // router insert flag`)  
            fs.writeFileSync(routesfile,result)
             
        }
    })
} 

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};