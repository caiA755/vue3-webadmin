<template>
  <div class="goodspanel">
    <!-- <h2>goodspanel</h2> -->
     <el-row gutter="5">
      <el-col :span="7">
        <div class="grid-content ep-bg-purple"  >
            <div id="echart_userOrigin">
            </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content ep-bg-purple" >
            <div id="echart_orderCity">
            </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content ep-bg-purple-light" >
          <div id="echart_categoryCount">
            </div>
        </div>
        </el-col>
  </el-row>
    <el-row gutter="5">
      <el-col :span="12">
        <div class="grid-content ep-bg-purple"  >
            <div id="echart_orderCount">
            </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content ep-bg-purple" >
            <div id="echart_categoryCollect">
            </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 按需引入
import * as echarts from 'echarts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import china from '@/assets/json/china';
import { registerMap } from 'echarts/core';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);


export default({
  name: 'goodspanel',
  data(){
      let userOriginData = {
              title: {
                text: '用户访问来源',
                subtext: '虚构数据',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [
                {
                  name: 'Access From',
                  type: 'pie',
                  radius: '50%',
                  data: [
                    { value: 1048, name: '搜索引擎' },
                    { value: 735, name: '直接访问' },
                    { value: 580, name: '邮件营销' },
                    { value: 484, name: '联盟广告' },
                    { value: 300, name: '视频广告' }
                  ],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
      };
      let orderCityData= {
      title: {
        text: '',
        subtext: '不同城市商品销量',
        sublink:
          'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>{c}'
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      visualMap: {
        min: 800,
        max: 50000,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered']
        }
      },
      series: [
        {
          name: '',
          type: 'map',
          map: 'china',
          label: {
            show: false
          },
          data: [
            { name: '湖南省', value: 7990 },
             { name: '广东省', value: 8880 },
             { name: '山西省', value: 8880 }
          ],
          // 自定义名称映射
          // nameMap: {
          //   "湖南省"
          // }
        }
      ]
     };
      let categoryCountData= {
      title: {
    text: '',
    subtext: '分类商品数量',
    left: 'left'
  },
  legend: {
    top: 'bottom'
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [10, 110],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: [
        { value: 40, name: '牛奶区' },
        { value: 38, name: '水果区' },
        { value: 32, name: '辣条区' },
        { value: 30, name: '运动区1' },
        { value: 28, name: '运动区2' },
        { value: 26, name: '运动区3' },
        { value: 22, name: '运动区4' },
        { value: 18, name: '运动区5' }
      ]
    }
  ]
      };
     let orderCountData= {
         title: {
        text: '',
        subtext: '分类商品销量',
        },
        xAxis: {
          type: 'category',
          data: ['牛奶区', '水果区', '辣条区', '运动区', '运动区', '运动区', '运动区']
        },
        yAxis: {
          type: 'value'
        },
         toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            // dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      };
      let dataAxis =['牛奶区', '水果区', '辣条区', '运动区', '运动区', '运动区', '运动区']
    // prettier-ignore
      let data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
      let categoryCollectData={
  title: {
    text: '',
    subtext: '分类商品的收藏'
  },
  xAxis: {
    data: dataAxis,
    axisLabel: {
      inside: true,
      color: '#fff'
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    z: 10
  },
  yAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#999'
    }
  },
  dataZoom: [
    {
      type: 'inside'
    }
  ],
  series: [
    {
      type: 'bar',
      showBackground: true,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ])
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' }
          ])
        }
      },
      data: data
    }
  ]
      };;
      return {
        userOriginData,orderCityData,categoryCountData,orderCountData,categoryCollectData,data,dataAxis
      }
  },
  mounted(){
      this.getUserOrigin();
      this.getOrderCity();
      this.getCategoryCount();
      this.getOrderCount();
      this.getCategoryCollect();
  },
  methods:{
        getUserOrigin(){ 
              let echart_userOrigin = echarts.init(document.getElementById('echart_userOrigin'),null,{
                height:"350px"
              });
              echart_userOrigin.setOption(this.userOriginData);
              window.addEventListener("resize", function () {
                 echart_userOrigin.resize();
              });
        },
         getOrderCity(){ 
              let echart_orderCity = echarts.init(document.getElementById('echart_orderCity'),null,{
                height:"350px"
              });
              echarts.registerMap('china', china);
              echart_orderCity.setOption(this.orderCityData);
              window.addEventListener("resize", function () {
                 echart_orderCity.resize();
              });
        },
         getCategoryCount(){ 
              let echart_categoryCount = echarts.init(document.getElementById('echart_categoryCount'),null,{
                height:"350px"
              });
              echart_categoryCount.setOption(this.categoryCountData);
              window.addEventListener("resize", function () {
                 echart_categoryCount.resize();
              });
        },
         getOrderCount(){ 
              let echart_orderCount = echarts.init(document.getElementById('echart_orderCount'),null,{
                height:"390px"
              });
              echart_orderCount.setOption(this.orderCountData);
              window.addEventListener("resize", function () {
                 echart_orderCount.resize();
              });
        },
        getCategoryCollect(){ 
                let echart_categoryCollect = echarts.init(document.getElementById('echart_categoryCollect'),null,{
                  height:"390px"
                });
                let yMax = 500;
                let dataShadow = [];
                let len=this.data.length;
                for (let i = 0; i < len; i++) {
                  dataShadow.push(yMax);
                };
                const zoomSize = 6;
                echart_categoryCollect.on('click', function (params) {
                  console.log(this.dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
                  echart_categoryCollect.dispatchAction({
                    type: 'dataZoom',
                    startValue: this.dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                    endValue: this.dataAxis[Math.min(params.dataIndex + zoomSize / 2, this.data.length - 1)]
                  });
                });
              echart_categoryCollect.setOption(this.categoryCollectData);
              window.addEventListener("resize", function () {
                 echart_categoryCollect.resize();
              });
        }
   }
  ,
  setup() {
    return {}
  }
})
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background: white;
}
.goodspanel{
  padding: 10px;
}
#echart_userOrigin,#echart_orderCity,#echart_categoryCount,#echart_orderCount,#echart_categoryCollect{
   padding: 10px;
}
</style>
