<template>
    <!-- 社团展示 -->
    <div class="clubsShow">
       <!-- 用v-for自动生成卡片 -->
        <el-card class="box-card" v-for="o in tableData" :key="o.clubsId">
            <div slot="header" class="clearfix">
                <span>{{o.clubsName}}</span>
                <el-button style="float: right; padding: 3px 0;font-size:18px" type="text" @click="addNewClub(o.clubsId)">加入社团</el-button>
            </div>
            <div class="text item">
                社长姓名: {{o.useName}}
            </div>
            <div class="text item">
                社长联系方式: {{o.telNumber}}
            </div>
            <div class="text item">
                社团简介: {{o.clubsdesc}}
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
            name:"clubsShow",
        }
    },
    computed:{
        ...mapState("clubsShows",["tableData","title","type"]),
        ...mapState("login",["userId","userStatus","myClubs","openClubsId"])
    },
    //钩子函数
    created(){
        this.findAllClubsManagement();
        this.resetMyId(this.userId);
    },
    methods:{
        ...mapActions("clubsShows",{
            findAllClubsManagement:"findAll",
            addOneNewClub:"addOneNewClub"
        }),
        ...mapMutations("clubsShows",["resetMyId"]),
        addNewClub(clubId){
            this.$confirm('确定要加入该社团么？','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(() => {
                // console.log(clubId);
                this.addOneNewClub(clubId)
                .then(()=>{
                    this.$notify({
                        title:this.title,
                        type:this.type
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
    width: calc(100%/3.2);
    display: inline-block;
    margin-right: 18px;
    margin-bottom: 18px;
  }
</style>