### v-model 的使用和使用原理

### 一：什么是 v-model

  - v-model 是 Vue 中常用的指令之一，主要用于在表单元素和 Vue 实例的数据之间建立双向绑定关系，使得数据的变化能够自动更新到视图，同时用户的输入也可以自动同步到数据中。
  - 也可用于父子组件之间的数据传递。在父子组件之间，父组件可以使用 v-model 来传递数据给子组件，并且子组件可以通过触发事件将数据传递回父组件，实现数据的双向流动。是 v-bind:value 和 v-on:input 的简化写法。
  - 注意：一个组件只能使用一次 v-model，多对数据绑定可以使用.sync 修饰符

### 二：v-model 的本质

  - v-model 是一种语法糖，本质上是对 v-bind 和 v-on 的封装，通过 v-bind 将 Vue 实例的数据绑定到 value 属性上，并通过 v-on 监听 input 事件，实现了数据的双向绑定。

### 三：父子组件通信

  ## 方法一（传统）：

  * 通过 props down 和 events up 实现

    1. 父传子(props down)：父组件通过 props 属性将数据或方法通过 props 属性传递到子组件中。父子组件之间的数据流向是单向的，只能从父组件传递给子组件，不能反向传递。
    2. 子传父(events up)：子组件通过触发 this.$emit() 事件将数据作为参数传递给父组件

  # 补充： props 的单项数据流模式

  - 子组件只能读取，不能修改父组件传递的值（对象类型除外）；
  - 如要直接修改，只在当前子组件内部进行改变，不会影响父组件
  - 子组件能够通过 this.$emit('',) 修改父组件内容

  ## 方法二（一个组件只能使用一次）：

  * 使用 v-model指令（方便、高效），是方法一的简化写法

    - 当子组件需要与父组件同步数据时（子组件既使用又修改数据时），可使用 v-model
    - 注：子组件不用修改数据时，可直接使用方法一

  ## 方法三（可以多次使用）：

  * .sync 修饰符，可以实现多对数据绑定。




### 方法一：v-model 之前的写法：

# 父组件：

  <template>
      <child-vue 
      :msg='message'
      @change='message = $event'
      />
  </template>
  <script>
      export default { 
        components: {
         childVue
        },
        data(){
          return {
            message: '父组件内容'
          }
        }
      }
  </script>

# 子组件：
  <template>
    <div> {{msg}}</div>
    <button @click='parentChange'> 修改传递的内容 </button>
  </template>
  <script>
      export default { 
        props: {
          msg:{
            type: String
          }
        },
        methods:{
          parentChange(){
            this.$emit('change','子组件内容')
          }
        }
      }
  </script>

### 方法二：v-model 方法

v-model='message'--本质--> :value="message" + @input="message = 事件参数"
value --本质--> 接受传递父组件数据

# 父组件：

  <template>
      <child-vue 
     v-model='message'
      />
  </template>
  <script>
      export default { 
        components: {
         childVue
        },
        data(){
          return {
            message: '父组件内容'
          }
        }
      }
  </script>
  
# 子组件：
 <template>
    <div> {{value}}</div>
    <button @click='parentChange'> 修改传递的内容 </button>
  </template>
  <script>
      export default { 
        props: {
          value:{
            type: String
          }
        },
        methods:{
          parentChange(){
            this.$emit('input','子组件内容')
          }
        }
      }
     
  </script>
