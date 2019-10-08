# my-project2

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm test
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## release
1. work on branch dev
2. npm run build
3. git co master
4. cp -r dist/* .
5. git ci -m "xxx"
6. git push origin master:master
7. git push origin master:release-x.x.x

## version
use node-v4.2.1 to build

PATH=/Users/jfo/bin/node-v4.2.1-darwin-x64/bin:$PATH npm run build

