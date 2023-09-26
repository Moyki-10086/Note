### 11、后台的鉴权流程 
- 登录：
  - 当用户填写完账号和密码后向服务端验证是否正确。
  - 验证通过之后，服务端会返回一个token，拿到token之后（我会将这个token存到cookie中，保证刷新页面后能记住用户登录状态）。 
  - 前端会根据token再去拉取一个 user_info 的接口来获取用户的详细信息（如用户权限，用户名等等信息）。
- 权限验证：
  - 通过token获取用户对应的 权限，动态根据用户的权限算出其对应有权限的路由，
  - 通过router.addRoutes 动态挂载这些路由。

### 12、axios二次封装 
1. 设置接口请求的baseURL
2. 设置请求头与超时时间
3. 封装请求方法   
4. 请求拦截器
5. 响应拦截器  

### 13、项目开发环境的切换 
  - 通过.env配置生产和开发环境，测试环境，
  - 通过build或者自定义指令来切换不同的开发环境，build切换生产环境，
  - test或者其他自定义指令来切换测试环境。

### 14、process对象
    Process对象是Node的一个全局对象，提供当前Node进程的信息  	

### 15、webpack打包优化
1. 提取js公用代码
2. 利用externals提取第三方库
3. 提取公共css代码
4. 压缩代码
5. Code Splitting 代码分割

### 16、webpack loader和plugins的区别 
1. loader。webpack自带的功能只能处理javaScript和JSON文件，loader让webpack能够去处理其他类型的文件，并将它们转换成有效的模块，以及被添加到依赖图中。
2. plugin。插件可以执行范围更广的任务，包括打包优化，资源管理，注入环境变量

### 17、Vue的组件和插件的区别 
1. 组件注册通过“Vue.component”或“components”属性，而插件通过“Vue.use()”；
2. 组件是用来构成App的业务模块，它的目标是“App.vue”，而插件是用来增强技术栈的功能模块，它的目标是Vue本身。

### 18、vue2和vue3的区别 
1. 双向数据绑定原理不同；
2. 是否支持碎片；
3. API类型不同；
4. 定义数据变量和方法不同；
5. 生命周期钩子函数不同；
6. 父子传参不同；
7. 指令与插槽不同；
8. main.js文件不同。

### 18、vue3有哪些新增特性？
双击数据绑定，组合式，多个根节点，虚拟dom字段增加

### 19、 vue3 Composition API 是什么？ 对比 Options API 他有哪些优势？
其代码更易读，更易理解和学习，没有任何幕后操作
Composition API的好处不仅仅是以不同的方式进行编码，更重要的是对于代码的重用
不受模板和组件范围的限制，也可以准确的知道我们可以使用哪些属性
由于幕后没有什么操作，所以编辑器可以帮助我们进行类型检查和建议

### 19、选项式和组合式的区别 
- 在逻辑组织和逻辑复用方面，Composition API是优于Options API
- 因为Composition API几乎是函数，会有更好的类型推断。
- Composition API对 tree-shaking 友好，代码也更容易压缩
- Composition API中见不到this的使用，减少了this指向不明的情况
- 如果是小型组件，可以继续使用Options API，也是十分友好的

### 20、export和export default的区别 
- export 可以导出多个 
- export default 只可以导出一个