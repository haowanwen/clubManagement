import Vue from 'vue'
import VueRouter from 'vue-router'

// 登录、注册页面
import Login from '../views/Login.vue'
//教师模式下的社团管理页面
import ClubsManagement from '../views/ClubsManagement.vue'
//教师模式下的已有活动页面
import ExistingActivitie from '../views/ExistingActivitie.vue'
//教师模式下的申请中互动页面
import ApplicationActive from '../views/ApplicationActive.vue'
//学生模式下的换届管理页面
import GeneralManagement from '../views/GeneralManagement.vue'
//学生模式下的社团活动页面
import ClubActives from '../views/ClubActives.vue'
//学生模式下的全部社员页面
import AllClubs from '../views/AllClubs.vue'
//学生模式下的申请中社员页面
import ApplicationClubs from '../views/ApplicationClubs.vue'
//学生模式下的社团财务页面
import ClubFinancial from '../views/ClubFinancial.vue'
//学生模式下的社团展示页面
import ClubsShow from '../views/ClubsShow.vue'
//所有模式下的信息修改页面
import PersonalInformation from '../views/PersonalInformation.vue'
import Home from '../views/Home.vue'
//首页路由
import FirstPage from '../views/FirstPage.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path:'/home',
    name:'Home',
    component:Home,
    children:[
      {
        path: '/firstPage',
        name: 'FirstPage',
        component: FirstPage
      },
      {
        path: '/clubsManagement',
        name: 'ClubsManagement',
        component: ClubsManagement
      },
      {
        path: '/existingActivitie',
        name: 'ExistingActivitie',
        component: ExistingActivitie
      },
      {
        path: '/applicationActive',
        name: 'ApplicationActive',
        component: ApplicationActive
      },
      {
        path: '/generalManagement',
        name: 'GeneralManagement',
        component: GeneralManagement
      },
      {
        path: '/clubActives',
        name: 'ClubActives',
        component: ClubActives
      },
      {
        path: '/allClubs',
        name: 'AllClubs',
        component: AllClubs
      },
      {
        path: '/applicationClubs',
        name: 'ApplicationClubs',
        component: ApplicationClubs
      },
      {
        path: '/clubFinancial',
        name: 'ClubFinancial',
        component: ClubFinancial
      },
      {
        path: '/clubsShow',
        name: 'ClubsShow',
        component: ClubsShow
      },
      {
        path: '/personalInformation',
        name: 'PersonalInformation',
        component: PersonalInformation
      }
    ],redirect:"/firstPage"
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  routes
})
export default router
