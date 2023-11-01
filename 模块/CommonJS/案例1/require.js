// // 导入方法一：
// const module1 = require('./module1')

// console.log(module1)
// // 添加属性方法
// // module1.b()
// module1.a = 1111
// module1.c = 1111
// setTimeout(() => {
//   console.log(module1);
// }, 2000);
// 指向一个全新的对象
// module1.obj3()

// 导入方法二：
//  require('./module1')--->{a:,b:}
// const {a,b} = require('./module1')
// console.log(a, b);

// 导入方法三：
const a = require('./module1').a
console.log(a);