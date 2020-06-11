import axios from 'axios'

export default{
    namespaced:true,
    state:{
        tableData: []
    },
    getters:{},
    mutations:{
        resetTable(state,tableData){
            state.tableData = tableData;
        }
    },
    actions:{
        findAll(context){
            axios.get("/api/getExitClubsInformation")
            .then((result)=>{
                console.log(result);
                context.commit("resetTable",result.data);
            });
        }
    }
}