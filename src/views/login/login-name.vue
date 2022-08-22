<template>
   <div id="mylogin">
     <LoginPlane/>
   </div>
</template>
<style>
   #mylogin{
    overflow: hidden;
    background-image: url('@/assets/img/bg_login.jpg');
    background-repeat:round;
    margin-top:0px;
    height: 100%;
   }
</style>
<script>
import LoginPlane from './cpns/login-panel'

export default {
    components:{
      LoginPlane
    }
}
</script>