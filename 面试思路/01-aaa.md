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
通过变量，管理常量函数名，导出变量

### 11.使用github在线vscode
1. 将com改为dev
2. 在github后加1s

### 12. babel.config.js文件
一个用于配置Babel编译工具的文件。
主要作用是将ECMAScript 2015+ 版本的代码，转换为向后兼容的JS语法，以便能够运行在当前和旧版本的浏览器或其它环境中。
Vue项目中普遍使用ES6语法，若要求兼容低版本浏览器，就需要引入Babel，将ES6转换为ES5。

### 13.网页调试
- 定位到指定样式：ctrl+shift+c
- setTimeout( () => { debugger; },2000 )

### 14.vue this
除了.vue文件，都获取不到this,
都需要导入，例如组件功能

### 15.项目页面业务
每个页面只能完成一个功能，其他功能放到组件或其他页面

### 16.事件方法获取触发事件元素
用$event

### 17.父子传值，可以传递函数，
函数写在methods里，不写在数组里

### 18.函数执行
函数执行时，被放入执行栈，执行完释放，在执行栈中删除。  
**闭包**不会被释放，因为被外部有引用。导致栈溢出，内存泄漏-->使用完后主动释放 或 垃圾回收机制

### 19客户端渲染和服务端渲染
[图片](./img/ccc.png)
<img src="./img/ccc.png"/>

### 20.提出问题 ---> 对应解决办法 ---> 实例例子

### 21.VueUse  函数库 
多是vue3使用

### 22.使用组件
1. 可以将方法写在父组件,通过props传到子组件
2. 可以传递多个props
3. props可以是数据，可以是方法
3. props可接收指定的参数类型
4. props 可以设置默认值
5. 传递props可以作为事件的参数
6. 使用$emit触发父组件事件，传递值给父组件
```js
// 父组件
    <CTree :propsData="propsData" :loadNode="loadNode" :data="data" :handleNodeClick="handleNodeClick" />
// propsData、data ---> 是数据
// loadNode、handleNodeClick ---> 是方法

 propsData: [
        {
          id: 1,
          name: '搜索-default',
          handler: this.search
        }, {
          id: 2,
          name: '重置-default',
          handler: this.reset
        }
      ]

add(){
  this.$emit('handleNodeClick', this.data)
}
```
```js
// 子组件
<el-tree :propsData="this.propsData" :load="this.loadNode" lazy :data="this.data" :auto-expand-parent="false" @node-click="handleNodeClick && handleNodeClick($event, data)"
  @size-change="val => $emit('sizeChange', val)">
</el-tree>

 props: {
    propsData: {
      type: [Object,Array]
    },
    loadNode: {
      type: Function
    },
    data: {
      type: Array,
      default: () => []
    },
    handleNodeClick: {
      type: Function
    }
  }
// type: Object,
//   default: () => ({
//      page: 0,
//      size: 10
//    })

```
### 23.使用 ？.
```js
getDept({ pid: node?.data?.id })
```
node?.data?.id：这是一个链式调用，用于获取一个对象中的属性值。首先，它会检查node对象是否存在，如果存在则继续访问data属性，再继续访问id属性。如果任何一个属性不存在，整个链式调用会返回undefined。

### 24.使用 && 
```js
getDept(this.name && { name: this.name })
```
属性值是this.name的值（如果this.name存在），否则属性值为undefined。

### 25.使用vuex导入数据和方法
1. state、geter、mapState 导入 computed
```js
 computed: {
    ...mapState('user', ['deptId', 'deptOptions'])
  },
```
2. mutations、actions、mapMutations 导入 methods
```js
 methods: {
    ...mapMutations('user', ['UPDATE_DEPTID']),
    // ...mapMutations('user', [UPDATE_DEPTID]),
    handleNodeClick (data) {
      console.log(data)
      this.UPDATE_DEPTID(data.id)
      // this[UPDATE_DEPTID](data.id)
    }
```
### 26.多个相似内容
多个相似组件、可以用循环，某个不同可以用if判断挑出来

### 27.每个页面
每个页面只允许一个功能，其余用组件拆分，若一个页面拆分多个部分（非最终组件），可将内容设置为一个文件夹中（index代表此页面，其余代表分出的部分），最终组件可单独放入一个文件夹（为index）

### 28.axios
axios 封装时，参数 除get为params 其余均为data

