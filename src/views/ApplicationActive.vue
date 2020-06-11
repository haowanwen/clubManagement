<template>
    <!-- 申请中活动管理 -->
    <div class="ApplicationActive">
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
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="throughApplication(scope.row)">通过申请</el-button>
                    <el-button size="mini" type="danger" @click="refuseApplication(scope.row)">拒绝申请</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import $ from 'jquery'
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return{
            name:"ApplicationActive",
        }
    },
    computed:{
        ...mapState("applicationActive",["tableData"])
    },
    created(){
        this.findAllApplicationActive();
    },
    methods: {
        ...mapActions("applicationActive",{
            findAllApplicationActive:"findAll",
            saveOrUpdateActions:"saveOrUpdateActions",
            deleteActions:"deleteActions"
        }),
        throughApplication(row) {
            this.$confirm("确定要通过该活动么？",'提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.saveOrUpdateActions(row)
                .then(()=>{
                    this.$notify({
                        title:'成功',
                        type:'success'
                    });
                });
            });
        },
        refuseApplication(row) {
            this.$confirm("确定要拒绝该活动么？",'提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.deleteActions(row)
                .then(()=>{
                    this.$notify({
                        title:'成功',
                        type:'success'
                    });
                });
            });
        }
    }
}
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>