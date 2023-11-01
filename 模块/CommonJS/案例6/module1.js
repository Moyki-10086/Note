let name = 'aaaa'

setTimeout(() => {
  exports.name = 'bbbbb'
  console.log('timer')
}, 1000)
console.log('01',name)
exports.name = name
