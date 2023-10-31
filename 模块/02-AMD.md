AMD
CommonJS 已经挺不错了，但假使我们想要实现异步加载模块该怎么办？答案就是 Asynchronous Module Definition（异步模块定义规范），简称 AMD.

通过 AMD 载入模块的代码一般这么写：

define(['myModule', 'myOtherModule'], function(myModule, myOtherModule) {
  console.log(myModule.hello());
});
这里我们使用 define 方法，第一个参数是依赖的模块，这些模块都会在后台无阻塞地加载，第二个参数则作为加载完毕的回调函数。

回调函数将会使用载入的模块作为参数。在这个例子里就是 myMoudle 和 myOtherModule.最后，这些模块本身也需要通过 define 关键词来定义。

拿 myModule 来举个例子：

define([], function() {

  return {
    hello: function() {
      console.log('hello');
    },
    goodbye: function() {
      console.log('goodbye');
    }
  };
});
重申一下，不像 CommonJS，AMD 是优先浏览器的一种异步载入模块的解决方案。（记得，很多人认为一个个地载入小文件是很低效的，我们将在下一篇文章理介绍如何打包模块）

除了异步加载以外，AMD 的另一个优点是你可以在模块里使用对象、函数、构造函数、字符串、JSON 或者别的数据类型，而 CommonJS 只支持对象。

再补充一点，AMD 不支持 Node 里的一些诸如 IO，文件系统等其他服务器端的功能。另外语法上写起来也比 CommonJS 麻烦一些。