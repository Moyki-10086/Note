// 导出模块功能 export
export let name = 'text1'
// console.log('text1-----' + name);

setTimeout(() => {
  name = 'change'
  // console.log('text1-----change-----' + name)
}, 1000);

export const obj = {
  val1: 'val1',
  val2:'val2'
}
