<template>
    <!-- 已有活动管理 -->
    <div class="ExistingActivitie">
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
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return{
            name:"ExistingActivitie",
        }
    },
    computed:{
        ...mapState("existingActivitie",["tableData"])
    },
    created(){
        this.findAll();
    },
    methods:{
        ...mapActions("existingActivitie",["findAll"]),
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