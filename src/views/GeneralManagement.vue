<template>
    <!-- 换届管理 -->
    <div class="generalManagement">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>社团换届</span>
            </div>
            <div>
                <div>
                    <span>现有领导人</span>
                    <br/>
                    <br/>
                    <!-- 社长信息展示 -->
                    <el-table class="table" :data="tableData" style="width: 100%">
                        <el-table-column label="社长信息">
                            <el-table-column prop="useName" label="姓名" width="180"></el-table-column>
                            <el-table-column prop="userId" label="学号"></el-table-column>
                            <el-table-column prop="telNumber" label="联系方式"></el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <el-divider></el-divider>
                <span>换届操作</span>
                <el-form ref="form" :model="form" label-width="50%">
                    <el-form-item label="请选择社长">
                        <!-- 下拉列表 -->
                        <el-select v-model="form.value" placeholder="请选择一位社长">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit()">确定</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import $ from 'jquery'
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
    data(){
        return{
            name:"generalManagement",
        }
    },
    computed:{
        ...mapState("generalManagement",["tableData","options","form"]),
        ...mapState("login",["userId","userStatus","myClubs","openClubsId"])
    },
    created(){
        this.findAllGeneralManagement(this.userId);
        console.log(this.myClubs);
        //将导航栏选中的clubsid保存，方便以后查询数据
        //查找下拉列表中的option
        this.getOptions(this.openClubsId);
    },
    methods:{
        ...mapActions("generalManagement",{
            findAllGeneralManagement:"findAll",
            updateGeneralManagement:"updateGeneralManagement",
            getOptions:"getOptions"
        }),
        ...mapMutations("generalManagement",{
            resetForm:"resetForm",
            resetForms:"resetForms"
        }),
        //取消换届操作，将选择器中的数据还原
        cancel(){
            this.form = {
                value1: [],
            };
        },
        //确认换届，修改数据库中的内容
        onSubmit(){
            this.$confirm('此操作将执行换届，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.resetForm(this.userId);
                this.resetForms(this.openClubsId);
                this.updateGeneralManagement(this.form)
               .then(()=>{
                   this.$notify({
                       title:'换届成功',
                       type:'success'
                   });
               });
           });
        }
    }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 100%;
  }
  .table{
      display: inline-block;
  }
</style>