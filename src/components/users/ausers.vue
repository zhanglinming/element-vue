<template>
  <el-card class="box-card">
    <!--1.面包屑：/首页/用户管理/用户列表-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--2.搜索-->
    <el-row class="searchRow">
      <el-col>
        <el-input
        placeholder="请输入内容"
        v-model="aquery"
        class="inputSearch">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button class="add-btn" type="success">添加用户</el-button>
      </el-col>
    </el-row>
    <!--3.表格-->
    <!-- type="index":该列的每个单元格内容从1开始的序号 -->
    <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
          type="index"
            label="#"
            width="60">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="80">
          </el-table-column>
          <el-table-column
            prop="address"
            label="邮箱">
          </el-table-column>
          <el-table-column
            prop="address"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="address"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="address"
            label="用户状态">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
          </el-table-column>
        </el-table>
  </el-card>
</template>

<script>
  export default{
    data(){
      return{
        aquery:'',
        //表格绑定数据
        tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                  }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                  }]
      }
    }
  }
</script>

<style>
  .box-card{
    height: 100%;
  }
  .inputSearch{
    width: 300px;
  }
  .searchRow{
    margin-top: 20px;
  }
  .add-btn{

  }
</style>
