var fs = require("fs")
var path = require("path")
var chalk = require('chalk').default;
var utils = require('./utils');

const filetemplate = `
import React from 'react';
import { connect } from 'dva'; 
import { Form, Row, Col } from 'antd';
import styles from './index.less'; 

@Form.create() 
@connect(({ loading }) => ({ 
    loading: false,
}))
export default class <<<filename>>> extends React.Component {
    componentDidMount() {
        // this.props.dispatch({
        //     type: 'list/fetch',
        //     payload: {
        //         count: 5,
        //     },
        // });
    } 
    componentWillReceiveProps(nextProps) { 
    }
	render() {
        return (
            <div><<<filename>>> Component</div>
        )
    }
} 
`

createFile = function (fileName,content){
    fs.writeFile(fileName, content, function (err) {
        if (err) {
            return console.error(err);
            process.exit()
        }
    })
}

module.exports = function component(filename) {
    var cwd = process.cwd();
    var rootPath = utils.getPath("component")
    if (!rootPath) {
        throw Error("找不到系统根目录，根据package.json判断")
    }
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
            createFile(readmefile, "# "+filename) 
            console.log(chalk.green("component create success!"))
            console.log(chalk.cyan(jsfile))
            console.log(chalk.cyan(lessfile))
            console.log(chalk.cyan(readmefile))
        }
    })
} 