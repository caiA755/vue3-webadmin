<template>
   <div id="register">
       <el-form ref="ruleFormRef.account" :model="account"  status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
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
        <el-form-item label="确认密码" prop="confirm_pwd">
           <template v-slot:label>
           <el-icon style="padding-top:10px;" size="24px"><CircleCheck /></el-icon>
        </template>
      <el-input  size="large" v-model="account.confirm_pwd" type="password" placeholder="请再次输入密码" autocomplete="off" />
    </el-form-item>
     <!-- <el-form-item>
             <el-checkbox v-model="account.isRemberPwd"  label="记住密码" size="large" />
              <el-link style="margin-left:210px"  type="primary">忘记密码？</el-link>
    </el-form-item> -->
    <el-form-item>
      <el-button style="width:100%;font-size:16px;font-weight:bold" size="large" type="primary" @click="submitForm(ruleFormRef)">注册</el-button >
    </el-form-item>
   
  </el-form>
   </div>
</template>

<script>
export default {
data(){
      let checkLen=(rule,value,callback)=>{
        if(value.length<6||value.length>14){
          return callback(new Error('长度须在6-14之间'));
        }
       };
       let checkConfirmPwd=(rule,value,callback)=>{
          if(value!=this.account.password){
              return callback(new Error('两次密码输入不一致'));
          }
       }
        return {
            account:{
                username:"",
                password:"",
                confirm_pwd:"",
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
              ],
              confirm_pwd:[
                {
                 required: true,
                 message: '请再次输入密码',
                 trigger: 'blur'
              },
              {
                    validator: checkConfirmPwd,
                    trigger: 'blur' 
              }
              ]
            }
        }
    }
}
</script>

<style scoped>
   #register{
    margin-top: 40px;
    margin-left: -100px;
  }
</style>