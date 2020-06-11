<template>
    <!-- 申请中社员 -->
    <div class="applicationClubs">
        <!-- 表格 -->
        <div class="tables">
             <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="useName" label="社员名字" width="180"></el-table-column>
                <el-table-column prop="userId" label="社员学号" width="180"></el-table-column>
                <el-table-column prop="sex" label="性别" width="180"></el-table-column>
                <el-table-column prop="telNumber" label="联系方式"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" @click="toAdd(scope.row)">通过</el-button>
                        <el-button size="mini" type="danger" @click="toDelete(scope.row)">拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- /表格 -->
    </div>
</template>

<script>
import $ from 'jquery'
import {mapState,mapActions,} from 'vuex'
export default {
    data(){
        return{
            name:"applicationClubs",
            addClubsFormVisible: false,
            formLabelWidth: '120px'
        }
    },
    computed:{
        ...mapState("applicationClubs",["tableData"]),
        ...mapState("login",["userId","userStatus","myClubs","openClubsId"])
    },
    //钩子函数
    created(){
        //获取后台数据
        this.findAllApplicationClubs(this.openClubsId);
    },
    methods:{
        ...mapActions("applicationClubs",{
            saveOrUpdate:"saveOrUpdate",
            findAllApplicationClubs:"findAll",
            deleteById:"deleteById"
        }),
        //点击通过 按钮
        toAdd(row) {
            this.$confirm('是否通过此申请?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.saveOrUpdate(row)
                    .then((result)=>{
                        this.$notify({
                            title:'成功',
                            type:'success'
                        });
                    });
                });
        },
        //点击拒绝 按钮
        toDelete(row) {
            let id = null;
            this.$confirm('是否拒绝此申请？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.deleteById(row)
                    .then((result)=>{
                        this.$notify({
                            title:'删除成功',
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