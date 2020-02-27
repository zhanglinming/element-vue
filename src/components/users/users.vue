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
        @clear="loadUserList()"
        clearable
        placeholder="请输入内容"
        v-model="query"
        class="inputSearch">
          <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button class="add-btn" @click="showAddUserDia()" type="success">添加用户</el-button>
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
                @change="changeMgState(scope.row)"
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
              <el-button
              size="mini"
              plain type="primary"
              icon="el-icon-edit"
              circle
              @click="showEditUserDia(scope.row)"></el-button>
              <el-button
              size="mini"
              plain type="danger"
              icon="el-icon-delete"
              circle
              @click="showDeleUserMsgBox(scope.row.id)"></el-button>
              <el-button
              @click="showSetUserRoleDia(scope.row)"
              size="mini"
              plain
              type="success"
              icon="el-icon-check"
              circle></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--4.分页-->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>

        <!--对话框-->
        <!--添加用户的对话框-->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
          <el-form :model="form">
            <el-form-item label="用户名" label-width="100px">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密 码" label-width="100px">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮 箱" label-width="100px">
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电 话" label-width="100px">
              <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
            <el-button type="primary" @click="addUser()">确 定</el-button>
          </div>
        </el-dialog>

        <!--编辑用户的对话框-->
        <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
          <el-form :model="form">
            <el-form-item disabled label="用户名" label-width="100px">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮 箱" label-width="100px">
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电 话" label-width="100px">
              <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="editUser()">确 定</el-button>
          </div>
        </el-dialog>

        <!--分配角色的对话框-->
        <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
          <el-form :model="form">
            <el-form-item label="用户名" label-width="100px">
              {{currRoleId}}
            </el-form-item>
            <el-form-item label="角色" label-width="100px">
              <el-select v-model="currRoleId">
                <el-option
                label="请选择"
                :value="-1">
                </el-option>
                <el-option
                :label="item.roleName"
                :value="item.id"
                v-for="(item,i) in roles"
                :key="i">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
            <el-button type="primary" @click="setRole()">确 定</el-button>
          </div>
        </el-dialog>

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
        pagesize:2,
        //添加对话框的属性
        dialogFormVisibleAdd:false,
        dialogFormVisibleEdit:false,
        dialogFormVisibleRol:false,
        //添加用户的表单数据
        form:{
          username:'',
          password:'',
          email:'',
          mobile:''
        },
        //分配角色
        currRoleId:-1,
        //当前用户id
        currUserId:-1,
        currUsername:'',
        //保存所有的数据
        roles:[]
      }
    },
    created(){
      // 调用方法
      this.getUserList()
    },
    methods:{
      //分配角色-发送请求
      async setRole(){
        //users/:id/role
        //:id要修改的用户id值
        //请求体中rid修改的新值角色id
        const res = await this.$http.put('users/${this.currUserId}/role',{
          rid:this.currRoleId
        })
        console.log(res)
        //关闭对话框
        this.dialogFormVisibleRol = false
      },
      //分配角色
      async showSetUserRoleDia(){
        //打开对话框显示用户名
        this.currUsername = user.username
        //给currUserId赋值
        this.currUserId = user.id

        //获取所有角色
        const res1 = await this.$http.get('roles')
        // console.log(res1)
        this.roles = res1.data.data

        //获取当前用户的角色id->rid
        const res = await this.$http.get('users/${user.id}')
        // console.log(res)
        //接口文档的key名 是role_id 其实是rid
        this.currRoleId = res.data.data.rid
        //打开对话框
        this.dialogFormVisibleRol = true
      },
      //修改状态
      async changeMgState(user){
        //发送请求
        //user/:uId/state/:type
        const res = await this.$http.put('user/${user.id}/state/${user.mg_state}')
        console.log(res)
      },
      async editUser(){
        //users/:id
        const res = await this.$http.put('users/${this.form.id},this.form')
        // console.log(res)
        //1.关闭对话框
        this.dialogFormVisibleEdit = false
        //2.更新视图
        this.getUserList()
      },
      //编辑用户-显示对话框
      showEditUserDia(user){
        console.log(user)
        this.form = user
        //获取用户
        this.dialogFormVisibleEdit = true
      },
      //删除用户-打开消息盒子
      showDeleUserMsgBox(userId){
        this.$confirm('删除用户?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(async () => {
                  //发送删除请求:id---->用户id
                  //1.data中找usersid
                  //2.把usersid以showDeleUserMsgBox参数形式传进来
                  const res = await this.$http.delete('users/${userId}')
                  console.log(res)
                  if(res.data.meta.status === 200){
                    this.pagenum = 1
                    //更新视图
                    this.getUserList()
                    //提示
                    this.$message({
                      type: 'success',
                      message: res.data.meta.msg
                    })
                  }
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });
                });

      },
      //添加用户-发送请求
      async addUser(){
        //2.关闭对话框
        this.dialogFormVisibleAdd = false

        const res = await this.$http.post('users',this.form)
        console.log(res)
        const {meta:{status,msg},data} = res.data
        if(status === 201){
          //1.提示成功
          this.$message.success(msg)
          //3.更新地图
          this.getUserList()
          //4.清空文本框
          this.form = {}
          // for (const key in this.form){
          //   if(this.form.hasOwnProperty(key)){
          //     this.form[key] = ""
          //   }
          // }
        }else{
          this.$message.warning(msg)
        }
      },
      //添加用户-显示对话框
      showAddUserDia(){
        //先点编辑，再点添加-->点击添加按钮清空列表
        this.form = {}
        //点击添加用户按钮显示对话框
        this.dialogFormVisibleAdd = true
      },
      //清空搜索框重新获取数据
      loadUserList(){
        this.getUserList()
      },
      //搜索用户
      searchUser(){
        //按照
        this.getUserList()
      },
      //分页方法
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pagesize = val
        this.getUserList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.pagenum = val
        this.getUserList()
      },

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
          // this.$message.success(msg)
        }else{
          // 提示
          // this.$message.warning(msg)
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
