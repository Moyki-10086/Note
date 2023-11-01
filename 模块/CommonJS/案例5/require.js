// 在模块被第一次导入后，它的导出值会被缓存起来
let { counter, incCounter, get, obj, changeObj, getObj } = require('./module1')


// console.log(counter,"原先"); 
// incCounter();
// console.log(counter,"加一"); 
// get()

// counter = 'aaaaa'
// console.log(counter) 
// get()

// 因为counter是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。

// console.log(obj, '原先')
// changeObj()
// console.log(obj, '更改')
// getObj()


obj={age:11}
// obj.name='ccccc'
console.log(obj, '更改')
getObj()


// 当一个模块的导出值是一个对象时，它的引用会被缓存，而不是对象的副本

