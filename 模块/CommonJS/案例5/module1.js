// 在导出时更改

var counter = 3
function incCounter() {
  counter++
}
function get() {
  console.log(counter,"get");
}

var obj = {
  name:'aaa'
}
function changeObj() {
  obj.name='bbb'
}
function getObj() {
  console.log(obj, 'get')
}


module.exports = {
  counter,
  incCounter,
  get,
  obj,
  changeObj,
  getObj
}

// setTimeout(() => {
//     counter = 100
//     console.log(counter);
//     incCounter()
//     console.log(counter);
// }, 1000);