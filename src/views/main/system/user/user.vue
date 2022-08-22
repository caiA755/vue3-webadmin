<template>
  <div class="user">
    <!-- <h2>user</h2> -->
   <div class="search">
       <caiform :formItems="formItems" v-model="formData">
          <template #search>
            <el-button  type="primary" :icon="el-icon-refresh">重置</el-button>
            <el-button type="primary" :icon="Search">查询</el-button>
          </template>
        </caiform>
   </div>
   <div class="maincontent">
   <!-- <div>{{tableData}}</div> -->
     <mytable :tableData="tableData" :columns="columns"   :pageParams="pageParams"  :@handleSizeChange="handleSizeChange" :@handleCurrentChange="handleCurrentChange">
        <template  #objectId>
                  <!-- <span>{{scope}}</span> -->
            <el-button type="success" plain>编辑</el-button>
            <el-button type="success" @click="deldialogVisible = true">删除</el-button>
        </template>
          <!-- <template #createdAt="scope">
           <strong> {{scope.row.createdAt}}</strong>
        </template> -->
     </mytable>
          <el-dialog
          v-model="deldialogVisible"
          title="提示"
          width="30%"
            :before-close="handleClose"
          >
               <template #header>
                   <span style="margin-left:-390px;font-weight:bold">提示</span>
               </template>
               <span style="font-size:20px">确认删除吗？</span>      
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="deldialogVisible = false">取消</el-button>
                  <el-button type="danger" @click="deldialogVisible = false"
                    >确认</el-button
                  >
                </span>
              </template>
   </el-dialog>
   </div>
  </div>
</template>

<script>
import caiform from '@/base-ui/index'
import mytable from '@/components/my_table/index'
import cRequest1 from '@/service/index'
import {ref} from 'vue'
import mainurl from '@/service/url/mainurl'
import maincss from '@/assets/css/index.css'

export default {
  name: 'user',
  data(){
     let tableData;
    let columns=[
     {
       prop:"objectId",
       name:"objectId"
     },
     {
       prop:"user_id",
       name:"用户名",
      children:"username"
     },
     {
       prop:"user_id",
       name:"电话号码",
       children:"mobile",
       slotname:"mobile"
     },
     {
       prop:"user_id",
       name:"邮箱",
       children:"email",
     },
     {
       prop:"role_id",
       name:"角色",
       children:"name",
     },
     {
       prop:"createdAt",
       name:"创建时间",
       slotname:"createdAt",
       minWidth:300
     },
     {
       prop:"updatedAt",
       name:"更新时间",
       slotname:"updatedAt",
       minWidth:300
     }
     ,
     {
       prop:"objectId",
       name:"操作",
       slotname:"objectId",
       minWidth:300
     }
    ];
    let pageParams={
          page:1,
          limit:5,
          total:7
    }
    return {tableData,columns,pageParams,deldialogVisible:false}
  },
  created(){
        let _this=this;
        cRequest1.getRequest(mainurl.userroleUrl+"?include=user_id,role_id",null).then((res)=>{
             _this.tableData=res.results;

       });
  },
  methods:{
  },
  components:{
    caiform,
    mytable
  },
  methods: {
    	//页码变化
			handleCurrentChange(e) {
				 this.pageParams.page=e;
         console.log("update:handleCurrentChange",this.pageParams.page);
			},
			//条数变化
			handleSizeChange(e) {
    		this.pageParams.limit = e;
         console.log("update:handleSizeChange",this.pageParams.limit);
			}
  },
  setup() {
    const formItems=[
      {
        field:"name",
        label:"用户名",
        placeholder:"请输入用户名",
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
          id:1,
          name:"cai"
     })
    return {formItems,formData}
  }
}
</script>


<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
