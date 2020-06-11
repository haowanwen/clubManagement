import axios from 'axios'

export default{
    namespaced:true,
    state:{
        tableData: [],
    },
    getters:{

    },
    mutations:{
        resetTable(state,tableData){
            state.tableData = tableData;
        }
    },
    actions:{
        findAll(context){
            axios.get("/api/getClubsApplicationInformation")
            .then((result)=>{
                console.log(result);
                context.commit("resetTable",result.data);
            });
        },
        //通过活动申请
        saveOrUpdateActions(context,row){
            console.log(row);
            return axios.get("/api/updateClubsInformation",{
                params: {id: row.activeId}
            })
            .then((result)=>{
                axios.post(("/api/updateFinancialInformation"),{
                    clubsId:row.clubsId,
                    moneyNumber:row.activeFinance,
                    activeId:row.activeId
                })
                .then(()=>{
                    context.dispatch("findAll");
                })
            });
        },
        deleteActions(context,row){
            return axios.get("/api/deleteClubsInformation",{
                params: {id: row.activeId}
            })
            .then(()=>{
                context.dispatch("findAll");
            });
        }
    }
}