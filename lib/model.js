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
    if(!rootPath) throw Error("path error")
    utils.mkdirs(rootPath)
    jsfile = path.join(rootPath, filename+".js")
    fs.exists(jsfile, function (exists) {
        if (exists) {
            console.log(chalk.red("model file " + jsfile + " is exsited!"))
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