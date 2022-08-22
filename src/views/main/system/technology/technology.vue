<template>
  <div class="technology">
    <el-row>
    <el-col :span="24">
      <div class="grid-content ep-bg-purple-dark" >
            <el-descriptions title="前端技术">
         <el-descriptions-item label="框架" width="300px">Vue</el-descriptions-item>
        <el-descriptions-item label="技术" width="600px">Vue3+Js+Element+Axios+VueRouter+ECharts</el-descriptions-item>
        <el-descriptions-item label="时间">
          <el-tag size="small">2022-8-20</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      </div>
       <el-divider />
        <div class="grid-content ep-bg-purple-dark">
            <el-descriptions title="后端" column="3">
              <el-descriptions-item label="数据" width="300px">Bmob云数据库</el-descriptions-item>
              <el-descriptions-item label="描述" width="600px">通过axios请求Restfule Api</el-descriptions-item>
              <el-descriptions-item label="时间" >
                <el-tag size="small">2022-8-20</el-tag>
              </el-descriptions-item>
            </el-descriptions>
        </div>
    </el-col>
  </el-row>
  </div>
</template>

<script>

export default {
  name: 'technology',
  setup() {
    return {}
  }
};
</script>

<style>
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
  padding: 20px;
}
</style>
