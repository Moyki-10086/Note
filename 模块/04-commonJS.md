####
在Node中每一个js文件都是一个单独的模块,通过 CommonJS，每个 JS 文件独立地存储它模块的内容（就像一个被括起来的闭包一样），加载模块是同步的，只有加载完成才能执行后面的操作
- 语法
  1. 模块必须要使用require()导入
  2. 模块必须要使用module.exports或.exports导出
    这两个语法都是nodejs环境自带的全局语法
- 
  导出模块语法一般放在js文件最底部，且只需要执行一次即可
- 
  一般不需要把模块化中所有的变量全部都导出，只需要导出需要用的变量即可
- 模块缓存机制
  1. 当一个模块第一次加载时，nodejs会执行里面的代码，并且导出模块
  2. nodejs会将导出的模块放入缓存中
  3. 当重复导入一个模块的时候，nodejs会先从缓存中读取模块。如果缓存中有，就会从缓存读取。缓存没有就重复步骤1

#### nodejs三种模块及require()加载原理
##### nodejs有三种模块
1. 有一种: 核心模块、内置模块
nodejs作者写的，这些模块js文件会随着安装nodejs的时候一起安装。因此我们可以直接使用，而无需下载。
例如：fs、path、http都是核心模块

2. 第二种：第三方模块
npm官网上面的模块，这些都是大佬写的模块。需要下载后使用
例如：express、cors、bod-parser

3. 第三种：自定义模块
我们自己写的文件

##### require('文件路径')加载原理
> require的加载过程是同步的，意味着必须等到引入的文件(模块)加载完成之后，才会继续执行其他代码，也就是会造成阻塞(因为引入一个文件则该文件内部的所有代码都会被执行一次)。
require是一个函数，引入一个文件(模块)中导出的对象

1. 自定义模块：必须要写文件路径，require()会得到这个模块里面的module.exports对象
2. 第三方模块：写模块名。nodejs会自动从你的node_module文件夹里面去找这个模块的名字，然后执行模块里面的index.js代码，得到里面的module.exports。如果当前目录没有module.exports就会从上级目录找，以此类推。一直找到你的磁盘根目录。还找不到就会提示报错模块不存在(类似变量作用域的就近原则)
3. 核心模块：写模块名。nodejs会自动从你的node安装包路径里面去找。


##### Commonjs规范的解析---案例三：

- CommonJS中是没有 module. exports的概念的
- 但是为了实现模块的导出，Node中使用的是 Module的类，每一个模块都是 Module的一个实例，也就是new module( 一个JS文件就是一个Module实例 )
- 所以在Node中真正用于导出的其实根本不是 exports,而是 module. exports;
- 因为 module才是导出的真正实现者
- 一个文件把它当成一个对象的时候，Node底层就会 new module
- Node的底层 实际上做了这么一步操作 module.exports = exports

####
###### 案例1 module.exports 
- 每个模块内部都有一个module对象，表示当前模块
  - module.id---模块标识符
  - module.filename---模块文件名
- 模块作用域中的属性和方法是私有成员,只有导出才能获取
- module.exports默认是一个空对象，
  - 添加属性方法
  - 指向一个全新的对象

###### 案例3 exports 
exports == module.exports == {}
- 为了简化向外共享成员的代码，Node 提供了 exports 对象。
- 默认情况下，exports 和 module.exports 指向同一个对象。
- 最终共享的结果，以 module.exports 指向的对象为准。

注意：
1. 直接添加时会共享
2. exports 和 module.exports默认指向同一个对象，全等，但不是同一个对象
3. 防止混淆，exports 和 module.exports 不建议一起使用，
4. 不建议单独使用exports，直接更改指针指向


##### 案例四 缓存
- CommonJS规范规定，模块可以多次加载，但是只会在第一次加载时运行一次，
-每次调用 require('foo') 都会返回完全相同的对象，如果 require.cache 没有被修改，则多次调用 require('foo') 不会导致模块代码被多次执行
  - 每个模块对象 module都有一个属性： loaded
  - 为 false表示还没有加载，为true表示已经加载
- 运行结果就会被缓存下来，以后再加载就直接读取缓存结果
- 模块根据其解析的文件名进行缓存。 例如，在不区分大小写的文件系统或操作系统上，require('./foo') 和 require('./FOO') 返回两个不同的对象，而不管 ./foo 和 ./FOO 是否是同一个文件。

###### 案例5 案例六 值的拷贝
- CommonJS模块的加载机制是，输入的是被输出的值的拷贝(**浅拷贝**)。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。 
- 在每个Node应用中都有一个 exports 对象，在其他文件导入某个文件时，其实就是拿到该对象的内存地址


###### 案例2 指定导出的对象名称
通过指定导出的对象名称，CommonJS 模块系统可以识别在其他文件引入这个模块时应该如何解释。
然后在某个人想要调用 myMoudle 的时候，只需要 require 一下
1.  这种实现比起模块模式有两点好处：
  - 避免全局命名空间污染
  - 明确代码之间的依赖关系


###### node项目： 
npm init
node server.js
npm install uniq --save
1. 核心模块：
- Node.js中常用的内置模块：
  - fs模块：该模块提供对文件系统的访问功能，可以读写文件、创建和删除目录等。
  - http模块：该模块提供对HTTP协议的支持，可以创建HTTP服务器和客户端，实现HTTP请求和响应。
  - url模块：该模块提供URL解析功能，可以将一个URL字符串解析成各个部分，例如：协议、主机名、路径等。
  - path模块：该模块提供操作文件路径的方法，例如获取路径中的文件名、扩展名等等。
  - events模块：该模块提供事件驱动的编程方式，可以通过绑定事件和触发事件来实现程序的逻辑控制。
  - net模块：该模块提供网络通信功能，可以实现Socket编程，例如创建TCP服务器和客户端。
  - crypto模块：该模块提供加密和解密相关的功能，例如：计算哈希值、生成随机数、加密解密等。
  - os模块：该模块提供与操作系统相关的功能，例如获取CPU架构、内存信息、网络信息等等。

2. 第三方模块：
axios
Express
lodash
uniq 数组去重 