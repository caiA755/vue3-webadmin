<template>
  <div id="login">
     <el-form ref="ruleFormRef" :model="account"  status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="用户名"  prop="username">
        <template v-slot:label>
           <el-icon style="padding-top:10px;" size="20px"><User /></el-icon>
        </template> 
       <el-input size="large" v-model="account.username"   placeholder="请输入用户名" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
           <template v-slot:label>
           <el-icon style="padding-top:10px;" size="24px"><Key /></el-icon>
        </template>
      <el-input  size="large" v-model="account.password" type="password" placeholder="请输入密码" autocomplete="off" />
    </el-form-item>
     <el-form-item>
              <el-checkbox v-model="account.isRemberPwd"  label="记住密码" size="large" />
              <el-link style="margin-left:210px"  type="primary">忘记密码？</el-link>
    </el-form-item>
    <el-form-item>
      <el-button style="width:100%;font-size:16px;font-weight:bold" size="large" type="primary" @click="submitForm(ruleFormRef)">登录</el-button >
    </el-form-item>
  </el-form>

  </div>
</template>

<script>
import cRequest1 from '@/service/index.js';
import localCache from '../../../utils/cache.js'
import mainurl from '@/service/url/mainurl'
import {toRaw} from 'vue'
import router from '@/router/index.js';
import {ElLoading} from 'element-plus'
// import { el } from 'element-plus/es/locale';
// import {useStore} from 'vuex'

export default {
    data(){ 
      let checkLen=(rule,value,callback)=>{
        if(value.length<6||value.length>14){
          return callback(new Error('长度须在6-14之间'));
        }else{
          callback();
        }
      }
     return {
            account:{
                username:localCache.getCache('username')??'',
                password:localCache.getCache('password')??'',
                isRemberPwd:true
             },
            rules:{
              // 需要和v-model里面的字段名一致
              username:[
                  {
                    pattern: /^[\x7f-\xffA-Za-z0-9_]+$/,
                    message: "不允许中文",
                    trigger: "blur",
                    
                  },
                 {
                  required: true,
                  message: '用户名不能为空',
                  trigger: 'blur'
                 },
                 {
                    validator: checkLen,
                    trigger: 'blur' 
                 }
              ],
              password:[
                {
                 required: true,
                 message: '密码不能为空',
                 trigger: 'blur'
                },
                 {
                    validator: checkLen,
                    trigger: 'blur' 
                 }
              ]
            }
    }
    },
   methods:{
      submitForm(){
        // console.log(this.$refs);
         this.$refs.ruleFormRef.validate(async valid => {
           if (valid) {
            //账号是否存储
            if(this.account.isRemberPwd){
                  localCache.setCache("username",this.account.username);
                  localCache.setCache("password",this.account.password);
            }else{
                  localCache.deleteCache("username");
                  localCache.deleteCache("password");
            }
            //用户登录  Bmob上面的数据 无token （用userid暂替 localstorage添加字段设置过期时间）
            let flag;
            await  cRequest1.getRequest(mainurl.userurl,`{"username":"${this.account.username}","password":"${this.account.password}"}&groupcount=true&sum=username`).then((res)=>{
              flag=res;
            });
            console.log(flag.results.length);
            if(flag.results.length){
            //  isShowLoading=false;
            //设置token
             let params = {name: 'token', value: this.account.username};
             var datas = Object.assign(params, { startTime: new Date().getTime() });
             localCache.setCache("token", JSON.stringify(datas));
             //登录之后请求用户信息 (根据username 把username存储到localstorage) 
             let userinfo;
             await cRequest1.getRequest(mainurl.userurl,`{"username":"${this.account.username}"}&keys=username,status,objectId,email,mobile)`).then((res)=>{
                userinfo=res;
             })
             localCache.setCache("userinfo",userinfo);
  
            //  console.log();
             let objectId=toRaw(localCache.getCache("userinfo")).results[0].objectId
             //查询roleid 根据username(唯一约束)
             let roleid;
             await cRequest1.getRequest(mainurl.userroleUrl,`{"user_id":"${objectId}"}&include=role_id`).then((res)=>{
                 roleid=res.results[0].role_id.objectId;
             })
             console.log(roleid);
             //查询菜单 查询roleid 根据roleid显示不同的菜单
             let menu_array=[];
             let result;
             await cRequest1.getRequest(mainurl.rolemenuUrl,`{"role_id":"${roleid}"}&include=menu_id`).then((res)=>{    
                 result=res.results;
             })
              result.sort((a, b) => Number(a.menu_id.order_num) - Number(b.menu_id.order_num));
              //将菜单信息进行处理
              // console.log("paii",result);
              result.forEach((element) => {
                    if(element.menu_id.type===1||element.menu_id.type===3){
                      menu_array.push(element.menu_id);
                    }
               });
         
              for(let i=0;i<menu_array.length;i++){
                   await cRequest1.getRequest(mainurl.menuUrl,`{"parent_id":"${menu_array[i].objectId}","type":2}`).then((res)=>{
                         menu_array[i].children=res.results;
                   })
              }
              localCache.setCache("menuinfo",menu_array);
              // console.log(menu_array);
              ElMessage({
                  message: '登录成功',
                  type: 'success',
                  duration:1000
               });
              //跳到首页
               
               setTimeout(()=>this.$router.push({path:'/main/system/technology'}),1000);
            }else{
              ElMessage({
                  message: '登录失败, 账号或密码错误！',
                  type: 'error',
                  duration:1000
               });
            }
          } else {
            console.log('error submit!!');
            return false;
          }

        });
      }
   },
   setup(){
     
   }
}
</script>

<style>
  #login{
    margin-top: 40px;
    margin-left: -100px;
  }
</style>