import axios from "axios"

export default{
    namespaced:true,
    state:{
        tableData: [],
        myId:0,
        title:"",
        type:""
    },
    getters:{},
    mutations:{
        resetTable(state,tableData){
            state.tableData = tableData;
        },
        resetMyId(state,myId){
            state.myId = myId;
        },
        resetTitle(state,title){
            state.title = title;
        },
        resetType(state,type){
            state.type = type;
        }
    },
    actions:{
        findAll(context){
            axios.get("/api/getClubsInformation")
            .then((result)=>{
                console.log(result);
                context.commit("resetTable",result.data);
            });
        },
        addOneNewClub(context,clubId){
            return axios("/api/selectBeforeAddNewClub",{
                params:{
                    clubsId:clubId,
                    myId:context.state.myId
                }
            })
            .then((result)=>{
                if(result.data.length != 0){
                    context.commit("resetTitle","您已经在此社团或正在申请，不可重复申请");
                    context.commit("resetType","warning");
                }else{
                    axios.get("/api/addOneNewClub",{
                        params:{
                            clubsId:clubId,
                            myId:context.state.myId
                        }
                    })
                    .then((result)=>{
                        context.commit("resetTitle","申请已发送，请等待管理员处理");
                        context.commit("resetType","success");
                    });
                }
            });
        }
    }
}