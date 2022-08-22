<template>
  <div id="main">
    <el-container>
      <el-aside :style="asidestyle" v-model:width="width">
          <nav_menu v-bind:width = "width" @success="success"/>
      </el-aside>
      <el-container>
        <el-header>
           <nav-header/>
        </el-header>
        <el-main>
          <div class="postcontent">
          <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
 
<script>
import Nav_menu from '@/components/nav_menu/index.js'
import NavHeader from '@/components/nav_header/index.js'
import { getCurrentInstance } from "vue";
// import {localCache} from '@/util/cache.js'

export default {
  data(){
    return {
      width:"270px",
      asidestyle:""
    }
  },
  components:{Nav_menu,NavHeader},
  methods:{
    init(){
      
    }
  },
  setup(){
    const datab = getCurrentInstance();
    const success = (data) => {
      console.log(data);
      datab.data.asidestyle="transition:all .6s ease-out;width:"+datab.data.width+"px";
      datab.data.width=data;
   }
   return {success}
  }
}
</script>

<style>
 #main{
  width: 100%;
  height: 100%;
  
 }
 .el-container{
   width: 100%;
  height: 100%;
 }
.el-aside{
    background:  #95d475;
}
.el-header{
  box-shadow: 0px 0px 10px 0px lightgray;
}
.el-main{
  background: rgb(249, 249, 249);
}
</style>