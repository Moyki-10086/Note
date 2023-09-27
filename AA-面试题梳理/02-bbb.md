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
6. 导出

- 例子
```js
import axios from 'axios';

// 创建一个 Axios 实例
const instance = axios.create({
baseURL: 'https://api.example.com', // 设置默认的基础 URL
timeout: 5000, // 设置请求超时时间
headers: {
'Content-Type': 'application/json', // 设置默认的请求头
},
});

// 请求拦截器
instance.interceptors.request.use(
(config) => {
// 在发送请求之前可以进行一些处理，例如添加身份验证信息、请求参数处理等
// ...
return config;
},
(error) => {
return Promise.reject(error);
}
);

// 响应拦截器
instance.interceptors.response.use(
(response) => {
// 对响应数据进行处理，例如提取需要的数据、统一处理错误等
// ...
return response.data;
},
(error) => {
// 统一处理请求错误，例如显示错误提示、记录错误日志等
// ...
return Promise.reject(error);
}
);

// 封装 GET 请求
export function get(url, params = {}) {
return instance.get(url, { params });
}

// 封装 POST 请求
export function post(url, data = {}) {
return instance.post(url, data);
}

// 其他 HTTP 方法的封装（PUT、DELETE 等）

export default instance;
```
### 13、项目开发环境的切换 
- 在项目开发过程中，通常需要针对不同的环境进行部署，例如：本地环境、测试环境、生产环境等。因此，需要在开发中使用不同的配置，以保证项目可以在不同的环境下正常运行。
- [切换开发环境]: https://juejin.cn/post/6844904041894395918
  - 定义环境变量配置：通过.env 或 .env.\* 文件定义、配置生产和开发环境，测试环境，
    - NODE_ENV=development # 当前所处的环境，例如：development、production、test 等
    - BASE_URL=http://localhost:3000 # 基础 API 地址
    - API_HOST:'"http://test.api.samego.com"
  - 通过build或者自定义指令来切换不同的开发环境，build切换生产环境，
  - 在 package.json 配置文件里声明并自定义构建指令
  ```js
      "scripts": {
        "build-test": "cross-env NODE_ENV=testing   env_config=test node build/build.js",
        "build-prod": "cross-env NODE_ENV=production env_config=prod node build/build.js"
      }
  ```
  - test或者其他自定义指令来切换测试环境。

### 14、process对象
- Process对象是Node的一个全局对象，提供当前Node进程的信息	。通过 process 对象，我们可以访问运行时的环境变量、命令行参数、标准输入输出流、事件循环等。(可以获知当前进程的很多信息。)
- 常用的 process 对象的属性和方法：
  - process.argv
    这是一个包含命令行参数的数组(返回当前进程的命令行参数数组)。数组的第一个元素是 Node.js 的执行路径，第二个元素是当前执行的 JavaScript 文件的路径，之后的元素则是命令行传入的参数。例如，在命令行运行 node script.js arg1 arg2，process.argv 的值会是 ['node', '/path/to/script.js', 'arg1', 'arg2']。
  - process.env
    这是一个对象，包含了当前进程的环境变量(当前Shell的环境变量，比如process.env.HOME)。可以通过 process.env.VARIABLE_NAME 的形式获取指定的环境变量值。例如，process.env.NODE_ENV 可以获取到当前运行环境。
  - process.cwd()
    返回当前脚本的工作目录的路径。这是执行 Node.js 进程时所在的目录。
  - process.exit(code)
    结束当前进程，并返回给定的退出码 code。通常，0 表示成功，非零值表示有错误发生。
  - process.on(event, listener)
    监听指定的事件并注册事件监听器。常见的事件有：
    1. exit：进程即将退出时触发。
    2. uncaughtException：捕获未被捕获的异常时触发。
  - process.nextTick(callback)
    - 指定回调函数在当前执行栈的尾部、下一次Event Loop之前执行
    - 在事件循环的当前迭代结束后，立即调用回调函数 callback。这个方法在异步操作完成后，但在 I/O 事件之前执行，可以用于设置一个延迟执行的回调函数。
  - process.setgid()：指定当前进程的组，可以使用数字ID，也可以使用字符串ID。
  - process.setuid()：指定当前进程的用户，可以使用数字ID，也可以使用字符串ID。
  - process.getgid()：返回当前进程的组ID（数值）。
  - process.getuid()：返回当前进程的用户ID（数值）。
  - process.stdout 和 process.stderr
    这两个属性分别表示标准输出流和标准错误流。可以使用 process.stdout.write() 和 process.stderr.write() 方法向标准输出和标准错误输出内容。
  - process.stdin
    这个属性表示标准输入流。可以通过 process.stdin.on('data', callback) 来监听从标准输入中读取的数据。
  - process.pid：当前进程的进程号。
  - process.platform：当前系统平台，比如Linux
  - process.title：默认值为“node”，可以自定义该值。
  - process.version：Node的版本，比如v0.10.18。

