<template>
  <div class="role">
     <div class="rolesearch search">
       <caiform :formItems="formItems" v-model="formData">
          <template #search>
            <el-button  type="primary" :icon="el-icon-refresh">重置</el-button>
            <el-button type="primary" :icon="Search">查询</el-button>
          </template>
        </caiform>
   </div>
   <div class="maincontent">
   <!-- <div>{{childrenData}}</div> -->
     <mytable :tableData="tableData" :columns="columns"  :childrenData="childrenData" :childrenColumns="childrenColumns" :pageParams="pageParams"  :@handleSizeChange="handleSizeChange" :@handleCurrentChange="handleCurrentChange">
        <template #objectId>
            <el-button type="success" plain>编辑</el-button>
            <el-button type="success">删除</el-button>
        </template>
     </mytable>
   </div>
  </div>
</template>

<script>
import caiform from '@/base-ui/index'
import mytable from '@/components/my_table/index'
import cRequest1 from '@/service/index'
import {ref} from 'vue'
import mainurl from '@/service/url/mainurl'
export default {
  name: 'role',
   components:{
    caiform,
    mytable
  },
   data(){
     let tableData,childrenData;
    let columns=[
     {
       prop:"objectId",
       name:"objectId"
     },
     {
       prop:"role_id",
       name:"角色名",
       children:"name"
     },
      {
       prop:"menu_id",
       name:"权限",
       children:"name"
     },
     {
       prop:"createdAt",
       name:"创建时间",
     },
     {
       prop:"updatedAt",
       name:"更新时间"
     }
     ,
     {
       prop:"objectId",
       name:"操作",
       slotname:"objectId",
       minWidth:300
     }
    ];
     let childrenColumns=[
     {
       prop:"objectId",
       name:"objectId"
     },
     {
       prop:"role_id",
       name:"角色名",
       children:"name",
     },
     {
       prop:"createdAt",
       name:"创建时间",
     },
     {
       prop:"updatedAt",
       name:"更新时间"
     }
     ,
     {
       prop:"objectId",
       name:"操作",
       minWidth:300
     }
    ];
    let pageParams={
          page:1,
          limit:5,
          total:7
    }
    return {tableData,columns,pageParams,childrenColumns,childrenData}
  },
  created(){
        let _this=this;
        // mainurl.rolemenuUrl+"?include=role_id,menu_id"
        // cRequest1.getRequest(mainurl.roleUrl,null).then((res)=>{
        //      _this.tableData=res.results;
        //      console.log(res.results);
        // });
        cRequest1.getRequest( mainurl.rolemenuUrl+"?include=role_id,menu_id",null).then((res)=>{
             _this.tableData=res.results;
       });
  },
  setup() {
    const formItems=[
      {
        field:"name",
        label:"角色名",
        placeholder:"角色名",
        type:"input"
      }  ,
      {
        field:"date",
        label:"创建时间",
        placeholder:"请选择创建时间范围",
        type:"datepicker",
        otherOptions:{
          startPlaceholder:'开始时间',
          endPlaceholder:'结束时间',
          type:"daterange"
        }
       }
    ];
    const formData=ref({
          date:"",
          name:""
     })
    return {formItems,formData}
  }
}
</script>


<style scoped></style>
