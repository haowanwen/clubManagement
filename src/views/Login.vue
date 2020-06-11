<template>
    <!-- 登录界面 -->
    <div class="login">
        <div id="Layer1" style="position:absolute; width:100%; height:100%; z-index:-1">
            <img src="../assets/loginBackground.jpg" height="90%" width="90%" />
        </div>
        <!-- 登录模块 -->
        <div v-show="show" style="position: absolute;top: 15%;left: 35%;">
            <el-card class="box-card" v-if="showLogin">
                <div slot="header" class="clearfix">
                    <span>登录社团管理系统</span>
                </div>
                <div>
                    <el-form ref="form" :model="form" label-width="30%">
                        <el-form-item label="账号">
                            <el-input v-model="form.id" style="width:250px"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input placeholder="请输入密码" v-model="form.password" show-password style="width:250px"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="onLogin(form)">登录</el-button>
                            <el-button type="danger" @click="toNewAccount">注册新账号</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>

            <el-card class="box-card" v-else>
                <div slot="header" class="clearfix">
                    <span>注册新账号</span>
                </div>
                <div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="教师注册" name="1">
                            <el-form ref="form" :model="newForm" label-width="30%">
                                <el-form-item label="账号" required>
                                    <el-input v-model="newForm.userId" placeholder="此处只能是数字" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:250px"></el-input>
                                </el-form-item>
                                <el-form-item label="名字" required>
                                    <el-input v-model="newForm.useName" style="width:250px"></el-input>
                                </el-form-item>
                                <el-form-item label="联系方式" required>
                                    <el-input v-model="newForm.telNumber" placeholder="此处只能是数字" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:250px"></el-input>
                                </el-form-item>
                                <el-form-item label="性别" required>
                                    <el-radio-group v-model="newForm.sex">
                                        <el-radio label="男"></el-radio>
                                        <el-radio label="女"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="个人简介" required>
                                    <el-input type="textarea" v-model="newForm.userDesc" style="width:250px" maxlength="100" show-word-limit :autosize="{ minRows: 2, maxRows: 4}"></el-input>
                                </el-form-item>
                                <el-form-item label="密码" required>
                                    <el-input  placeholder="此处只能是数字" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="newForm.password" show-password style="width:250px"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="success" @click="getNewAccount(newForm)">注册</el-button>
                                    <el-button @click="cancel">返回</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="学生注册" name="2">
                             <el-form ref="form" :model="newForm" label-width="30%">
                                <el-form-item label="账号" required>
                                    <el-input v-model="newForm.userId" placeholder="此处只能是数字" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:250px"></el-input>
                                </el-form-item>
                                <el-form-item label="名字" required>
                                    <el-input v-model="newForm.useName" style="width:250px"></el-input>
                                </el-form-item>
                                <el-form-item label="联系方式" required>
                                    <el-input v-model="newForm.telNumber" placeholder="此处只能是数字" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:250px"></el-input>
                                </el-form-item>
                                <el-form-item label="性别" required>
                                    <el-radio-group v-model="newForm.sex">
                                        <el-radio label="男"></el-radio>
                                        <el-radio label="女"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="个人简介" required>
                                    <el-input type="textarea" v-model="newForm.userDesc" style="width:250px" maxlength="100" show-word-limit :autosize="{ minRows: 2, maxRows: 4}"></el-input>
                                </el-form-item>
                                <el-form-item label="密码" required>
                                    <el-input placeholder="此处只能是数字" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="newForm.password" show-password style="width:250px"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="success" @click="getNewAccount(newForm)">注册</el-button>
                                    <el-button @click="cancel">返回</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
    data(){
        return{
            name:"login",
            form:{},
            showLogin:true,
            activeName:"2",
        }
    },
    computed:{
        ...mapState("login",["title","type","show","newForm"])
    },
    methods:{
        ...mapActions("login",{
            loginUser:"loginUser",
            saveUser:"saveUser"
        }),
        ...mapMutations("login",["resetNewForm"]),
        onLogin(form){
            this.loginUser(form)
            .then(()=>{
                // this.addClubsFormVisible = false;
                if(this.type == "warning"){
                    this.$notify({
                        title:this.title,
                        type:this.type
                    });
                }else{
                    this.$router.push({
                        name:"Home",
                    })
                    this.$notify({
                        title:this.title,
                        type:this.type
                    });
                }
            });
        },
        toNewAccount(){
            this.showLogin = false;
        },
        getNewAccount(newForm){
            if(newForm.userId !=null && newForm.useName!=null && newForm.telNumber!=null && newForm.sex != null && newForm.userDesc != null && newForm.password != null){
                this.saveUser(newForm)
                .then(()=>{
                    this.$notify({
                        title:this.title,
                        type:this.type
                    });
                });
            }else{
                this.$notify({
                    title:"表单不可有空项",
                    type:"warning"
                });
            }
        },
        cancel(){
            this.showLogin = true;
        },
        handleClick(tab, event) {
            if(tab.index == 1){
                this.resetNewForm("学生");
            }else if(tab.index != 1){
                this.resetNewForm("老师");
            }
        }
    }
}
</script>

<style scoped>
img {
	width: 100%;
	height: 100%;
	background: url(../assets/loginBackground.jpg) no-repeat;
	background-size: 100% 100%;
	background-attachment: fixed;/* 不设置的话页面滑动时，背景会不铺满*/
}
.text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>