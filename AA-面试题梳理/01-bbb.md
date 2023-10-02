### 1、let和var的区别  
1. 作用域不同   let是块级作用域，var是函数作用域
2. let不能在定义之前访问该变量，但是var可以
3. let不能被重新定义，但是var可以
4. let没有变量提升，但是var存在变量提升提升到当前作用域最顶端

### 2、await、async函数的作用,项目中哪里使用到了
  - 作用：async和await被称为是异步的终极解决方案  await有两个作用  
    - 一是求值关键字
    - 二是讲异步操作变成同步操作；如果方法中使用了await，那么在方法前面必加async
  - async的作用是将方法的返回值封装成promise
   async其实就是promise的语法糖，函数前面必须加一个async，异步操作的方法前加一个await关键字。通俗点说就是让你等一下，执行完了再继续走 并且await只能在async函数中执行，否则会报错

### 3、promise语法的作用 
- promise有三个状态  等待（pending） 成功（fulfilled） 失败（rejected）
- 一旦从等待状态切换为成功或失败 将不再会切换 promise本身是一个同步任务 只有他的then和catch才是一个微任务
- Promise的常用的静态方法  reslove（成功），reject（失败），all（等待原则），race（竞速原则）

### 4、ES6新增的方法：
- let和const，解构赋值、模板字符串、箭头函数。
- Symbol、Map、Set三种常用的数据类型。
- Proxy重新定义了数据劫持的能力
- Reflect定义了一套标准化的数据操作的方式
- Promise确实的解决了异步逻辑嵌套及回调地狱问题。定义了异步逻辑的三种状态pending、rejected、fullfilled, 搭配then、- catch、all、race等方法以及async await语法糖，大量简化了异步操作。
- Generator函数，可以将异步逻辑划片执行。
- 新增了class类的概念

### 5、(...)扩展运算符
- Es6新增的使用简单
  - 扩展操作符（...）可在函数调用/数组构造时, 将数组表达式或者string在语法层面展开； 
  - 还以在构造对象时, 将对象表达式按key-value的方式展开 

### 6、移动端适配方案 
  - 使用rem，em，%，vh，vw
  - em和rem的区别  em是根据上一级来计算的 单位不统一  rem是通过根节点设置font-size来计算的  统一

### 7、postcss的作用 
1. Sass、Less和Stylus这些预处理器能做的，PostCSS同样也能做。
2. 最大的不同就是PostCSS可以只取所需，Sass和Less会给你很多东西使用但不一定用得上且不能拓展
3. 假如你正在使用Sass、Less或者Stylus，它们不能做的，你可以添加PostCSS插件实现（比如添加前缀或者代码校验）
4. 也有像PostCSS Sass 和 PreCSS这样的插件代替Sass，也就意味着你可以自己使用PostCSS编写你自己的CSS预处理器
### 8、项目登录流程 
1. 下载element
2. 完成登录表 并且完成好校验
3. 设置路由守卫  判断没有token的时候 不让他通过 自动跳转登录页 有 next（）
4. 校验成功后 点击登录掉接口
5. 调完之后 如果成功 则跳转到首页 并且把token存在vuex获取储存中 加在请求头里 不成功返回提示信息

### 9、token的存储流程 
-  客户端使用用户名和密码请求登录。
-  服务器收到请求，验证用户名和密码。
-  验证成功后，服务端会生成一个token然后把这个token发送给客户端。
-  客户端收到token后把它存储起来，可以放在cookie或者本地储存里面

### 10、购物车操作流程 
 1. 点击详情页中的商品数据，数据添加到购物车中
 2. 在购物车中展示商品的名称、单价和数量
 3. 具有选择功能，可以选择或者取消选中，可以全选或者取消全选，可以只计算选中的商品的总价，以及确定是否选中商品


 ### 补充1：webpack的hash
 通过webpack构建之后，生成对应文件名自动带上对应的MD5值。
 1. hash：整个项目的hash值，其根据每次编译内容计算得到，每次编译之后都会生成新的hash,即修改任何文件都会导致所有文件的hash发生改变。
  - 只改了一个main.css，会导致打包后所有文件的hash值都改变。所以当打包名称设置为hash时，整个项目文件是一致的，修改其中一个会导致所有跟着一起改。
  - 采用hash计算的话，每一次构建后生成的哈希值都不一样，即使文件内容压根没有改变。这样子是没办法实现缓存效果，我们需要换另一种哈希值计算方式，即chunkhash。
 2. chunkhash：根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值
  - 当规则为chunkhash时，打包后的hash值会根据入口文件的不用而不一样，当某个入口文件修改后重新打包，会导致本入口文件关联的所有文件的hash值都修改，但是不会影响到其他入口文件的hash值
  - 使用chunkhash存在一个问题，就是当在一个JS文件中引入CSS文件，编译后它们的hash是相同的，而且只要js文件发生改变 ，关联的css文件hash也会改变,这个时候可以使用mini-css-extract-plugin里的contenthash值，保证即使css文件所处的模块里就算其他文件内容改变，只要css文件内容不变，那么不会重复构建。
 3. contenthash：
  - 当规则为contenthash时，每个文件的hash值都是根据自身内容而生成，当某个文件内容修改时，打包后只会修改其本身的hash值，不会影响其他文件的hash值

 ### 补充2：postcss和postcss-loader的区别
1. postcss 是处理css的工具，通过一系列插件，控制样式
2. postcss-loader 是在 webpack 里用的，相当于 webpack加载了postcss的功能，用来对 css 进行预处理

### 补充3：在vue中使用cssModule
[官方地址](https://vue-loader.vuejs.org/zh/guide/css-modules.html#%E7%94%A8%E6%B3%95)