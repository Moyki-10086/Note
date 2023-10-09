import request from "./request";
export const menuPage = ()=> {
  return request({
    url: 'menuPage.json'
  })
}
export const resource = () => {
  return request({
    url: 'resource.json'
  })
}