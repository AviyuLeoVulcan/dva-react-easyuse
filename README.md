
This tool is for [ant-design-pro](https://github.com/ant-design/ant-design-pro).

# install 
```
npm install -g dva-react-easyuse
```
# How to Use

## create component
```
$ easyuse component MyComponent  
component create success!
.../src/components/MyComponent/index.js
.../src/components/MyComponent/index.less
.../src/components/MyComponent/README.md 
```


## create model
```
$ easyuse model app
model MyModel create success!
model file .../src/models/MyModel.js created!
```

## create route
```
$ easyuse route -m login,app MyRoute
model app create success!
model file .../src/models/app.js created!
model login create success!
model file .../src/models/login.js created!
route create success!
.../src/routes/MyRoute/index.js
.../src/routes/MyRoute/index.less
Route:

    '/MyRoute': {
      component: dynamicWrapper(app, ["app","login"], () => import('../routes/MyRoute')),
    },
```

## create layout
```
 ./bin/easyuse layout BasicLayout
layout create success!
.../src/layouts/BasicLayout.js
.../src/layouts/BasicLayout.less
```