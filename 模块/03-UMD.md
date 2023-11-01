UMD
在一些同时需要 AMD 和 CommonJS 功能的项目中，你需要使用另一种规范：Universal Module Definition（通用模块定义规范）。

UMD 创造了一种同时使用两种规范的方法，并且也支持全局变量定义。所以 UMD 的模块可以同时在客户端和服务端使用。
UMD是一个自执行函数
下面是一个解释其功能的例子：
```js

    (function (root, factory) {
        if (typeof define === "function" && define.amd) {
          //AMD
          define(["jquery"], factory);
        } else if (typeof exports === "object") {
          //Node, CommonJS之类的
          module.exports = factory(require("jquery"));
        } else {
          //浏览器全局变量(root 即 window)
          root.returnExports = factory(root.jQuery);
        }
      })(this, function ($) {
        //方法
        function myFuncA () { } // 私有方法，因为没有返回
        function myFuncB () { } // 公共方法，因为返回了

        //暴露公共方法
        return {
          myFuncB,
        };
      });
```