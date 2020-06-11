<template>
    <!-- 社团财务 -->
    <div class="clubFinancial">
        <!-- 按钮 -->
        <div class="btns">
        </div>
        <!-- /按钮-->
        <el-table :data="tableData" border style="heigth:100%;width: 100%; margin-top: 20px">
            <el-table-column prop="moneyId" label="ID" width="180"></el-table-column>
            <el-table-column prop="activeName" label="活动名称"></el-table-column>
            <el-table-column prop="useName" label="负责人"></el-table-column>
            <el-table-column prop="telNumber" label="负责人电话"></el-table-column>
            <el-table-column prop="activeStartTime" label="时间"></el-table-column>
            <el-table-column prop="activeFinance" label="收/支（元）"></el-table-column>
        </el-table>
        <!-- 新增、修改社团模态框 -->
        <el-dialog title="申请活动" :visible.sync="applicationActiveFormVisible">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.activeName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="负责人名字" :label-width="formLabelWidth">
                    <el-input v-model="form.useName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="负责人电话" :label-width="formLabelWidth">
                    <el-input v-model="form.telNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收支" :label-width="formLabelWidth">
                    <el-input v-model="form.activeMoney" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动时间" :label-width="formLabelWidth">
                    <el-input v-model="form.activeTime" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="applicationActiveFormVisible = false">取 消</el-button>
                <!-- <el-button type="primary" @click="applicationActive(form)">确 定</el-button> -->
            </div>
        </el-dialog>
    </div>
</template>

<script>
import $ from 'jquery'
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return{
            name:"clubFinancial",
            applicationActiveFormVisible:false,
            formLabelWidth: '120px',
            form:{}
        }
    },
    created(){
        this.findAllClubFinancial(this.openClubsId);
    },
    computed:{
        ...mapState("clubFinancial",["tableData"]),
         ...mapState("login",["userId","userStatus","myClubs","openClubsId"])
    },
    methods: {
        ...mapActions("clubFinancial",{
            findAllClubFinancial:"findAll",
            saveOrUpdateActive:"saveOrUpdateActive"
        }),
      //点击 申请活动 按钮
        toApplicationActive(){
            this.applicationActiveFormVisible = true;
        },
        //点击模态框 确定按钮，申请活动
        applicationActive(form){
            this.saveOrUpdateActive(form)
            .then(()=>{
                this.applicationActiveFormVisible = false;
                this.$notify({
                    title:'操作成功',
                    type:'success'
                });
            });
        }
    }
}
</script>

<style scoped>

</style>