import axios from "axios"

export default{
    namespaced:true,
    state:{
        form:{},
        userId:0,
    },
    getters:{},
    mutations:{
        resetTable(state,form){
            state.form = form;
        },
        resetUserId(state,userId){
            state.userId = userId;
        },
    },
    actions:{
        findAll(context,userId){
            context.commit("resetUserId",userId);
            return axios.get("/api/getLoginAccountInformation",{
                params:{id:userId}
            })
            .then((result)=>{
                context.commit("resetTable",result.data[0]);
            });
        },
        saveOrUpdatePersonalInformation(context,form){
            return axios.post("/api/updateAccountInformation",{
                password:form.password,
                useName:form.useName,
                sex:form.sex,
                telNumber:form.telNumber,
                userDesc:form.userDesc,
                userId:form.userId
            })
            .then((result)=>{
                context.dispatch("findAll",context.state.userId);
            });
        }
    }
}