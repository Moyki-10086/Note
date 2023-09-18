<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>

export default {
  // created () {
  //   console.log('about  created');
  // },

  // 注意路由守卫钩子函数顺序
  beforeRouteEnter (to, from, next) {
    // 注意：不能获取组件实例this,当前守卫执行前，组件实例没被创建
     console.log('about route enter');
    next()
  },
  
  // 用于更新路由路径时，不同路径相同组件，组件重复调用的情况
  // 1.方法一
  // watch: {
  //   $route () {
  //     console.log('about route update watch');
  //   }
  // },

  
  // 2.方法二
  beforeRouteUpdate(to, from, next) {
    console.log('about route update');
    next()
  },


  beforeRouteLeave (to, from, next) {

    // console.log('准备离开about');
    console.log('about route leave');
    next()
    // console.log(to, from);
    // 业务场景：
    // 1.
    // if (to.name === 'Home') {
    // console.log('要离开about了');
    // next()
    // }
    // else  console.log('禁止离开about');


    // 2.
    //   if (window.confirm('Are you sure you want to leave')) {
    //   console.log('要离开about了');
    // // 允许离开
    //  next()
    // }
  },
}
</script>