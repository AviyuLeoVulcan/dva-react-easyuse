var fs = require("fs")
var path = require("path")
var chalk = require('chalk').default;

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

module.exports = function route(filename) {
    var cwd = process.cwd();
    var filefolder = path.join(cwd, filename)
    fs.exists(filefolder, function (exists) {
        if (exists) {
            console.log(chalk.red("folder " + filefolder + " is exsited!"))
            process.exit()
        } else {
            fs.mkdir(filefolder, function (err) {
                if (err) throw err;
            })
        }
    })
    jsfile = path.join(filefolder, "index.js")
    fs.exists(jsfile, function (exists) {
        if (exists) {
            console.log(chalk.red("javascript file " + jsfile + " is exsited!"))
            process.exit()
        } else {
            var content = filetemplate.replace(/<<<filename>>>/g,filename)
            fs.writeFile(jsfile, content, function (err) {
                if (err) {
                    return console.error(err);
                }
            })
        }
    })
} 