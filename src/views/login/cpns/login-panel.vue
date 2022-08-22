<template>
  <div id="login-plane">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" >
        <el-tab-pane label="用户登录" name="first">
          <template v-slot:label>
              <span style="font-weight:bold;font-size:14px;color:gray;">用户登录</span>
          </template>
            <LoginCpns/>
        </el-tab-pane>
        <!-- <el-tab-pane label="用户注册" name="second">
          <template v-slot:label>
              <span style="font-weight:bold;font-size:14px;color:gray;">用户注册</span>
          </template>
          <RegisterCpns/>
        </el-tab-pane> -->
  </el-tabs>
  </div>
</template>

<script>
import LoginCpns from './login-cpns.vue'
import RegisterCpns from './register-cpns.vue'

export default {
  data(){
    return {
        activeName:"first"
    }
  },
  components:{
    LoginCpns,
   RegisterCpns
  }   
}
</script>

<style>
#login-plane{
    padding: 15px;
    margin: 0px auto;
    width: 450px;
    background: white;
    height: 460px;
    margin-top: 120px;
    border-radius: 5px;
    box-shadow: 1px 1px 10px 0px gray;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  /* color: #6b778c;
  font-size: 32px;
  font-weight: 600; */
}
/* .el-tabs{
    border: none;
} */
/* .el-tabs__item{
font-size:16px !important; */
/* border: none; */
/* } */
</style>