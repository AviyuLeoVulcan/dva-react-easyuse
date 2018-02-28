var fs = require("fs")
var path = require("path")
var chalk = require('chalk').default;
var utils = require('./utils');

const filetemplate = `
import React from 'react';
import { connect } from 'dva'; 
import { withRouter, Switch, Route, NavLink, Link } from 'dva/router';
import { Form, Row, Col } from 'antd';

@Form.create()
@withRouter()
@connect(({ loading }) => ({ 
    loading: false,
}))
export default class <<<filename>>> extends React.Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'list/fetch',
            payload: {
                count: 5,
            },
        });
      }
	render() {
        return (
            <div><<<filename>>> Component</div>
        )
    }
} 
`
module.exports = function component(filename) {
    var cwd = process.cwd();
    var rootPath = utils.getPath("component")
    if (!rootPath) {
        throw Error("找不到系统根目录，根据package.json判断")
    }
    var filefolder = path.join(rootPath, 'src', 'components', filename)
    utils.mkdirs(filefolder)
    jsfile = path.join(filefolder, "index.js")
    lessfile = path.join(filefolder, "index.less")
    fs.exists(jsfile, function (exists) {
        if (exists) {
            console.log(chalk.red("javascript file " + jsfile + " is exsited!"))
            process.exit()
        } else {
            var content = filetemplate.replace(/<<<filename>>>/g, filename)
            fs.writeFile(jsfile, content, function (err) {
                if (err) {
                    return console.error(err);
                    process.exit()
                }
            })
            fs.writeFile(lessfile, "", function (err) {
                if (err) {
                    return console.error(err);
                    process.exit()
                }
            })
            console.log(chalk.green("component create success!"))
            console.log(chalk.cyan(jsfile))
            console.log(chalk.cyan(lessfile))
        }
    })
} 