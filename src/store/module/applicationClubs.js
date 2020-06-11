import axios from "axios"
export default{
    namespaced:true,
    state:{
        name:"applicationClubs",
        tableData: [],
        clubsId:0,
    },
    getters:{

    },
    mutations:{
        //刷新表格数据
        resetTable(state,list){
            state.tableData = list;
        },
        resetClubsId(state,clubsId){
            state.clubsId = clubsId;
        },
    },
    actions:{
        findAll(context,id){
            context.commit("resetClubsId",id);
            axios.get("/api/selectApplicationClubMember",{
                params:{id:id}
            })
            .then((result)=>{
                console.log(result);
                //将查询到的数据通过mutations设置到state中
                context.commit("resetTable",result.data);
            });
        },
        saveOrUpdate(context,row){
            return axios.get("/api/updateApplicationClubMember",{
                params:{id:row.userId,
                clubsId:context.state.clubsId}
            })
            .then((result)=>{
                console.log(result);
                context.dispatch("findAll",context.state.clubsId)
            });
        },
        deleteById({dispatch,commit,state},row){
            return axios.get("/api/deleteApplicationClubMember",{
                params:{id:row.userId,
                clubsId:state.clubsId}
            })
            .then((result)=>{
                dispatch("findAll",state.clubsId);
            });
        }
    }
}