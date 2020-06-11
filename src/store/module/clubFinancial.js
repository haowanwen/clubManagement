import axios from "axios"

export default{
    namespaced:true,
    state:{
        tableData: [],
    },
    getters:{},
    mutations:{
        resetTable(state,tableData){
            state.tableData = tableData;
        }
    },
    actions:{
        findAll(context,id){
            axios.get("api/getClubsFinancial",{
                params:{clubsId:id}
            })
            .then((result)=>{
                console.log(result);
                context.commit("resetTable",result.data);
            });
        },
        saveOrUpdateActive(context,form){
            return http.post("",form)
            .then((result)=>{
                context.dispatch("findAll");
            });
        }
    }
}