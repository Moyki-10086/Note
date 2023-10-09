import axios from 'axios'
const request = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 3000
})
request.interceptors.response.use(
  function (response) { return response.data },
  function (err) { return Promise.reject(err) }
)
export default request