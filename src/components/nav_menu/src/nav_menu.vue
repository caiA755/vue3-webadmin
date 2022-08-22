<template>
  <div id="nav_menu">
    <div class="logo">
     <img src="@/assets/logo.png"  width="20" height="20" alt="logo"/>
     <span v-if="isShow">后台管理系统</span>
     <el-icon @click="select()"><Fold/></el-icon>
    </div>
     <div class="menu">
         <el-menu :default-openeds="[0]"
        :default-active="defaultvalue"
        :collapse="iscollapse"
        class="el-menu-vertical-demo"
      >
        <template v-for="item in userMenus" :key="item.objectId">
             <template v-if="item.type==1">
                <el-sub-menu index="{{item.objectId}}">
                   <template #title>
                       <el-icon><Menu /></el-icon>
                        <span>{{item.name}}</span>
                    </template>
                    <template v-for="subitem in item.children" :key="subitem.objectId">
                   <el-menu-item  @click="menuItemClick(subitem)" v-bind:index="subitem.objectId">
                        <el-icon><Reading /></el-icon>
                        <span>{{subitem.name}}</span>
                    </el-menu-item> 
                  </template>
                </el-sub-menu>
             </template>
               <template v-else-if="item.type===3">
                <el-menu-item @click="menuItemClick(item)" v-bind:index="item.objectId">
                    <el-icon><Menu /></el-icon>
                    <span>{{item.name}}</span>
                </el-menu-item> 
               </template>
        </template>
      </el-menu>
     </div>
  </div>
</template>

<script>
// import NavMenu from '@/components/nav_menu'
import localCache from '@/utils/cache'
import { Flag } from '@element-plus/icons-vue'
import { getCurrentInstance } from "vue";
import  mapMenusToRouter from '@/utils/map_menus.js'
import  pathMapToMenu from '@/utils/path_menus.js'
import router from '@/router';
import { toRaw } from '@vue/reactivity'
import {RouteRecordRaw} from 'vue-router'

export default {
  props: {
      width: String
      
  },
  data(){
    return {
      iscollapse:false,
      userMenus:localCache.getCache("menuinfo"),
      isShow:true,
      defaultvalue:'v5DBVVVJ'
    }
  },
   created(){
         let menus=Array.from(toRaw(this.userMenus));
         let routes=mapMenusToRouter(menus);
         for(var i=0; i<routes.length; i++) {
          router.options.routes.push(routes[i]);
          router.addRoute('main', routes[i]);
         console.log(router);
         const currentPath=this.$route.path;
        //  console.log("当前的菜单",menus)
         const currentMenu=pathMapToMenu(menus,currentPath);
        //  console.log(currentMenu);
         if(typeof currentMenu==="undefined"){
            return null;
         }else{
              this.defaultvalue=currentMenu.objectId;
         }
   }
   }, 
   methods:{
       menuItemClick(item){
         console.log(item.url);
          this.$router.push({path:`${item.url}`});  
      }
   },
   emits: ["success"],
   setup(props,{emit}) {
    let instance=getCurrentInstance();
    const select= () => { 
            if(instance.data.iscollapse){
                emit('success', '270px') 
                instance.data.iscollapse=false; 
                instance.data.isShow=true;
            }else{
                 emit('success', '100px') 
                 instance.data.iscollapse=true;
                 instance.data.isShow=false;
            }
    };
    return {
      select
    }
  },
}
</script>

<style>
 #nav_menu{
    width: 100%;
    
 }
.logo{
    /* border:1px solid red; */
    height: 60px;
    line-height: 60px;
    color: white;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 1px;
}
</style>