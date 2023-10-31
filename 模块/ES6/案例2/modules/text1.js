
// 默认导出
// 只允许有一个默认导出

// 1.导出常量
// export default name = 'text1'

// 2.导出函数
// export default function sayName1 () {
//   console.log('text1----function');
// }

// 3.导出匿名函数
// export default function () {
//   console.log('text1----function');
// }

// 4. 导出多个
export default {
  name: 'text1',
  func: () => {
      console.log('text1----function');
  },
  func2 () {
      console.log('text1----function')
  }
}

// 注意：export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。
// 错误
// export default var a = 1;