### 29.父子传值时，参数与显示内容不匹配
可以在传入参数使用自定方法，返回指定内容
```js
父
 data: [
        {
            prop: 'gender',
            label: '性别',
            filter: (row) => {
              return row.gender ? '男' : '女'
            }
          }
]
子
   <span v-if="!item.type">{{ item.filter? item.filter(scope.row):scope.row[item.prop] }}</span>
```
### 30.若接口参数为多个组件的值时
可以使用扩展运算符展开，若不需要某个参数，将参数设为空对象即可
```js
// 默认全部参数写入
 getData () {
      const params = {
        sort: 'id,desc',
        ...this.searchParams,
        ...this.pages,
        page: this.pages.page - 1,
        deptId: this.searchDeptId
      }
      getUsers(params).then(res => { })
    }
// 使用时更改数据
   btnClick (item) {
      this.pages.page = 1
      this.searchParams = item
      this.getData()
    },
```
### 31.父子通信直接使用子组件方法 ref
```js
// 父组件
    <CDialog  ref="userInfo" @update:visible="btnClick"/>

// 使用子组件方法
iconEditor (event, row) {
      console.log('编辑数据', row)
      this.$refs.userInfo.isShow(true, row)
    },
```
```js
// 子组件
isShow (isEdit, data) {

}
```
### 32.注意使用methods时
如果在 if 下 更新页面显示数据，可能会造成 false的情况下数据仍然显示。
原因dom未更新时，数据就被复制了，所以应等dom渲染完后，再去判断if
在if 前 使用 ** await this.$nextTick()** 可等待dom渲染（nextTick ---> 数据更新时获取dom）

### 33.使用表格显示数据时，注意
1. 对应的v-model是否为父组件传递的内容的下级
2. 确定使用对应传递的propo 在后台数据中的位置
3. 获取如Switch 时，对应的父组件传的内容
```js
// 表头
<el-form-item label="部门" prop="dept.id">
            <treeselect v-model="formData.dept.id" :options="optionDept" placeholder="请选择部门"
              :load-options="loadOptions" />
          </el-form-item>
// tablebody
          <el-switch v-model="scope.row[item.prop]" @change="item.handler(scope.row)"></el-switch>

```

### 34.单点登录
单点登录英文全称Single Sign On，简称就是SSO。它的解释是：在多个应用系统中，只需要登录一次，就可以访问其他相互信任的应用系统。
单点登录，资源都在各个业务系统这边，不在SSO那一方。 用户在给SSO服务器提供了用户名密码后，作为业务系统并不知道这件事。 SSO随便给业务系统一个ST，那么业务系统是不能确定这个ST是用户伪造的，还是真的有效，所以要拿着这个ST去SSO服务器再问一下，这个用户给我的ST是否有效，是有效的我才能让这个用户访问。
1. 不同域下的单点登录
 - CAS官网上的标准流程，具体流程如下：
 1. 用户访问app系统，app系统是需要登录的，但用户现在没有登录。
 2. 跳转到CAS server，即SSO登录系统。 SSO系统也没有登录，弹出用户登录页。
 3. 用户填写用户名、密码，SSO系统进行认证后，将登录状态写入SSO的session，浏览器（Browser）中写入SSO域下的Cookie。
 4. SSO系统登录完成后会生成一个ST（Service Ticket），然后跳转到app系统，同时将ST作为参数传递给app系统。
 5. app系统拿到ST后，从后台向SSO发送请求，验证ST是否有效。
 6. 验证通过后，app系统将登录状态写入session并设置app域下的Cookie。
 - 至此，跨域单点登录就完成了。以后我们再访问app系统时，app就是登录的。接下来，我们再看看访问app2系统时的流程。
 1. 用户访问app2系统，app2系统没有登录，跳转到SSO。
 2. 由于SSO已经登录了，不需要重新登录认证。
 3. SSO生成ST，浏览器跳转到app2系统，并将ST作为参数传递给app2。
 4. app2拿到ST，后台访问SSO，验证ST是否有效。
 5. 验证成功后，app2将登录状态写入session，并在app2域下写入Cookie。
 - 这样，app2系统不需要走登录流程，就已经是登录了。SSO，app和app2在不同的域，它们之间的session不共享也是没问题的。
2. 同域下的单点登录
   - cookie
     sso登录以后，可以将Cookie的域设置为顶域，即.a.com，这样所有子域的系统都可以访问到顶域的Cookie。我们在设置Cookie时，只能设置顶域和自己的域，不能设置其他的域。比如：我们不能在自己的系统中给baidu.com的域设置Cookie。
   - session
   我们在sso系统登录了，这时再访问app1，Cookie也带到了app1的服务端（Server），app1的服务端怎么找到这个Cookie对应的Session呢？这里就要把3个系统的Session共享，共享Session的解决方案有很多，例如：Spring-Session。
