[阮一峰的css变量](https://www.ruanyifeng.com/blog/2017/05/css-variables.html)

## 
CSS 变量（CSS variable）又叫做"CSS 自定义属性"（CSS custom properties），可以通过JS动态改变。

### 一、变量的声明
变量名前面要加两根连词线–，变量名大小写敏感。
```css
:root {
  --main-color: #4d4e53;
  --main-bg: rgb(255, 255, 255);
  --logo-border-color: rebeccapurple;
  --header-height: 68px;
  --content-padding: 10px 20px;
  --base-color: var(----main-color); 
}
```
以上*–main-color*，–main-bg，–logo-border-color就是设置在根标签html 下的css 变量

### 二、var() 函数
var()函数用于读取变量。
```css
.box {
  color: var(--main-color);
  height: var(--header-height);
}
```
var()函数还可以使用第二个参数，表示变量的默认值。如果该变量不存在，就会使用这个默认值。
```css
.box {
  color: var(--main-color, #000);
  height: var(--header-height, 80px);
}
```
### 三、变量值的类型
如果变量值是一个字符串，可以与其他字符串拼接。
如果变量是数值，必须使用calc()函数，将它们连接(添加单位)。
```css
.foo {
  --gap: 20;
  margin-top: calc(var(--gap) * 1px);
}
```
### 四、作用域
```html
<style>
  :root { --color: blue; }
  div { --color: green; }
  #alert { --color: red; }
  * { color: var(--color); }
</style>

<p>蓝色</p>
<div>绿色</div>
<div id="alert">红色</div>
```
三个选择器都声明了–color变量。不同元素读取这个变量的时候，会采用优先级最高的规则，因此三段文字的颜色是不一样的。

### 五、响应式布局
响应式布局的media命令里面声明变量，使得不同的屏幕宽度有不同的变量值。
```css
:root {
  --main-color: #4d4e53;
  --main-bg: rgb(255, 255, 255);
}
body {
}
@media screen and (min-width: 768px) {
	:root {
	  --main-color: #ffffff;
	  --main-bg: rgb(255, 134, 255);
	}
	body {
	}
}
```
### 六、兼容性处理
使用@support命令进行检测。
```css
a {
  color: #7F583F;
  color: var(--primary);
}

@supports ( (--a: 0)) {
  /* supported */
}

@supports ( not (--a: 0)) {
  /* not supported */
}
```
### 七、JavaScript 操作
```js
// 设置变量
document.body.style.setProperty('--primary', '#7F583F');

// 读取变量
document.body.style.getPropertyValue('--primary').trim();
// '#7F583F'

// 删除变量
document.body.style.removeProperty('--primary');
```
## 趣味案例
### 打字机（年度报告项目）
实现方式：
```js
<p class="greet-info line-5">
  <span v-for="(item, index) in greetInfoArr" :key="'greet-' + index" :style="'--greet-index:' + (index + 1)">
    {{ item }}
  </span>
</p>

export default {
computed: {
    greetInfoArr() {
      return this.greetInfo.split('')
    }
  },
  data() {
    return {
      greetInfo:
        '“开始完成一件事情，比做好它更重要。因为只要开始了，你就有机会把它做的更好”'
    }
  }
}

<style lang="scss">
.greet-info {
  position: absolute;
  z-index: 9;
  left: 18.75%;
  bottom: 7.41%;
  font-size: 24px;
  font-weight: 400;
  color: #ffffff;
  line-height: 33px;
  @keyframes revolveScale {
    60% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
  span {
    display: inline-block;
    opacity: 0;
    --time: calc(var(--greet-index) * 0.1s + 2s);
    // forwards当动画完成后，保持最后一帧的状态
    animation: revolveScale 0.4s forwards; 
    animation-delay: var(--time);
  }
}
</style>

```

### 自动变色进度条
实现方式：
```js
<!-- 
  当进度小于 30% 时，背景呈红色
  当进度大于 30% 并且 小于 60% 时，背景呈橙色
  当进度大于 60% 并且 小于 90% 时，背景呈蓝色
  当进度大于 90% 时，背景呈绿色 -->
  <div class="bar" style="--percent: 50"></div>

<style lang="scss">
.bar {
  display: flex;
  width: 600px;
  height: 20px;
  background-color: #f5f5f5;
}
.bar::before {
  // 创建或重置一个或多个计数器
  counter-reset: progress var(--percent);
  // counter() 函数以字符串形式返回当前计数器的值, 表示空格
  content: counter(progress) '%\2002';
  display: flex;
  justify-content: end;
  width: calc(var(--percent) * 1%);
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
  // 渐变色
  background-image: linear-gradient(green, green),
    linear-gradient(#2486ff, #2486ff), linear-gradient(orange, orange),
    linear-gradient(red, red);
  background-size: calc((var(--percent) - 90) * 100%) 100%,
    calc((var(--percent) - 60) * 100%) 100%,
    calc((var(--percent) - 30) * 100%) 100%, 100% 100%;
}
</style>


```
### 悬浮跟踪按钮
实现方式：
```js
<div class="bruce flex-ct-x">
  <a class="track-btn">
	<span>妙用CSS变量，让你的CSS变得更心动</span>
  </a>
</div>

// js 监听鼠标修改变量值
const btn = document.getElementsByClassName("track-btn")[0];
const btnStyle = btn.style;
btn.addEventListener("mousemove", e => {
  btnStyle.setProperty("--x", `${e.offsetX}px`);
  btnStyle.setProperty("--y", `${e.offsetY}px`);
});
.bruce {
   overflow: hidden;
   height: 100vh;
}
.flex-ct-x {
   display: flex;
   justify-content: center;
   align-items: center;
}
.track-btn {
  overflow: hidden;
  position: relative;
  border-radius: 25px;
  width: 400px;
  height: 50px;
  background-color: #66f;
  cursor: pointer;
  line-height: 50px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  span {
	position: relative;
	pointer-events: none; // 不加会卡顿
  }
  &::before {
	--size: 0;
	position: absolute;
	left: var(--x);
	top: var(--y);
	width: var(--size);
	height: var(--size);
	background-image: radial-gradient(circle closest-side, #09f, transparent);
	content: "";
	transform: translate3d(-50%, -50%, 0);
	transition: width 200ms ease, height 200ms ease;
  }
  &:hover::before {
	--size: 400px;
  }
}

```