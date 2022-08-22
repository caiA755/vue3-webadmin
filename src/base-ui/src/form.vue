<template>
  <div class="cai-form">
     <el-form label-width="100px">
        <el-row :gutter="20">
            <template v-for="item in formItems" :key="item.label">
                <el-col  :span="6" :xl="6" :lg="8" :md="12" :sm="24" :xs="24">
                    <el-form-item :label="item.label">
                        <template v-if="item.type=='input'">
                           <!-- <el-input :placeholder="item.placeholder"/> -->
                           <el-input v-model="formData[`${item.field}`]" :placeholder="item.placeholder"/>
                        </template>
                        <template v-else-if="item.type=='select'">
                           <el-select  v-model="formData[`${item.field}`]" :placeholder="item.placeholder">
                              <el-option v-for="opt in item.options" :value="opt.value" :key="opt.value">
                                    {{opt.title}}
                              </el-option>
                           </el-select>
                        </template>
                        <template v-else-if="item.type=='datepicker'">
                                <el-date-picker  
                                type="datetimerange"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                v-model="formData[`${item.field}`]"
                                />
                         </template>
                    </el-form-item>

                </el-col>
            </template>
            <el-col  :span="6" :xl="6" :lg="8" :md="12" :sm="24" :xs="24" :pull="2">  
              <slot name="search"></slot>
            </el-col>
        </el-row>
     </el-form>
  </div>
</template>

<script>
import {reactive,ref,watch,toRaw,toRefs} from 'vue'
export default {
  props:{
      formItems:{
        type:Array,
        default:()=>{
           //数据和对象类型 写默认值要用箭头函数
      }},
      modelValue:{
        type:Object,
        require:true
      }
  },
  data(){
        return{
          formData:{
            name:"ss"
          }
        }
  },
  emits:["update:modelValue"],
  setup(props,{emit}){
         const formData=ref({...props.modelValue})
          watch(formData,(newValue)=>{
               emit('update:modelValue',newValue);
          },{
              deep:true
          });
          return {
            formData:formData
          }
    },
}
    
</script>
    // colLayout:{
    //     type:Object,
    //     default:()=>({
    //         xl: 6,  //1920px 4个
    //         lg: {span: 8, offset: 0},
    //         md:{span: 12, offset: 0},
    //         sm:{span: 24, offset: 0},
    //         xs:{span: 24, offset: 0},
    //     })
    // },
    // formStyle:{
    //     type:String,
    //     default:()=>({
    //         padding:'10px'
    //     })
    // }
  // },


<style>

</style>