// // 在默认情况下 module.exports = {}

// // 添加属性方法
// const name = 'aaaaa'
// module.exports.a = name
// module.exports.b = function () {
//   console.log('bbbbb')
// }
// module.exports.c=100
// setTimeout(() => {
//   console.log(name)
// }, 1000)
// // 指向一个全新的对象
// // module.exports = {
// //   obj1: 1,
// //   obj2: name,
// //   obj3: function () {
// //     console.log('obj3')
// //     // console.log(this);
// //   }
// // }

const a = 'aaa'
const b = function () {
  console.log(a);
}

 module.exports = {a,b}
// console.log(module)

//   // console.log(module.id)
//   // console.log(module.filename)
//   // console.log(module.path)