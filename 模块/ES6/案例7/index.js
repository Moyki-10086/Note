let flg = true
if (flg) {
  // import * as text1 from './modules/text1.js'
  import('./modules/text1.js')
    .then(module => {
      console.log(module)
    })
    .catch(err => {
      console.log(err)
    })
}
