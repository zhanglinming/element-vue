<template>
  <div class="login-wrap">
    <h2>用户登录</h2>
    <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
      <el-input type="text" placeholder="UserName" v-model="formdata.username"></el-input>
      <el-input type="password" placeholder="PassWord" v-model="formdata.password"></el-input>
      <el-button @click.prevent="handleLogin()" class="login-btn" type="primary">用户登录</el-button>
      <el-button @click.prevent="anonymousLogin()" class="login-btn" type="primary">匿名登录</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        formdata:{
          username:'',
          password:''
        }
      }
    },
    methods:{
      /*异步请求变同步：用户登录*/
      async handleLogin(){
        const res = await this.$http.post('login',this.formdata)
        const{
          data,meta:{msg,status}
        } = res.data
        if(status === 200){
          /*登录成功*/
          /*保存token*/
          localStorage.setItem('token',data.token)
          /*保存token：如果用户没登录，通过url直接来home组件，在登录成功时保存正确用户的token*/
          this.$router.push({name:'home'})
          this.$message.success(msg);
        }else{
          this.$message.warning(msg);
        }
        /*发送登录请求：用户登录*/
        // this.$http.post('login',this.formdata).then(res => {
        // console.log(res)
        //   const{
        //     data,meta:{msg,status}
        //   } = res.data
        //   if(status === 200){
        //     this.$router.push({name:'home'})
        //     this.$message.success(msg);
        //   }else{
        //     this.$message.warning(msg);
        //   }
        // })
      },
      /*匿名登录*/
      anonymousLogin(){
        this.$message.success("登录成功！");
        this.$router.push({name:'home'})
      }
    }
  }
</script>

<style>
  .login-wrap{
    width: 300px;
    padding: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #191919;
    text-align: center;
  }
  .login-wrap h2{
    color: white;
    text-transform: uppercase;
    font-weight: 500;
  }
  .login-wrap .login-form input[type="text"],
  .login-wrap .login-form input[type="password"]
  {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #3498db;
    padding: 14px 10px;
    width: 200px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
  }
  .login-wrap .login-form input[type="text"]:focus,
  .login-wrap .login-form input[type="password"]:focus{
    width: 280px;
    border-color: #2ecc71;
  }
  .login-wrap .login-btn{
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #2ecc71;
    padding: 14px 40px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
    cursor: pointer;
  }
  .login-btn:hover{
    background: #2ecc71;
  }
</style>
