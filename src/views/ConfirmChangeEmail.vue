<template>
    <!--用户发送重置密码邮件的view -->    
    <div role="form for sent reset password email " class="confirmChangeEmail">
        <el-form :model="confirmChangeEmail" status-icon :rules="rules" ref="emailForm" label-width="100px">
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="confirmChangeEmail.email" type="email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('emailForm')">确认</el-button>
                <el-button @click="resetForm('emailForm')">重置</el-button>
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
                callback();
            })
            .catch(error=>{
                callback(new Error('邮箱已占用!'));
            })
        };
        return{
            confirmChangeEmail:{
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
                    var token=this.$route.query.token
                    params.append('newemail',this.confirmChangeEmail.email);
                    params.append('token',token)
                    this.$http.post('/account/change-email',
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
.confirmChangeEmail{
    height: 200px;
    width: 350px;
    position: absolute;
    left: 15%;
    top:25%
}
</style>
