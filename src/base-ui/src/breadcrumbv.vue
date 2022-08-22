<template>
  <el-breadcrumb separator="/">
  <template v-for="item in breadcrumbs" :key="item.name">
    <el-breadcrumb-item :to="{path: `${item.path}` }">{{item.name}}</el-breadcrumb-item>
  </template>
  </el-breadcrumb>
</template>

<script>
export default {
    props:{
         breadcrumbs:{
            type:Array,
            default:()=>{
            }
         }
    }
}
</script>

<style>

</style>