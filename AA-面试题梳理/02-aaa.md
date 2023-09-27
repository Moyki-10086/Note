## 6、直接给一个数组项赋值，Vue 能检测到变化吗？

由于 JavaScript 的限制，Vue 不能检测到以下数组的变动：

- 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
- 当你修改数组的长度时，例如：`vm.items.length = newLength`

为了解决第一个问题，Vue 提供了以下操作方法：

```
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// vm.$set，Vue.set的一个别名
vm.$set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

为了解决第二个问题，Vue 提供了以下操作方法：

```
// Array.prototype.splice
vm.items.splice(newLength)
```

## 7、谈谈你对 Vue 生命周期的理解？

**（1）生命周期是什么？**

Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

**（2）各个生命周期的作用**

| 生命周期      | 描述                                                                                               |
| ------------- | -------------------------------------------------------------------------------------------------- |
| beforeCreate  | 组件实例被创建之初，组件的属性生效之前 ， 没有数据、$el、dom                                       |
| created       | 组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，$el 还不可用 ， 数据和方法可用            |
| beforeMount   | 在挂载开始之前被调用：相关的 render 函数首次被调用 ，创建了$el（未被渲染）、和虚拟 dom             |
| mounted       | el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子，挂载实例、渲染dom($el)、可进行 dom 操作 |
| beforeUpdate  | 组件数据更新之前调用，发生在虚拟 DOM 打补丁之前 ，数据更新、dom 没更新                             |
| update        | 组件数据更新之后 ， 都更新了                                                                       |
| activited     | keep-alive 专属，组件被激活时调用                                                                  |
| deactivated   | keep-alive 专属，组件被销毁时调用                                                                  |
| beforeDestory | 组件销毁前调用 可清理（计时器、订阅）                                                              |
| destoryed     | 组件销毁后调用 ，可释放资源，解绑事件监听                                                          |

## 8、Vue 的父组件和子组件生命周期钩子函数执行顺序？

Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：

- 加载渲染过程

  父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

- 子组件更新过程

  父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

- 父组件更新过程

  父 beforeUpdate -> 父 updated

- 销毁过程

  父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

## 9、在哪个生命周期内调用异步请求？

可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。但是本人推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

- 能更快获取到服务端数据，减少页面 loading 时间；
- ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

## 10、父组件可以监听到子组件的生命周期吗？

### 父子组件传值

比如有父组件 Parent 和子组件 Child，如果父组件监听到子组件挂载 mounted 就做一些逻辑处理，可以通过以下写法实现：

```js
// Parent.vue
<Child @mounted="doSomething"/>

// Child.vue
mounted() {
  this.$emit("mounted");
}
复制代码
```

### @hook

以上需要手动通过 $emit 触发父组件的事件，更简单的方式可以在父组件引用子组件时通过 @hook 来监听即可，如下所示：

```js
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},

//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},

// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ...
```

### 什么是@hook

- https://blog.csdn.net/glorydx/article/details/129259977
- @hook 是用来监听组件生命周期的回调函数。

- 这和生命周期函数 mounted，created，updated 有什么区别？

  - 区别 1：@hook 会在对应的生命周期函数执行后执行。

  ```js
  <!-- 在某个生命周期中，确认另一个生命周期要执行的函数 -->
  mounted () {
    this.$once('hook:beforeDestroy', function () {
      <!-- 内容 -->
    })
  }
  ```

  - 区别 2：@hook 可以在父组件监听子组件的生命周期运行情况。

  ```js
  // 父组件
  <Children @hook:mounted="ButtonRender"/>
  export default {
    name: 'Parents',
    components: {
      Children
  },
    methods: {
      ButtonRender() {
        console.log('渲染完成')
      }
    }
  }
  // 子组件
  mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
  }
  ```

- 当然 @hook 方法不仅仅是可以监听 mounted，其它的生命周期事件，例如：created，updated 等都可以监听。
