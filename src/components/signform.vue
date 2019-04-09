<template>
    <div role="sign form" >
        <el-form :model="signForm" status-icon :rules="rules" ref="signForm" label-width="100px" class="demo-ruleForm ">
            <el-form-item label="用户名" prop="username">
                <el-input type="string" v-model="signForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model.number="signForm.email" type="email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="signForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="signForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="submitForm('signForm')">提交</el-button>
                <el-button @click="resetForm('signForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { callbackify, error } from 'util';

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
                callback()
            })
            .catch(error=>{
                callback(new Error('用户名已存在'))
            })
        };
        var validateEmail=(rule,value,callback)=>{
            if (value===''){
                callback(new Error('请输入邮箱'));
            }
            var email_rex=/[^@]+@[^@]+\.[^@]+/
            var rex_ok=email_rex.exec(value)
            if (!rex_ok){
                return callback(new Error('邮箱不符合要求'))
            }
            this.$http
            .get('/user/validate',{
                params:{
                    type_name:'email',
                    value:value
                }
            })
            .then(response=>{
                callback()
            })
            .catch(error=>{
                callback(new Error('邮箱已被注册'));
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
                if (this.signForm.checkPass !== '') {
                    this.$refs.signForm.validateField('checkPass');
                } 
                callback();
            }
        };
        var validatePass2=(rule,value,callback)=>{
            if (value===''){
                callback(new Error('请再次输入密码'));
            }
            var password_rex = /^[0-9a-zA-Z\_\.\!\@\#\$\%\^\&\*]{6,20}$/
            var rex_ok=password_rex.exec(value)
            if (!rex_ok){
                return callback(new Error('密码不符合要求'));
            }else if(value!==this.signForm.pass){
                callback(new Error('两次输入密码不一致'));
            }else{
                callback();
            }
        };
        return{
            signForm:{
                username:'',
                email:'',
                pass:'',
                checkPass:''
            },
            rules:{
                username:[
                    {validator:validateUsername,trigger:'blur'}
                ],
                email:[
                    {validator:validateEmail,trigger:'blur'}
                ],
                pass:[
                    {validator:validatePass,trigger:'blur'}
                ],
                checkPass:[
                    {validator:validatePass2,trigger:'blur'}
                ]
            }
        };
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if (valid){
                    this.registerUser(this.signForm.username,this.signForm.email,this.signForm.pass)
                }else{
                    console.log('error submit');
                    return false
                }
            });
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
        },
        registerUser(username,email,password){
            const params = new URLSearchParams();
            params.append('username',username)
            params.append('email',email)
            params.append('password',password)
            this.$http.post('/user',
            params
            )
            .then(response=>{
                console.log('ok');
                this.showSucceedMess(response.data.username);
            })
            .catch(error=>{
                console.log('failed,');
                this.showFailedMess()
            })
        },
        showSucceedMess(username) {
            this.$message({
                showClose: true,
                message: username+' ，注册成功!',
                type: 'success'
            });
       },
       showFailedMess() {
        this.$message({
          showClose: true,
          message: '注册失败, 请重试!',
          type: 'error'
        });
      }
    }
}
</script>

