<template>
      <el-table :data="tableData"  :default-sort="{ prop: 'createdAt', order: 'descending' }" :columns="columns"  style="width: 100%" >
         <el-table-column type="index" width="50" />
           <el-table-column  v-for="item in columns" sortable  :prop="item.prop" :min-width="item.minWidth?'':50" :label="item.name" :key="item.prop" >
              <template #default="scope" > 
                <slot  :name="item.slotname">
                     <template v-if="item.children!=null&&typeof item.children!='undefined'">
                         {{scope.row[item.prop][item.children]}}
                      </template>
                      <template v-else>
                          {{scope.row[item.prop]}}
                     </template> 
                </slot>
              </template> 
           </el-table-column>
     </el-table>
       <el-pagination 
            class="table-box-pagination" 
            @size-change="handleSizeChange"
            @current-change="pageCurrentChange"
            :current-change="pageParams.page"
            :page-sizes="[ 5, 30, 50, 100 ]"
            :page-size="pageParams.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageParams.total"
           >
        </el-pagination>
         <!-- :current-page="pageParams.page" -->
</template>

<script>
import {ref,watch} from 'vue'
export default {
  name:"myTable",
  props:{
    tableData:{
        type:Array,
        default:()=>{
        }
    },
    childrenData:{
        type:Array,
        default:()=>{
        }
    },
    columns:{
        type:Array,
        default:()=>{
        }
    },
    childrenColumns:{
        type:Array,
        default:()=>{
     }
    },
    pageParams:{
        type: Object,
        default: function () {
          return {
              page:1,
              limit:20,
              total:0
          }
        }
      }
  },
  methods:{
     // 条数变化
			handleSizeChange(e) {
        console.log("条数变化",e);
				this.$emit('handleSizeChange', e);
			},
			// 页码变化
			handleCurrentChange(e) {
				this.$emit('handleCurrentChange', e);
			}
  },
}
</script>

<style>

</style>