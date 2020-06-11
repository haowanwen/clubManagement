<template>
  <div id="app">
    <div>
      <el-container class="container">
        <el-header height="56px" class="header">{{title}}</el-header>
        <el-container>
          <!-- 左侧导航 -->
          <el-aside width="200px" class="left-aside">
            <el-menu  @open="handleOpen" :router="true" default-active="/" :unique-opened="true" class="el-menu-vertical-demo">
              <el-menu-item index="/firstPage">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <!-- 老师系统可见 -->
              <el-menu-item index="/clubsManagement" v-show="userStatus == '老师'">
                <i class="el-icon-s-operation"></i>
                <span>社团管理</span>
              </el-menu-item>
              <el-submenu index="1" v-show="userStatus == '老师'">
                <template slot="title">
                  <i class="el-icon-s-flag"></i>
                  <span>活动管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/existingActivitie">已有活动</el-menu-item>
                  <el-menu-item index="/applicationActive">申请中活动</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- 老师系统可见 -->

              <!-- 学生系统可见 -->
              <el-submenu v-for="item in myClubs" :index="item.clubsId" :key="item.clubsId" v-show="userStatus == '学生'">
                <template slot="title">
                  <i class="el-icon-s-custom"></i>
                  <span>{{item.clubsName}}</span>
                </template>
                <el-menu-item-group v-show="item.clubsMemberJob == '社长'">
                  <el-menu-item index="/generalManagement">换届管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/clubActives">社团活动</el-menu-item>
                </el-menu-item-group>
                <el-submenu :index="item.clubsId">
                  <template slot="title">社团成员</template>
                  <el-menu-item index="/allClubs">全部社员</el-menu-item>
                  <el-menu-item index="/applicationClubs" v-show="item.clubsMemberJob == '社长'">申请中社员</el-menu-item>
                </el-submenu>
                <el-menu-item-group>
                  <el-menu-item index="/clubFinancial">社团财务</el-menu-item>
                </el-menu-item-group>
              </el-submenu >
              <el-menu-item index="/clubsShow" v-show="userStatus == '学生'">
                <i class="el-icon-medal"></i>
                <span slot="title">社团展示</span>
              </el-menu-item>
              
              <!-- 学生系统可见 -->

              <!-- 所有人可见 -->
              <el-menu-item index="/personalInformation" v-show="userStatus == '老师' || userStatus == '学生'">
                <i class="el-icon-setting"></i>
                <span slot="title">修改信息</span>
              </el-menu-item>
              <!-- 所有人可见 -->
              <!-- 所有人可见 -->
              <el-menu-item index="/">
                <i class="el-icon-close"></i>
                <span slot="title">退出</span>
              </el-menu-item>
              <!-- 所有人可见 -->
            </el-menu>
          </el-aside>
          <!-- 左侧导航 -->

          <!-- 右侧内容区 -->
          <el-main>
            <router-view></router-view>
          </el-main>
          <!-- /右侧内容区 -->
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
  name: 'app',
  data(){
    return {
      title:"高校社团管理系统",
    }
  },
  components: {
  },
  computed:{
        ...mapState("login",["userId","userStatus","myClubs","openClubsId"])
  },
  methods:{
    ...mapMutations("login",["resetOpenClubsId"]),
    handleOpen(key) {
        console.log(key);
        this.resetOpenClubsId(key);
      }
  }
}
</script>

<style>
  .container{
    position:absolute;
    width: 100%;
    top:0;
    bottom:0;
  }
  .container > .header{
    background-color: #30619e;
    color: #ffffff;
    line-height: 56px;
    font-size: 20px;
    font-weight: bolder;
  }

  .container .left-aside{
    border-right: 1px solid #e6e6e6;
  }
</style>
