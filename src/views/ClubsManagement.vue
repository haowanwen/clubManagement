<template>
    <!-- 社团管理 -->
    <div class="clubsManagement">
        <!-- 按钮 -->
        <div class="btns">
            <el-button type="primary" plain @click="toAddClubs">添加社团</el-button>
        </div>
        <!-- /按钮 -->

        <!-- 表格 -->
        <div class="tables">
             <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="clubsName" label="社团名字" width="180"></el-table-column>
                <el-table-column prop="useName" label="社长名字" width="180"></el-table-column>
                <el-table-column prop="userId" label="社长学号" width="180"></el-table-column>
                <el-table-column prop="telNumber" label="社长联系方式" width="180"></el-table-column>
                <el-table-column prop="clubsdesc" label="社团简介"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="toEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="toDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- /表格 -->

        <!-- 修改社团模态框 -->
        <el-dialog title="修改社团信息" :visible.sync="updateClubsFormVisible">
            <el-form :model="form">
                <el-form-item label="社团名字" :label-width="formLabelWidth">
                    <el-input v-model="form.clubsName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="社长名字" :label-width="formLabelWidth">
                    <el-input v-model="form.useName" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="社长学号" :label-width="formLabelWidth">
                    <el-input v-model="form.userId" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="社长联系方式" :label-width="formLabelWidth">
                    <el-input v-model="form.telNumber" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="社团简介" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form.clubsdesc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateClubsFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateClubs(form)">确 定</el-button>
            </div>
        </el-dialog>
        <!-- /修改社团模态框 -->

        <!-- 新增社团模态框 -->
        <el-dialog title="新增社团" :visible.sync="addClubsFormVisible">
            <el-form :model="newform">
                <el-form-item label="社团名字" :label-width="formLabelWidth">
                    <el-input v-model="newform.clubsName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="社长学号" :label-width="formLabelWidth">
                    <!-- 下拉列表 -->
                    <el-select v-model="newform.userId" placeholder="请选择一位社长">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="社团简介" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="newform.clubsdesc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addClubsFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addClubs(newform)">确 定</el-button>
            </div>
        </el-dialog>
        <!-- /新增社团模态框 -->
    </div>
</template>

<script>
import $ from 'jquery'
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return{
            name:"clubsManagement",
            updateClubsFormVisible: false,
            addClubsFormVisible: false,
            form: {},
            newform:{},
            formLabelWidth: '120px'
        }
    },
    computed:{
        ...mapState("clubsManagement",["tableData","options","title","type"])
    },
    created(){
        this.findAllClubsManagement();
    },
    methods:{
        ...mapActions("clubsManagement",{
            findAllClubsManagement:"findAll",
            saveOrUpdateClubs:"saveOrUpdateClubs",
            deleteClubs:"deleteClubs",
            saveNewClubs:"saveNewClubs",
            getOptions:"getOptions"

        }),
        //点击 编辑  按钮
        toEdit(row) {
            this.form = row;
            this.updateClubsFormVisible = true;
        },
        //点击 添加社团 按钮
        toAddClubs(){
            this.newform = {};
            this.getOptions();
            this.addClubsFormVisible = true;
        },
        //点击修改信息模态框 确定按钮
        updateClubs(form){
            this.saveOrUpdateClubs(form)
            .then(()=>{
                this.updateClubsFormVisible = false;
                this.$notify({
                    title:'操作成功',
                    type:'success'
                });
            });
        },
        //点击新增社团确定按钮
        addClubs(newform){
            this.saveNewClubs(newform)
            .then(()=>{
                this.addClubsFormVisible = false;
                this.$notify({
                    title:this.title,
                    type:this.type
                });
            });
        },
        //点击删除 按钮
        toDelete(row) {
            let id = null;
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.deleteClubs(row)
                    .then(()=>{
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