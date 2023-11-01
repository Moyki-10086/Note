define(function (require, exports, module) {
  //引入依赖模块（同步）
  var moduleA = require('./moduleA');
  console.log(require('./moduleA'))
  console.log(moduleA);
  console.log(moduleA.name)
})