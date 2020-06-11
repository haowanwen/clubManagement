import axios from 'axios'

export default{
    namespaced:true,
    state:{
        name:"allClubs",
        tableData: [],
        clubsId:0,
        clubsJob:"",
        userIdClone:0
    },
    getters:{},
    mutations:{
        //刷新表格数据
        resetTable(state,list){
            state.tableData = list;
        },
        resetClubsId(state,clubsId){
            state.clubsId = clubsId;
        },
        resetForm(state,userId){
            state.userIdClone = userId;
        },
        resetClubsJob(state,clubsJob){
            state.clubsJob = clubsJob;
        },
    },
    actions:{
        findAll(context,id){
            context.commit("resetClubsId",id);
            axios.get("/api/selectClubMember",{
                params:{id:id}
            })
            .then((result)=>{
                //将查询到的数据通过mutations设置到state中
                context.commit("resetTable",result.data);
            });
        },
        getClubsJob(context){
            axios.get("api/getClubsJob",{
                params:{
                    userId:context.state.userIdClone,
                    clubsId:context.state.clubsId
                }
            })
            .then((result)=>{
                console.log(result.data[0],"kkkkkkkkkkkkkkk");
                context.commit("resetClubsJob",result.data[0].clubsMemberJob);
            });
        },
        deleteById(context,row){
            return axios.get("/api/dleteClubsMember",{
                params:{userId:row.userId,
                clubsId:context.state.clubsId}
            })
            .then((result)=>{
                context.dispatch("findAll",context.state.clubsId);
            });
        }
    }
}