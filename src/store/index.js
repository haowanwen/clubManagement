import Vue from 'vue'
import Vuex from 'vuex'
import allClubs from './module/allClubs'
import applicationActive from './module/applicationActive'
import applicationClubs from './module/applicationClubs'
import clubActives from './module/clubActives'
import clubFinancial from './module/clubFinancial'
import clubsManagement from './module/clubsManagement'
import clubsShows from './module/clubsShows'
import existingActivitie from './module/existingActivitie'
import generalManagement from './module/GeneralManagement'
import login from './module/login'
import personalInformation from './module/personalInformation'
import firstPage from './module/firstPage'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    allClubs,
    applicationActive,
    applicationClubs,
    clubActives,
    clubFinancial,
    clubsManagement,
    clubsShows,
    existingActivitie,
    generalManagement,
    login,
    personalInformation,
    firstPage
  }
})
