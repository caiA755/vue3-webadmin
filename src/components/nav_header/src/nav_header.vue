<template>
  <div id="navheader">
    <div class="content">
         <div>
            <breadcrumb :breadcrumbs="breadcrumbs"/>
         </div>
         <div class="usercenter">
          <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar size="small" src="https://scpic.chinaz.net/files/pic/pic9/202207/apic42307.jpg"></el-avatar>
            <span>&nbsp;&nbsp;{{username}}</span>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="dialogVisible=true">退出登录</el-dropdown-item> 
              <el-dropdown-item divided>用户信息</el-dropdown-item>
              <el-dropdown-item>系统管理</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
           <el-dialog  v-model="dialogVisible"
                        title="提示"
                        width="30%"
                        :before-close="handleClose"
                      >
                      <template #header>
                         <span style="margin-left:-390px;font-weight:bold">提示</span>
                      </template>
                      <span style="font-size:20px">确认退出吗？</span>
                      <template #footer>
                        <span class="dialog-footer">
                          <el-button @click="dialogVisible = false">取消</el-button>
                          <el-button type="primary" @click="outLog()">确认</el-button>
                        </span>
              </template>
            </el-dialog>
       </div>
     </div>
  </div>
</template>

<script>
import localCache from '@/utils/cache.js'
import pathMapBreadcrumbs from '@/utils/map_bread.js'
import breadcrumb from '@/base-ui/src/breadcrumbv.vue'
import localeCache from '@/utils/cache'
import { toRaw } from '@vue/reactivity'
import mapMenusToRouter from '@/utils/map_menus.js'
import { computed } from '@vue/runtime-core'
import router from "@/router/index"; 

export default {
   data(){
      return {
         username:localCache.getCache("username"),
         breadcrumbs:[],
         dialogVisible:false
      }
   },
   created(){
       this.getBreadPath();
   },
   components:{
     breadcrumb
   },
   methods:{
     getBreadPath(){
            this.breadcrumbs=computed(()=>{
                  //获取路径信息
                     let menus = Array.from(toRaw(localeCache.getCache("menuinfo")));
                     const currentPath=this.$route.path;
                    return pathMapBreadcrumbs(menus,currentPath)
            }); 

     },
     outLog(){
         this.dialogVisible = false
         localeCache.deleteCache("userinfo");
         localeCache.deleteCache("menuinfo");
         this.$router.push("/");
     }
}
}
</script>

<style>
  #navheader{
   display: flex;
   width: 100%;
 
  }
  .content{
    display: flex;
    cursor: pointer;
    font-size: 14px;
     margin-top: 20px;
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }
  .el-dropdown-link{
    display: flex;
    align-items: center;
  }
</style>