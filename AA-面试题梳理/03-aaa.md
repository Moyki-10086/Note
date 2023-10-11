## 11、谈谈你对 keep-alive 的了解？

##### 特性
keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态,避免重新渲染 ，其有以下特性：

- 一般结合路由和动态组件一起使用，用于缓存组件，包括数据、DOM 状态和生命周期钩子函数等；
- 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， 
  - include 表示需要被缓存组件名或正则表达式，
  - exclude 表示不需要被缓存的组件名或正则表达式 
  - 其中 exclude 的优先级比 include 高；
- 供 max 属性：指定缓存的组件实例数量上限。当超过该数量时，最先缓存的组件实例将被销毁。
```js
<template>
  <div>
    <button @click="toggleComponent">切换组件</button>
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentComponent: 'ComponentA'
    };
  },
  methods: {
    toggleComponent() {
      this.currentComponent = this.currentComponent === 'ComponentA' ? 'ComponentB' : 'ComponentA';
    }
  }
};
</script>
```
##### 生命周期

- 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。
- 在 activated 和 deactivated 钩子函数中**不能使用箭头函数**，因为箭头函数没有自己的上下文（this 指向），而是继承了父级上下文。
##### 存储
当组件被 keep-alive 缓存时，它的实例会存储在 keep-alive 组件内部的缓存容器中。keep-alive 组件内部的缓存容器存储在 Vue 实例的 _vnode 属性中

具体来说，keep-alive 组件会在自身的 $options 对象中维护一个名为 _cache 的属性，这是一个对象，用于存储被缓存的组件实例。每个组件实例都有一个唯一的 uid 属性，作为键值存储在 _cache 对象中。

当组件被激活（重新进入可视区域）时，keep-alive 组件会从缓存容器中查找该组件的实例，并将其重新渲染到组件树中。当组件离开可视区域时，实例仍然保留在缓存容器中。

需要注意的是，keep-alive 缓存的组件实例并不会被挂载到文档中，而是通过虚拟 DOM 进行管理和操作。这样可以更高效地控制组件的状态和生命周期，以便在需要时进行重用。
## 12、组件中 data 为什么是一个函数？

为什么组件中的 data 必须是一个函数，然后 return 一个对象，而 new Vue 实例里，data 可以直接是一个对象？

```js
// data
data() {
  return {
	message: "子组件",
	childName:this.name
  }
}

// new Vue
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})

```

### 组件
 组件是用来复用的，且 JS 里对象是引用关系，
 - 如果组件中 data 是一个对象
    那么这样作用域没有隔离，对象是引用数据类型，它就会共用一个内存地址，子组件中的 data 属性值会相互影响，造成数据污染。
 - 如果组件中 data 选项是一个函数
    数据是以函数返回值形式定义的，，那么每个实例可以维护一份被返回对象的独立的拷贝，这样每复用一次data，都会返回一份新的data，拥有自己的作用域。组件实例之间的 data 属性值不会互相影响
 ###  new Vue 
 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。

## 13、v-model 的原理？

我们在 vue 项目中主要使用 v-model 指令在表单 input、textarea、select 等元素上创建双向数据绑定，现了表单控件和数据之间的自动同步，从而降低了组件编写的难度和复杂度。
我们知道 v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

- text 和 textarea 元素使用 value 属性和 input 事件；
- checkbox 和 radio 使用 checked 属性和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件。

以 input 表单元素为例：

```html
<input v-model='something'>
    
相当于

<input v-bind:value="something" v-on:input="something = $event.target.value">
```

如果在自定义组件中，v-model 默认会利用名为 value 的 prop 和名为 input 的事件，如下所示：

```js
父组件：
<ModelChild v-model="message"></ModelChild>

子组件：
<div>{{value}}</div>

props:{
    value: String
},
methods: {
  test1(){
     this.$emit('input', '小红')
  },
},
```

## 14、Vue2 组件间通信有哪几种方式？

Vue 组件间通信是面试常考的知识点之一，这题有点类似于开放题，你回答出越多方法当然越加分，表明你对 Vue 掌握的越熟练。Vue 组件间通信只要指以下 3 类通信：父子组件通信、隔代组件通信、兄弟组件通信，下面我们分别介绍每种通信方式且会说明此种方法可适用于哪类组件间通信。

### **（1）`props / $emit` 适用 父子组件通信**

这种方法是 Vue 组件的基础，相信大部分同学耳闻能详，所以此处就不举例展开介绍。

### **（2）`ref` 与 `$parent / $children` 适用 父子组件通信**

- `ref`：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
- `$parent` / `$children`：访问父 / 子实例

### **（3）`$attrs`/`$listeners` 适用于 隔代组件通信**

- `$attrs`：包含了父作用域中不被 prop 所识别 (且获取) 的特性绑定 ( class 和 style 除外 )(父组件传递给子组件的非 prop 属性的对象)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 ( class 和 style 除外 )，并且可以通过 `v-bind="$attrs"` 传入内部组件。通常配合 inheritAttrs 选项一起使用。
- `$listeners`：包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器(父组件传递给子组件的所有监听器的对象)。它可以通过 `v-on="$listeners"` 传入内部组件,将这些监听器绑定到子组件的根元素上
```js
// 父组件
<template>
  <child-component :foo="foo" v-on:click="handleClick" />
</template>

<script>
export default {
  data() {
    return {
      foo: 'bar'
    };
  },
  methods: {
    handleClick() {
      // 处理点击事件
    }
  }
};
</script>

// 子组件
<template>
  <div>
    <p>{{ $attrs.foo }}</p>
    <button v-on="$listeners">Click me</button>
  </div>
</template>

<script>
export default {
  inheritAttrs: false, // 禁止默认属性继承
};
</script>

```
### **（4）`provide / inject` 适用于 隔代组件通信,vue2和vue3均能使用**

祖先组件中通过 provider 来提供变量（在父组件中提供数据），然后在子孙组件中通过 inject 来注入变量（接收这些数据）。 provide / inject API 主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。
```js
// 父组件
<template>
  <div>
    <child-component />
  </div>
</template>

<script>
export default {
  data() {
    return {
      sharedData: 'Hello'
    };
  },
  provide() {
    return {
      sharedData: this.sharedData
    };
  }
};
</script>

// 子组件
<template>
  <div>
    <p>{{ sharedData }}</p>
  </div>
</template>

<script>
export default {
  inject: ['sharedData']
};
</script>

```
### **（5）`EventBus （$emit / $on）` 适用于 父子、隔代、兄弟组件通信**

这种方法通过一个空的 Vue 实例作为中央事件总线（事件中心），用它来触发事件和监听事件，从而实现任何组件间的通信，包括父子、隔代、兄弟组件。
```js
// 创建事件总线实例
const bus = new Vue();

// 在发送消息的组件中使用 $emit 方法
bus.$emit('eventName', data);

// 在接收消息的组件中使用 $on 方法监听事件
bus.$on('eventName', (data) => {
  // 处理接收到的数据
});

```
### **（6）Vuex 适用于 父子、隔代、兄弟组件通信**

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。

- Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
- 改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。

## 15、你使用过 Vuex 吗？

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。

- （1）Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

- （2）改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。

### 主要包括以下几个模块：

- State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
- Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
- Mutation：是唯一更改 store 中状态的方法，且必须是同步函数。
- Action：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
- Module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。
