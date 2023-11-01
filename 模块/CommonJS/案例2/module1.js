function AA() {
  this.hello = function () {
    console.log('hello!')
    return 'hello!'
  }
  this.goodbye = function () {
    console.log('goodbye!');
    return 'goodbye!'
  }
}
module.exports = AA
