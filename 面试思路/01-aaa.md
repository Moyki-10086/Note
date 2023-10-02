### 1.路由和组件：
#### 路由
路由一般都有新窗口
#### 组件
- 同一个路由内产生的是组件。组件 通过v-show,v-if显示隐藏,
- 使代码看上去更简----使用组件
#### 
* 同一个路由内  ： 相同重复内容可以写成组件，太小的可以不用；
* 点击时，跳转新窗口都是路由（相同时，可以是同一个路由）
* 路由内打开的 是组件

### 2.在路由中，path 参数用于指定页面的路径。在path参数中，写斜杠("/")与不写斜杠的区别如下：

#### 写斜杠 ("/"): path:'/bb' ----> 绝对路由---->/bb

当路径的path参数以斜杠开头时，代表从根路径（即网站的根目录）开始匹配。
通常用于指定网站的顶级路由，如首页或者某个独立页面的路由。

#### 不写斜杠:path:'bb' ----> 相对路由---->/aa/bb ----> redirect:'/bb'

当路径的path参数不以斜杠开头时，代表从当前路径开始匹配。例如，path: 'dashboard' 表示当前路径下的dashboard路径。
通常用于子路由或者嵌套路由。是相对于父路由的路径，用于匹配位于父级路由下特定路径的路由。

#### 总结：

写斜杠 ("/")：表示根路径，从网站的根目录开始匹配。
不写斜杠：表示相对于当前路径的子路径，用于子路由或者嵌套路由的匹配。


### 3.git 提交规范、代码规范
 [git 规范](https://juejin.cn/post/6979515308143263751)


### 4.封装axios时，加入请求和响应拦截
- 请求拦截器
```js
axios.interceptors.request.use(
  config => {
    // 在请求发送前的处理逻辑
    config.headers.Authorization = 'Bearer Token';
    return config;
  },
  error => {
    // 请求错误处理
    return Promise.reject(error);
  }
);
```
-  响应拦截
```js
axios.interceptors.response.use(
  response => {
    // 对响应数据的处理逻辑
    return response;
  },
  error => {
    // 响应错误的处理逻辑
    return Promise.reject(error);
  }
);
```
### 5.使用路由守卫
---
### 6. 密码校验：前瞻 ?=
> /^(?=.*\d)(?=.*[a-z])(?=.=*[A-Z])(?=.*[$@,_.])[\da-zA-Z$@,_.]{6,12}$/
-
  - (?=.*\d) ：只要出现任意数字（\d）
  - [\da-zA-Z$@,_.] ：禁止出现
  - {6,12} ：长度

---
### 7. 使用pnpm install 创建vue3项目

它较npm和Yarn在性能上得到很大提升，被称为快速的，节省磁盘空间的包管理工具，多用于vue3

### 8. postcss 添加 网页前缀
- 在postcss.config.js 中 添加autoprefixer
<img src='./img/aaa.png'/>

### 9. 更换主题
- css variable （css变量）
设置root 变量
- 框架：如windicss
根据当前电脑主题颜色，修改项目根节点的类
<img src="./img/bbb.png"/>

### 10. 设置count 文件夹
管理常量，导出

### 11.使用github在线vscode
1. 将com改为dev
2. 在github后加1s