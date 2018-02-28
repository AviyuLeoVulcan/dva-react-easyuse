var fs = require("fs")
var path = require("path")
var chalk = require('chalk').default;

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
    jsfile = path.join(cwd, filename+".js")
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