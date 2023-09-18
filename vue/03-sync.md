
##  .sync修饰符
* .sync修饰符 是一个语法糖 ，用于实现父子组件之间双向绑定，实现多个数据同步。与 v-model类似

* 使用建议 ：优先使用v-model，多个数据时，最主要的数据使用v-model指令,其他数据使用.sync修饰符



### 例子

  :foo.sync='foo'   ---相当于--- >
    :foo='foo' -- props down 传递数据
    @update:foo="foo = 事件参数" -- 自定义事件


##### 父组件：
  <template>
      <child-vue 
     v-model='message'
     :foo.sync='foo'
      />
  </template>
  <script>
      export default { 
        components: {
         childVue
        },
        data(){
          return {
            message: '父组件内容111'
            foo: '父组件内容222'
          }
        }
      }
  </script>

##### 子组件：
 <template>
    <div> {{value}}</div>
    <div> {{foo}}</div>
    <button @click='parentChange'> 修改传递的内容111 </button>
     <button @click='$emit('update:foo','子组件内容222')'> 修改传递的内容222 </button>
  </template>
  <script>
      export default { 
        props: {
          value:{
            type: String
          },
          foo:{
            type: String
          },
        },
        methods:{
          parentChange(){
            this.$emit('input','子组件内容111')
          }
        }
      }
     
  </script>
