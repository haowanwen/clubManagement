<template>
    <!-- 个人信息修改 -->
    <div class="personalInformation">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>个人信息</span>
            </div>
            <div>
                <el-form ref="form" :model="formsClone" label-width="30%">
                    <el-form-item label="姓名">
                        <el-input v-model="formsClone.useName" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="学/工号">
                        <el-input v-model="formsClone.userId" :disabled="true" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="formsClone.telNumber" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="formsClone.sex">
                            <el-radio label="男" value="男"></el-radio>
                            <el-radio label="女" value="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="formsClone.password" style="width:200px" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="个人简介">
                        <el-input type="textarea" v-model="formsClone.userDesc" style="width:400px" maxlength="100" show-word-limit :autosize="{ minRows: 2, maxRows: 4}"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit(formsClone)">确定修改</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import $ from 'jquery'
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return{
            name:"personalInformation",
            formsClone:{},
        }
    },
    //钩子函数
    created(){
        this.findPersonalInformation(this.userId)
        .then(()=>{
            this.formsClone = Object.assign({}, this.form);
        });
    },
    computed:{
        ...mapState("personalInformation",["form"]),
        ...mapState("login",["userId"]),
    },
    methods:{
        ...mapActions("personalInformation",{
            findPersonalInformation:"findAll",
            saveOrUpdatePersonalInformation:"saveOrUpdatePersonalInformation",
        }),
        //取消修改信息操作，将选择器中的数据还原
        cancel(){
            this.formsClone = Object.assign({}, this.form);
        },
        //确认修改，修改数据库中的内容
        onSubmit(formsClone){
            this.$confirm('此操作将修改信息，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.saveOrUpdatePersonalInformation(formsClone)
                .then(()=>{
                    this.$notify({
                        title:'修改成功',
                        type:'success'
                    });
                });
            });
        }
    }
}
</script>

<style scoped>

</style>