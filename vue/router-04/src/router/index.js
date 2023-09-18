import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    // 路由独享,针对某个路由
    // 进入当前页面前
    beforeEnter(to, from, next) {
      console.log('----about route enter-----')
      next()
    }
  },
  {
    // 每次路径转换都会重新渲染页面
    // 不同路径相同组件，页面之间转换，只触发路由导航的钩子，不触发页面组件重新渲染 生命周期的钩子，重用了，没有销毁
    path: '/about2',
    name: 'About2',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// 全局守卫，每次进入页面（包括刷新）都会执行,拦截
/**
 * to   : 到哪去
 * from : 从哪来
 * next : 允许通过
 */
router.beforeEach((to, from, next) => {
  // 业务：统一的导航逻辑处理：判断用户登录状态 或 用户的访问权限
  //  加载动画 等 公共逻辑
  console.log('-----beforeEach------')
  // console.log(to, from)
  // 允许通过
  next()
})

// 全局解析守卫：导航确认之前，组件守卫和异步路由组件解析之后
// 所有异步组件解析完，最后的拦截
router.beforeResolve((to, from, next) => {
  console.log('-----beforeResolve------')
next()
})
// 完成导航,进入路径了，不需要next了
router.afterEach((to, from) => {
  // 结束加载动画（进度条）等 收尾工作
  console.log('-----afterEach------')
 })



export default router