### 15、webpack打包优化
2. 利用 externals 提取第三方库
3. 利用IgnorePlugin，避免引入无用模块？
4. 压缩代码：可以使用 webpack 的压缩插件如 terser-webpack-plugin、optimize-css-assets-webpack-plugin 等来实现。
5. Code Splitting 代码分割:常用的实现方式有使用动态 import()、splitChunks 插件配置等。
6. 按需加载:某些模块或路由进行按需加载 例如路由，import
7. 外部引入：对于一些体积较大的依赖库，可以考虑通过外部引入的方式，将其从打包文件中剔除，并通过 CDN 或其他方式进行加载。
8. 使用缓存：配置 webpack 的缓存，以避免无效的重新构建。可以通过设置 cache: true 或使用插件如：hard-source-webpack-plugin 来启用缓存功能
9. happyPack 多进程打包
10. 热更新：plugins: [new HotModuleReplacementPlugin()]


### 16、webpack loader和plugins的区别 
都是用于处理模块的工具
1. loader。用于将不同类型的文件（例如 JavaScript、CSS、图片等）转换为 webpack 可以处理的模块.webpack 自带的功能只能处理 javaScript 和 JSON 文件，loader 让 webpack 能够去处理其他类型的文件，并将它们转换成有效的模块，以及被添加到依赖图中。(转换文件、预处理、加载资源（图片）)
2. plugin。 是 webpack 的扩展机制，用于执行一些额外的构建任务或增强 webpack 的功能.插件可以执行范围更广的任务，包括打包优化，资源管理，注入环境变量(执行自定义的构建任务、资源管理和优化（压缩、提取）)


### 17、Vue的组件和插件的区别 
1. 组件注册通过“Vue.component”或“components”属性，而插件通过“Vue.use()”；
2. 组件是用来构成 App 的业务模块，它的目标是“App.vue”，而插件是用来增强技术栈的功能模块，它的目标是 Vue 本身。
3. 组件是 Vue 中构建用户界面的基本单元，是将界面拆分为多个独立可复用的模块。插件是一个包含一系列 Vue 组件、指令、过滤器或其他功能的库,可以通过扩展 Vue 的功能，添加全局级别的功能或工具
4. 组件是用于构建用户界面的模块化单元，可以复用和组合，用于实现视图的分离和代码的重用。而插件是对 Vue 进行扩展，添加全局级别的功能或工具，用于封装和共享可复用的功能逻辑。。

### 18、vue2和vue3的区别 
1. 双向数据绑定原理不同；
2. 是否支持碎片；
3. API类型不同：相比以前的 Options API，Composition API 可以更好地处理逻辑复杂的场景，使得代码更加清晰和易于维护
4. 定义数据变量和方法不同；
5. 生命周期钩子函数不同；
6. 父子传参不同；
7. 指令与插槽不同；
8. main.js文件不同。
9. vue3渲染更快、运行效率更高、加载速度更快更流畅
10. VDOM 的改进：Vue3通过新的标记和算法，减少了生成和比较 VDOM 的成本，从而提高了渲染的效率和性能。
11. TypeScript 支持

### 18、vue3有哪些新增特性？
- 双向数据绑定（数据响应式原理），
- 组合式：composition api, 可以更好的逻辑复用
-  template 模板 多个根节点
- 虚拟dom字段增加（新算法 (更快 更小)）

### 19、 vue3 Composition API 是什么？ 对比 Options API 他有哪些优势？
其代码更易读，更易理解和学习，没有任何幕后操作
Composition API的好处不仅仅是以不同的方式进行编码，更重要的是对于代码的重用
不受模板和组件范围的限制，也可以准确的知道我们可以使用哪些属性
由于幕后没有什么操作，所以编辑器可以帮助我们进行类型检查和建议

### 19、选项式和组合式的区别 
- 组合式 API使用了 setup 函数来定义一个 Vue 组件的属性和方法。
- 在逻辑组织和逻辑复用方面，Composition API是优于Options API
- 因为Composition API几乎是函数，会有更好的类型推断。
- Composition API对 tree-shaking 友好，代码也更容易压缩
- Composition API中见不到this的使用，减少了this指向不明的情况
- 如果是小型组件，可以继续使用Options API，也是十分友好的
- 编程风格不同： 选项式 API 是基于对象的，而组合式 API 是基于函数的。
- 逻辑组织不同： 选项式 API 将逻辑拆分到不同的选项中，而组合式 API 将相关的逻辑聚合在一起。
- 代码复用方式不同： 选项式 API 的代码复用主要是通过混入来实现，而组合式 API 主要通过函数的形式来封装和复用逻辑。
- TypeScript 支持不同： 组合式 API 更容易与 TypeScript 集成，因为它可以更直观地推导类型。

### 20、export和export default的区别 
- 用于导出模块的关键字
  - export 可以导出**多个**
    export const name = 'John';
    export function sayHello() {
    console.log('Hello!');
    }
    import { name, sayHello } from './moduleA';
  - export default 只可以**导出**一个 ,用于将默认导出
    const message = 'Hello!';
    export default message;
    const message = 'Hello!';
    export default message;
- 在同一个模块中，可以同时使用 export 和 export default 导出值。
- 引入命名导出时需要使用**花括号** {}，而引入默认导出时不需要花括号
- 在引入模块时，可以通过**解构赋值**来选择性地导入命名导出，但不能使用解构赋值来导入默认导出。

### 21、Vue3在setup不能使用this的原因
在setup，组件实例还没有被创建