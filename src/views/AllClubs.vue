<template>
    <!-- 所有社员 -->
    <div class="allClubs">
        <!-- 表格 -->
        <div class="tables">
             <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="useName" label="社员名字" width="180"></el-table-column>
                <el-table-column prop="userId" label="社员学号" width="180"></el-table-column>
                <el-table-column prop="userDesc" label="个人简介" width="180"></el-table-column>
                <el-table-column prop="sex" label="性别" width="180"></el-table-column>
                <el-table-column prop="telNumber" label="联系方式"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button  v-show="clubsJob == '社长'" size="mini" type="danger" @click="toDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- /表格 -->
    </div>
</template>

<script>
import $ from 'jquery'
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
    data(){
        return{
            name:"allClubs",
            formLabelWidth: '120px'
        }
    },
    //钩子函数
    created(){
        //获取后台数据
        this.findAllAllClubs(this.openClubsId);
        this.resetForm(this.userId);
    },
    mounted(){
        this.getClubsJob();
    },
    computed:{
        ...mapState("allClubs",["tableData","clubsJob"]),
        ...mapState("login",["userId","userStatus","myClubs","openClubsId"])
    },
    methods:{
        ...mapActions("allClubs",{
            findAllAllClubs:"findAll",
            deleteById:"deleteById",
            getClubsJob:"getClubsJob"
        }),
        ...mapMutations("allClubs",["resetForm"]),
        //点击删除 按钮
        toDelete(row) {
            if(row.userId == this.userId){
                this.$confirm('此操作不能删除社长！！', '提示', {
                cancelButtonText: '取消',
                type: 'warning'
                })
            }else{
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
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
}
</script>

<style scoped>

</style>