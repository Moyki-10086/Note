https://juejin.cn/post/6963442027644059662  


#### 无依赖  demo1
```js
define(function (require, exports, module) {
  //todo:模块定义
  //导出模块
  exports.xxx = value //方式1
  module.exports = value //方式2
})
```

- require, exports, module
通过形参传递给模块
#### 有依赖   demo2
```js
define(function (require, exports, module) {
  //todo:模块定义

  //加载依赖-同步方式
  const module = require('./module')
  //加载依赖-异步模式
  const module_async = require.async('./module_async')

  //导出模块
  exports.xxx = value //方式1
  module.exports = value //方式2
})
```

### 引入
//主模块
```js
define(function (require) {
  const demo1 = require('./demo1')
  const demo2 = require('./demo2')

  console.log(demo1)
  demo1.say()
})
```
##### 注意
- 虽然Sea.js的require函数在语法上与Node.js中的require函数相似，
- 但它们的实现方式是不同的。Sea.js的require函数是Sea.js模块加载器的一部分，
- 它是在浏览器环境中实现的，而不是直接使用Node.js的require函数。