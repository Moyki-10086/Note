// 在导出时更改

let module1 = require('./module1')
console.log('02', module1.name)
setTimeout(() =>{
  console.log('03', module1.name)
}, 2000)

// module1对象是 exports 对象的浅拷贝（引用赋值)