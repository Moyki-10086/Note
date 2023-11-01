
// 方法一：
// import { name,sameName } from './modules/text1.js'
// import func from './modules/text1.js'
// console.log(name);
// console.log(sameName)
// func()

// 方法二：
// import * as text1 from './modules/text1.js'
// console.log(text1);
// text1.default()
// console.log(text1.name);
let flag = true
if (flag) {
  // 错误用法，语法错误，不能在逻辑在逻辑代码中使用 import 关键字
import('./modules/text1.js')
  .then((module) => {
    console.log(module);
    // 这里可以访问动态加载的模块
  })
  .catch((error) => {
    // 处理加载错误
  });
}