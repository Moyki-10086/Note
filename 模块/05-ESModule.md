####
在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。
编译时加载

引擎处理import语句是在编译时，这时不会去分析或执行表达式、变量和代码块结构，所以import语句中包含表达式、变量或者放在代码块结构没有意义。

ES6 的模块自动采用严格模式：use strict
#### esmodule 用法
----------------------------
##### 案例1 
1. 导出模块功能 export 
2. 导入功能 import
3. - 应用声明模块：`<script type="module" src="./modules/text1.js">`
   - `<script>`在页面出现的顺序依次执行
   - 浏览器对于带有type="module"的`<script>`，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了`<script>`标签的defer属性。
   - 一旦使用了async属性，`<script type="module">`就不会按照在页面出现的顺序执行，而是只要该模块加载完成，就执行该模块。
`<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>`

###### 注意1：异步加载
当浏览器加载`<script type="module" src="./modules/text1.js">`时，它会开始异步加载text1.js模块，并在加载完成后执行模块中的代码。而在console.log(name)这行代码执行时，模块可能还没有加载完成，导致name变量还没有被赋值。
###### 注意2：更改
- 基本类型数据不能改变
- 只能改变复杂数据类型
- 导出的数据是实时变化的


----------------------------
##### 案例2 默认导出
1. 自定义名称：
在导入时，可以根据需要为导入的函数指定一个自定义的名称，无论是具名函数还是匿名函数。
`import { default as aa } from './modules/text1.js'`
2. 导出多个

##### 案例三 命名冲突 as
注意： 被 as 重命名后 原来的名字移除：undefined
**可用于解决命名冲突**
 - 在import语句中:用于为导入的模块成员指定一个自定义的名称，即创建一个别名。 `import { default as aa } from './modules/text1.js'`
 - 在export语句中:as关键字用于为导出的成员指定一个自定义的名称，即创建一个别名。 `export { sayName1 as myFunction }`

##### 案例四 导入全部 * as XX
 `*` ：只能在import * as语法中使用，用于导入整个模块的所有成员。

##### 案例五 类

##### 案例六  普通导出和默认导出
1. 两次import
2. `*` 


##### 其他:在编译时执行

```js
let flag = true
if (flag) {
  // 错误用法，语法错误，不能在逻辑在逻辑代码中使用 import 关键字
  import format from './modules/foo.js'
}
```
- 这是因为 ES Module在被JS引擎(parse)解析时(处理import语句时)，就必须知道它的依赖关系
- 由于这个时JS代码没有任何的运行，，这时不会去分析或执行if语句,所以无法在进行类似于if判断中根据代码的执行情况
- 因此会报句法错误，而不是执行时错误。
- 也就是说，import和export命令只能在模块的顶层，不能在代码块之中（比如，在if代码块之中，或在函数之中）。


##### 案例七 异步 
为了解决以上问题， ES2020提案 引入import()函数，支持动态加载模块。   
- 使用import()函数，它返回一个Promise，允许你在运行时按需加载模块
- 使用 type="module" 时，加载该模块时异步加载的，就相当于给script加了一个async属性。
```js
import('./myModule')
  .then((module) => {
    // 这里可以访问动态加载的模块
  })
  .catch((error) => {
    // 处理加载错误
  });`
```
