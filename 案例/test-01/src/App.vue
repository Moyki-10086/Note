<template>
  <div id="app">
    <!-- 第一层 -->
    <el-checkbox :indeterminate="isIndeterminate" v-model="ifAll" @change="allCheck">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>

    <ul v-for="(item, index) in dataList" :key="item.me_id">

      <el-checkbox :indeterminate="item.isHalf" v-model="item.isCheck" @change="thisCheck(item, index)" :label="item">{{
        item.me_name }}</el-checkbox>
      <!-- 第二层 -->
      <div style="margin: 15px 0;"></div>

      <ul class="fl">
        <el-checkbox :label="k" v-for="k in item.children" :key="k.re_id" v-model="k.isCheck"
          @change="groupCheck(k, item)">{{ k.re_name }}</el-checkbox>
      </ul>
    </ul>
  </div>
</template>

<script>
import { menuPage, resource } from './util/exp'

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      // 总列表
      menu: [],
      res: {},
      dataList: [],
      // 选中列表
      nowMenu: [],
      nowRes: [],
      // 是否半选
      isIndeterminate: false,
      // 是否全选
      ifAll: false,

    }
  },
  methods: {
    // 一级标题
    allCheck (val) {
      if (val) {
        this.isIndeterminate = false
        this.dataList.forEach(item => {
          item.isCheck = true;
          item.isHalf = false
          if (item.children) {
            item.children.forEach(child => {
              child.isCheck = true
            })
          }
        }
        )
      } else {
        this.isIndeterminate = false
        this.dataList.forEach(item => {
          item.isCheck = false;
          item.isHalf = false
          if (item.children) {
            item.children.forEach(child => {
              child.isCheck = false
            })
          }
        }
        )
      }
    },
    // 二级标题
    thisCheck (val) {
      if (!val.children) {
        this.parentAll()
        return
      }
      val.isHalf = false
      if (val.isCheck) {
        val.children.forEach(item => {
          item.isCheck = true
        })
      } else {
        val.children.forEach(item => {
          item.isCheck = false
        })
      }
      // 父级
      this.parentAll()
    },
    // 二级group
    groupCheck (chi, par) {
      // 子集全选
      console.log(chi.isCheck);
      if (this.allChildCheck(par.children)) {
        par.isCheck = true
        par.isHalf = false
      }
      // 半选
      else if (this.anyChildCheck(par.children)) {
        par.isCheck = false
        par.isHalf = true
      }
      // 子集全不选
      else if (this.noChildCheck(par.children)) {
        par.isCheck = false
        par.isHalf = false
        console.log('this----', par.isHalf);
      }

      console.log(par.isCheck, par.isHalf);

      this.parentAll()

    },
    // 判断全部
    parentAll () {
      // 父级全选
      if (this.allChildCheck(this.dataList)) {
        this.ifAll = true
        this.isIndeterminate = false
      }
      // 父级半选
      else if (this.dataList.some(item => item.isHalf === true) || this.dataList.some(item => item.isCheck === true)) {
        this.ifAll = false
        this.isIndeterminate = true
      }
      // 父集全不选
      else if (this.noChildCheck(this.dataList)) {
        this.ifAll = false
        this.isIndeterminate = false
      }

    },
    // 判断子集是否都为选中
    allChildCheck (arr) {
      const ifTrue = arr.every(item => item.isCheck === true)
      return ifTrue
    },
    // 判断子集是否都未选中
    noChildCheck (arr) {
      const ifTrue = arr.every(item => item.isCheck === false)
      return ifTrue
    },
    // 判断是否为半选
    anyChildCheck (arr) {
      const ifTrue = arr.some(item => item.isCheck === true)
      return ifTrue
    }
  },
  computed: {
  },
  mounted () {
    menuPage().then(res => {
      this.menu = res.data.list
      console.log(this.menu);
      this.menu.forEach(item => {
        console.log(item);
        this.dataList.push({
          ...item,
          isCheck: false,
          isHalf: false
        })
      })
      console.log(this.dataList);
    })
    resource().then(res => {
      this.res = res.data
      this.dataList = this.dataList.map(item => {
        if (this.res[item.me_id]) {
          const arr = this.res[item.me_id].map(k => {
            return {
              ...k,
              isCheck: false
            }
          })
          return {
            ...item,
            children: arr
          }
        } else {
          return {
            ...item,
            children: null
          }
        }
      })
    })
  }
}
</script>
<style>
.fl {
  display: flex;
  flex-direction: column;
}
</style>