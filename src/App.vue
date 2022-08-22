<template>
  <router-view></router-view>
</template>

<script>
// import LoginName from './views/login/login-name'

// 按需引用
// import { ElButton } from 'element-plus'
// import 'element-plus/theme-chalk/index.css'
// import 'element-plus/theme-chalk/el-button.css'

// import Axios from "./service/axios_config";
// import cRequest from "./service/index.js"

export default  {
  name: 'App',
  data(){
    return{
      // routername:this.$route
    }
  },
  created(){
  //  this.init();
  },
  components: {
  },
   methods:{
      init(){
        //cRequest.isShowloading=false;
      //  cRequest.getRequest('/1/classes/ademo').then((res)=>{console.log(res)});
     
      //  console.log(result);
        //  cRequest.getRequest('/1/classes/_User',null,{
        //   Interceptors:{
        //     requestInterceptor:(config)=>{
        //       console.log("你好");
        //       return config;
        //     }
        //   }
        //  });
        // Axios.get('/1/classes/_User',null).then(function(res){
        //   console.log(res);
        // })
      }
   }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
