<template>
    <!-- 社团活动 -->
    <div class="clubActives">
        <!-- 按钮 -->
        <div class="btns">
            <el-button type="primary" plain @click="toApplicationActive" v-show="clubsJob == '社长'">申请活动</el-button>
        </div>
        <!-- /按钮 -->

        <!-- 表格 -->
        <div class="tables">
            <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="活动名称">
                            <span>{{ props.row.activeName }}</span>
                        </el-form-item>
                        <br>
                        <el-form-item label="承办社团名称">
                            <span>{{ props.row.clubsName }}</span>
                        </el-form-item>
                        <br>
                        <el-form-item label="负责人名字">
                            <span>{{ props.row.useName }}</span>
                        </el-form-item>
                        <br>
                        <el-form-item label="负责人电话">
                            <span>{{ props.row.telNumber }}</span>
                        </el-form-item>
                        <br>
                        <el-form-item label="活动经费">
                            <span>{{ props.row.activeFinance }}</span>
                        </el-form-item>
                        <br>
                        <el-form-item label="活动场地">
                            <span>{{ props.row.activePlace }}</span>
                        </el-form-item>
                        <br>
                        <el-form-item label="活动时间">
                            <span>{{ props.row.activeStartTime }} 至 {{props.row.activeEndTime}}</span>
                        </el-form-item>
                        <br>
                        <el-form-item label="活动简介">
                            <span>{{ props.row.activeDesc }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="活动名称" prop="activeName"></el-table-column>
            <el-table-column label="承办社团名称" prop="clubsName"></el-table-column>
            <el-table-column label="负责人名字" prop="useName"></el-table-column>
            <el-table-column label="活动时间" prop="activeStartTime" sortable></el-table-column>
        </el-table>
        </div>
        <!-- /表格 -->

        <!-- 申请模态框 -->
        <el-dialog title="申请活动" :visible.sync="applicationActiveFormVisible">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.activeName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动经费" :label-width="formLabelWidth">
                    <el-input v-model="form.activeFinance" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动场地" :label-width="formLabelWidth">
                    <el-input v-model="form.activePlace" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动时间" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.activeStartTime" type="date" placeholder="选择开始日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" :picker-options="pickerOptions"></el-date-picker>
                    <el-date-picker v-model="form.activeEndTime" type="date" placeholder="选择结束日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>
                <el-form-item label="活动简介" :label-width="formLabelWidth">
                    <el-input v-model="form.activeDesc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="applicationActiveFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="applicationActive()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import $ from 'jquery'
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
    data(){
        return{
            name:"clubActives",
            applicationActiveFormVisible: false,
            formLabelWidth: '120px'
        }
    },
     //钩子函数
    created(){
        //获取后台数据
        this.findAllClubActives(this.openClubsId);
        this.resetForms(this.openClubsId);
        this.resetForm(this.userId);
    },
    mounted(){
        this.getClubsJob(this.clubJobForm);
    },
    computed:{
        ...mapState("clubActives",["tableData","form","clubsJob","clubJobForm","pickerOptions"]),
        ...mapState("login",["userId","userStatus","myClubs","openClubsId"])
    },
    methods:{
        ...mapActions("clubActives",{
            findAllClubActives:"findAll",
            saveOrUpdateActive:"saveOrUpdateActive",
            getClubsJob:"getClubsJob"
        }),
        ...mapMutations("clubActives",["resetForms","resetForm","resetFormm"]),
        //点击 申请活动 按钮
        toApplicationActive(){
            //清空上一次填入的信息
            this.resetFormm({});
            this.applicationActiveFormVisible = true;
        },
        //点击模态框 确定按钮，申请活动
        applicationActive(){
            this.saveOrUpdateActive(this.form);
            this.applicationActiveFormVisible = false;
            this.$notify({
                title:'操作成功',
                type:'success'
            });
        }
    }
}
</script>

<style scoped>
</style>