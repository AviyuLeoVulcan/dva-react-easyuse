var fs = require("fs")
var path = require("path")
var chalk = require('chalk').default;
var utils = require('./utils');

const filetemplate = `export default {
    namespace: '<<<filename>>>',
    state: {
        model_name:"<<<filename>>>"
    },
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },
    effects: {
        *fetch({ payload }, { call, put }) {  // eslint-disable-line
            yield put({ type: 'save' });
        },
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },
};

`

module.exports = function model(filename) {
    var cwd = process.cwd();
    rootPath = utils.getPath("model")
    if (!rootPath) throw Error("path error")
    utils.mkdirs(rootPath)
    jsfile = path.join(rootPath, filename + ".js") 
    if (fs.existsSync(jsfile)) { 
        console.log(chalk.yellow("model file " + jsfile + " is exsited!"))
    }
    var content = filetemplate.replace(/<<<filename>>>/g, filename)
    fs.writeFile(jsfile, content, function (err) {
        if (err) {
            console.error(err);
        }
    })
    console.log(chalk.green(`model ${filename} create success!`))
    console.log(chalk.cyan("model file " + jsfile + " created!"))
} 