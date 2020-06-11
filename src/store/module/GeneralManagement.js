import axios from "axios"

export default{
    namespaced:true,
    state:{
        tableData: [],
        options: [],
        userIdClone:0,
        form:{},
        
    },
    getters:{},
    mutations:{
        resetTable(state,tableData){
            state.tableData = tableData;
        },
        resetUserId(state,userId){
            state.userIdClone = userId;
        },
        resetForm(state,userId){
            state.form.userIdClone = userId;
        },
        resetForms(state,OpenClubs){
            state.form.OpenClubs = OpenClubs;
        },

    },
    actions:{
        findAll(context,userId){
            context.commit("resetUserId",userId);
            axios.get("/api/getLoginAccountInformation",{
                params:{id:userId}
            })
            .then((result)=>{
                console.log(result.data[0]);
                context.commit("resetTable",result.data);
            });
        },
        //获取换届操作的下拉列表数据
        getOptions(context,id){
            axios.get("/api/selectClubMember",{
                params:{id:id}
            })
            .then((result)=>{
                context.state.options = [];
                result.data.forEach((item,index)=>{
                    context.state.options.push({
                        value : item.userId,
                        label : "学号："+ item.userId +" 姓名:"+ item.useName
                    })
                })
            });
        },
        updateGeneralManagement(context,form,openClubsId){
            axios.post("/api/updateGeneralManagement",{
                newId:form.value,
                clubsId:form.OpenClubs,
                oldId:form.userIdClone,
            })
            .then((result)=>{
                console.log(result);
                context.dispatch("findAll",state.form.value);
            });
        }
    }
}