
// 依赖于其他模块，使用AMD规范定义的的require()函数。

console.log('aaaaaa');


require(['math', 'str'], function (math, str) {
  console.log(math.add(1))
  console.log(str.aaa)
})

// require(['math'], function (math) {
//   console.log(math.add( 1))
// })

// require(['str'], function (str) {
//   console.log(str);
//   console.log(str.aaa)
// })
// require(['math'], function (math) {
//   console.log(math.add(2));
// })