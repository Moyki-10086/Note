// console.log(module.exports)
// console.log(exports)
// console.log(exports === module.exports)


const username = 'zs'
exports.username = username
exports.age = 20
exports.sayHello = function() {
    console.log('hello');
}

// 添加module.exports

// module.exports.new='this is new string'

// 更改对象
// exports = {
//   aa: 'aa',
//   bb: 'bb',
//   cc:'cc'
// }
// module.exports = {
//     aa: 'aa',
//     bb:'bb'
// }


// 只有exports
exports = {
  aa: 'aa',
  bb:'bb'
}
console.log(module.exports)
console.log(exports)
