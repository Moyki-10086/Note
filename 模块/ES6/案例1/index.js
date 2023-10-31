
// 导入功能 import

import { name ,obj } from './modules/text1.js'
import { name2, sayName } from './modules/text2.js'
console.log(name);
// ES6模块采用了严格的静态结构，导入的变量只读的，这意味着一旦导入变量的值被分配，就不能再被修改。
// name = 'aaaaaaa'
// console.log(name);
console.log(obj);
// obj.val1 = 'aaaaaa'
// console.log(obj);

console.log(name2);
sayName()

setTimeout(() => {
  console.log('text1-----change-----' + name)
}, 2000)