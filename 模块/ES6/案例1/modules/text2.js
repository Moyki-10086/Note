// 方法一：
// export const name2 = 'text2'
// export function sayName () {
//   console.log('use-func-----'+name2);
// }
// 方法二：
const name2 = 'text2'
function sayName () {
  console.log('use-func-----' + name2)
}
export {name2 , sayName}