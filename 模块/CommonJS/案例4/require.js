
const module1 = require('./module1')
delete require.cache[require.resolve('./module1')]
const module2 = require('./module1')

delete require.cache[require.resolve('./module1')]
const module3 = require('./module1')
delete require.cache[require.resolve('./module1')]

const module4 = require('./module1')
delete require.cache[require.resolve('./module1')]

// console.log('require', module1)
// console.log('require cache', require.cache)

// // 清除缓存：

// // 删除指定模块的缓存
// // delete require.cache[require.resolve('./module1')]
// // console.log('require cache', require.cache)

// const module2 = require('./module1')

// console.log('require', module1)
// console.log('require cache', require.cache)
// // 删除所有模块的缓存，大范围攻击
// // Object.keys(require.cache).forEach(function (key) {
// //     delete require.cache[key];
// // })
