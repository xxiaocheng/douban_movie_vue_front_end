<template>
    <!--用户发送重置密码邮件的view -->    
    <div role="form for sent reset password email " class="resetPasswordEmailForm">
        <el-form :model="resetPasswordEmailForm" status-icon :rules="rules" ref="emailForm" label-width="100px">
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="resetPasswordEmailForm.email" type="email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('emailForm')">发送重置链接</el-button>
                <el-button @click="resetForm('emailForm')">清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import { error } from 'util';
export default {
    data(){
        var validateEmail=(rule,value,callback)=>{
            if (!value){
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
                callback(new Error('邮箱不存在!'));
            })
            .catch(error=>{
                callback();
            })
        };
        return{
            resetPasswordEmailForm:{
                email:''
            },
            rules:{
                email:[
                    {validator:validateEmail,trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        resetForm(formName){
            this.$refs[formName].resetFields();
        },
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if (valid){
                    const params=new URLSearchParams();
                    params.append('email',this.resetPasswordEmailForm.email);
                    this.$http.post('/auth/reset-password',
                    params
                    )
                    .then(response=>{
                        this.showSucceedMess(response.data.message);
                    })
                    .catch(error=>{
                        this.showFailedMess(error.response.data.message);
                    })
                }else{
                    console.log('error submit');
                    return false
                }
            });
        },
        showSucceedMess(message) {
            this.$message({
                showClose: true,
                message: message,
                type: 'success'
            });
        },
        showFailedMess(message) {
            this.$message({
                howClose: true,
                message:message,
                type: 'error'
            });
        }
    }
    
}
</script>

<style scoped>
.resetPasswordEmailForm{
    height: 200px;
    width: 350px;
    position: absolute;
    left: 15%;
    top:25%
}
</style>
