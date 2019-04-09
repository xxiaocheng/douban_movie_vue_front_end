<template>
    <div role="login form">
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px">
            <el-form-item label="用户名" prop="username">
                <el-input type="string" v-model="loginForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {callback, error } from "util";

export default {
    data(){
        var validateUsername=(rule,value,callback)=>{
            if (!value){
                return callback(new Error('用户名不能为空'))
            }

            var username_rex = /^[a-zA-Z0-9\_]{6,16}$/
            var rex_ok=username_rex.exec(value)
            if (!rex_ok){
                return callback(new Error('用户名不符合要求'))
            }
            this.$http
            .get('/user/validate',{
                params:{
                    type_name:'username',
                    value:value
                }
            })
            .then(response=>{
                callback(new Error('用户不存在'))
            })
            .catch(error=>{
                callback()                
            })
        };
        var validatePass=(rule,value,callback)=>{
            if (value===''){
                callback(new Error('请输入密码'));
            }
            var password_rex = /^[0-9a-zA-Z\_\.\!\@\#\$\%\^\&\*]{6,20}$/
            var rex_ok=password_rex.exec(value)
            if (!rex_ok){
                return callback(new Error('密码不符合要求'))
            }
            else{
                callback();
            }
        };
        return{
            loginForm:{
                username:'',
                pass:''
            },
            rules:{
                username:[
                    {validator:validateUsername,trigger:'blur'}
                ],
                pass:[
                    {validator:validatePass,trigger:'blur'}
                ]
            }
        };
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if (valid){
                    console.log('OK')
                    this.loginPost(this.loginForm.username,this.loginForm.pass)
                }else{
                    console.log('error submit');
                    return false
                }
            });
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
        },
        loginPost(username,pass){
            const params =new URLSearchParams();
            params.append('grant_type','password');
            params.append('username',username);
            params.append('password',pass);
            this.$http.post('/oauth/token',
                params
            )
            .then(response=>{
                console.log(response.data.access_token);
                this.showSucceedMess(this.loginForm.username);
            })
            .catch(error=>{
                console.log('error');
                this.showFailedMess();
            })

        },
        showSucceedMess(username) {
            this.$message({
                showClose: true,
                message: username+' ，登陆成功!',
                type: 'success'
            });
        },
        showFailedMess() {
            this.$message({
                 howClose: true,
                message: '登陆失败, 请重试!',
                type: 'error'
            });
        } 
    }
}
</script>
