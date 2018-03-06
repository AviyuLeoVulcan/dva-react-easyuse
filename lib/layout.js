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

module.exports = function layout(filename) {
    var cwd = process.cwd();
    var rootPath = utils.getPath("layout")
    if (!rootPath) {
        throw Error("找不到系统根目录，根据package.json判断")
    }
    var filefolder = rootPath 
    utils.mkdirs(filefolder)
    jsfile = path.join(filefolder, filename+".js")
    lessfile = path.join(filefolder, filename+".less") 
    fs.exists(jsfile, function (exists) {
        if (exists) {
            console.log(chalk.red("javascript file " + jsfile + " is exsited!"))
            process.exit(-1)
        } else {
            var content = filetemplate.replace(/<<<filename>>>/g, filename)
            createFile(jsfile, content)
            createFile(lessfile, "") 
            console.log(chalk.green("layout create success!"))
            console.log(chalk.cyan(jsfile))
            console.log(chalk.cyan(lessfile)) 
        }
    })
} 