UMD
在一些同时需要 AMD 和 CommonJS 功能的项目中，你需要使用另一种规范：Universal Module Definition（通用模块定义规范）。

UMD 创造了一种同时使用两种规范的方法，并且也支持全局变量定义。所以 UMD 的模块可以同时在客户端和服务端使用。

下面是一个解释其功能的例子：

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD
    define(['myModule', 'myOtherModule'], factory);
  } else if (typeof exports === 'object') {
      // CommonJS
    module.exports = factory(require('myModule'), require('myOtherModule'));
  } else {
    // Browser globals (Note: root is window)
    root.returnExports = factory(root.myModule, root.myOtherModule);
  }
}(this, function (myModule, myOtherModule) {
  // Methods
  function notHelloOrGoodbye(){}; // A private method
  function hello(){}; // A public method because it's returned (see below)
  function goodbye(){}; // A public method because it's returned (see below)

  // Exposed public methods
  return {
      hello: hello,
      goodbye: goodbye
  }
}));