<template>
  <div id="app">
    <!-- 第一层 -->
    <el-checkbox :indeterminate="isIndeterminate1" v-model="ifAll" @change="allCheck">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>

    <ul v-for="item in menu" :key="item.me_id">

      <el-checkbox :indeterminate="isIndeterminate2[item.me_id]" v-model="ifThis[item.me_id]" @change="thisCheck(item)"
        :label="item">{{ item.me_name }}</el-checkbox>
      <!-- 第二层 -->
      <div style="margin: 15px 0;"></div>

      <el-checkbox-group v-model="nowRes[item.me_id]" @change="groupCheck(item)">
        <ul class="fl">
          <el-checkbox :label="k" v-for="k in res[item.me_id]" :key="k.re_id">{{ k.re_name }}</el-checkbox>
        </ul>
      </el-checkbox-group>




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
      // 选中列表
      nowMenu: [],
      nowRes: {},
      // 是否半选
      isIndeterminate1: false,
      isIndeterminate2: {},
      // 是否全选
      ifAll: false,
      ifThis: {},

    }
  },
  methods: {
    // 一级标题
    allCheck (val) {
      console.log(val);
      this.nowMenu = val ? JSON.parse(JSON.stringify(this.menu)) : []
      this.isIndeterminate1 = false;
      this.resetFalse(this.isIndeterminate2)
      if (val) {
        this.menu.forEach(item => {
          this.ifThis[item.me_id] = true
          this.nowRes[item.me_id] = this.ifThis[item.me_id] ? this.res[item.me_id] : [];
        })
      }
      else {
        this.menu.forEach(item => {
          this.ifThis[item.me_id] = false
          this.nowRes[item.me_id] = []
        })
      }
      console.log(this.res);
      console.log(this.nowRes);
      console.log(this.nowMenu);
      
    },
    // 二级标题
    thisCheck (val) {
      // 子判断
      this.nowRes[val.me_id] = this.ifThis[val.me_id] ? this.res[val.me_id] : [];
      this.isIndeterminate2[val.me_id] = false;

      // 父级判断
console.log(this.nowMenu);
      let ifId = this.nowMenu.findIndex(item => item.me_id == val.me_id)

      console.log(this.isIndeterminate2[val.me_id]);
      console.log(this.nowRes[val.me_id]);
      console.log(this.ifThis[val.me_id]);
      console.log(ifId);
      console.log(this.nowMenu);
      if (ifId == -1) {
        this.nowMenu.push(val)
      } else {
        if (!this.isIndeterminate2[val.me_id]&& !this.ifThis[val.me_id])
          this.nowMenu.splice(ifId, 1)
      }

      console.log(this.nowMenu);


      let checkedCount = this.nowMenu.length;
      this.ifAll = checkedCount === this.menu.length;
      this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.menu.length;
console.log(this.nowMenu);
      console.log(this.menu);
    },
    // 二级group
    groupCheck (val) {
      console.log(val);
      // if(!this.res[val.me_id])
      //   return
      // 子判断
      let checkedCount = this.nowRes[val.me_id].length;
      console.log(checkedCount);
      console.log(this.res[val.me_id]);
      console.log(this.nowRes[val.me_id]);
      console.log(this.ifThis[val.me_id]);
      this.ifThis[val.me_id] = checkedCount === this.res[val.me_id].length;
      
      console.log(this.ifThis[val.me_id]);

      this.isIndeterminate2[val.me_id] = checkedCount > 0 && checkedCount < this.res[val.me_id].length;
      console.log(this.isIndeterminate2[val.me_id]);

      // 父级判断
      let ifId = this.nowMenu.findIndex(item => item == val)
      if (ifId == -1) {
        if (this.ifThis[val.me_id] || this.isIndeterminate2[val.me_id])
          this.nowMenu.push(val)
      }
      else {
        if (!this.ifThis[val.me_id] && !this.isIndeterminate2[val.me_id])
          this.nowMenu.splice(ifId, 1)
      }
      this.isIndeterminate1 = this.nowMenu.length > 0 && this.nowMenu.length < this.menu.length;
      
    },
    resetFalse (val) {
      Object.keys(val).forEach((key) => {
        val[key] = false
      })
      // Object.keys(val).forEach((key) => {
      //   val[key] = false
      // })
    },
    resetTrue (val) {
      Object.keys(val).forEach((key) => {
        val[key] = true
      })
      // Object.keys(val).forEach((key) => {
      //   val[key] = true
      // })
    },
    resetArr (val) {
      Object.keys(val).forEach((key) => {
        val[key] = []
      })
          }
  },
  computed: {
  },
  mounted () {
    menuPage().then(res => {
      this.menu = res.data.list
      console.log(this.menu);
    })
    resource().then(res => {
      this.res = JSON.parse(JSON.stringify(res.data))
      
      this.ifThis = JSON.parse(JSON.stringify(res.data))
      this.resetFalse(this.ifThis)
      this.isIndeterminate2 = JSON.parse(JSON.stringify(res.data))
      this.resetFalse(this.isIndeterminate2)
      this.nowRes = JSON.parse(JSON.stringify(res.data))
      this.resetArr(this.nowRes)
      console.log(this.ifThis);
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