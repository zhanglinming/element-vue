<!--1.解构赋值，给this.userlist = res.data.data.users-->
<!--2.prop=""-->
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
        v-model="query"
        class="inputSearch">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button class="add-btn" type="success">添加用户</el-button>
      </el-col>
    </el-row>
    <!--3.表格-->
    <!-- type="index":该列的每个单元格内容从1开始的序号 -->
    <el-table
          :data="userlist"
          style="width: 100%">
          <el-table-column
          type="index"
            label="#"
            width="60">
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="80">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="电话">
          </el-table-column>

          <el-table-column
            label="创建时间">
            <!--如果单元格内显示的内容不是字符串(文本),需要给被显示的内容外层包裹一个template-->
            <!--template内部要用数据，需要设置slot-scope属性，该属性的值是要用数据的数据源userlist-->
            <!--slot-scope的值userlist其实就是el-table绑定的数据userlist，userlist.row->数组中的每个对象-->
            <!--不同组件的数据不是共享的，而是独立作用域-->

            <!-- <template slot-scope="userlist">
            {{userlist.row.create_time | fmtdate}}
            </template> -->

            <template slot-scope="scope">
            {{scope.row.create_time | fmtdate}}
            </template>
          </el-table-column>

          <el-table-column label="用户状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
              <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
              <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
  </el-card>
</template>

<script>
  export default{
    data(){
      return{
        query:'',
        //表格绑定数据
        userlist:[],
        //分页相关数据
        total:-1,
        pagenum:1,
        pagesize:2
      }
    },
    created(){
      // 调用方法
      this.getUserList()
    },
    methods:{
      //获取用户列表的请求（发送请求）
      async getUserList(){
        // 接口文档中，除了登录之外所有的请求都有进行授权->设置请求头，找axios中关于请求头的设置代码
        // 设置请求头代码：
        // const AUTH_TOKEN = localStorage.getItem('token')
        // this.$http.default.headers.common['Authorization'] = AUTH_TOKEN

        // query 查询参数 可以为空 空字符串=查询所有用户
        // pagenum 当前页码 不能为空 1
        // pagesize 每页显示条数 不能为空 2

        // 需要授权的api，必须在请求头中使用Authorization字段提供token令牌
        const AUTH_TOKEN = localStorage.getItem('token')
        // 设置请求头
        this.$http.default.headers.common['Authorization'] = AUTH_TOKEN
        const res = await this.$http.get(
        'users?query=${this.query}$pagenum=${this.pagenum}$pagesize=${this.pagesize}')

        console.log(res)
        const {
          meta:{status,msg},
          data:{users,total},
        } = res.data
        if(status === 200){
          // 给表格数据赋值
          this.userlist = users
          // 给total赋值
          this.total = total
          // 提示
          this.$message.success(msg)
        }else{
          this.$message.warning(msg)
        }
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
