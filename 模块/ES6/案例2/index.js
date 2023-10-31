
// 导入功能 import

// 1. 导出变量
// import  name  from './modules/text1.js'
// import  aa  from './modules/text1.js'
// 相当于--->
// import { default as aa } from './modules/text1.js'


// 2. 导出方法
// 2.1
// import sayName1 from './modules/text1.js'
// 2.2
// import aa from './modules/text1.js'
// 默认导出成员赋值给了变量aa ,这里的aa可以被看作是一个别名，用于代替原本的sayName1函数名。
// 相当于--->
// import { default as aa } from './modules/text1.js'


// 3. 导出匿名函数
// 将默认导出的匿名方法赋值给自定义的变量sayName1
// import sayName1 from './modules/text1.js'
// 相当于--->
// import { default as sayName1 } from './modules/text1.js'


// 4. 导出多个
// 4.1
// import aa from './modules/text1.js'
// console.log(aa);
// console.log(aa.name)
// aa.func()
// 4.2
import * as aa from './modules/text1.js'
console.log(aa)
console.log(aa.default)
aa.default.func()


// console.log(name);
// console.log(aa);
// sayName1()
// aa()
