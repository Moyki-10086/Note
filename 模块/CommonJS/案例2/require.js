const AA = require('./module1')
console.log(require('./module1'))
console.log(AA)
var aa = new AA();
aa.hello();
aa.goodbye();