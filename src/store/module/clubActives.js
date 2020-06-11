import axios from "axios"

export default{
    namespaced:true,
    state:{
        tableData: [],
        form: {},
        clubJobForm:{},
        clubsJob:"",
        pickerOptions: {
            disabledDate(time) {
              return time.getTime() < Date.now();
            },
        }
    },
    getters:{},
    mutations:{
        resetTbale(state,tableData){
            state.tableData = tableData;
        },
        //重置申请活动表单，每次模态框显示时使用
        resetFormm(state,form){
            state.form = form;
        },
        resetForm(state,userId){
            state.clubJobForm.userId = userId;
        },
        resetForms(state,openClubsId){
            state.clubJobForm.openClubsId = openClubsId;
        },
        resetClubsJob(state,clubsJob){
            state.clubsJob = clubsJob;
        },
        
    },
    actions:{
        findAll(context,id){
            axios.get("/api/getMyClubsInformation",{
                params:{id:id}
            })
            .then((result)=>{
                console.log(result);
                context.commit("resetTbale",result.data);
            });
        },
        getClubsJob(context){
            axios.get("api/getClubsJob",{
                params:{
                    userId:context.state.clubJobForm.userId,
                    clubsId:context.state.clubJobForm.openClubsId
                }
            })
            .then((result)=>{
                context.commit("resetClubsJob",result.data[0].clubsMemberJob);
            });
        },
        saveOrUpdateActive(context,form){
            // console.log(form);
            axios.post("/api/saveActive",{
                clubsId:context.state.clubJobForm.openClubsId,
                activeName:form.activeName,
                userId:context.state.clubJobForm.userId,
                activeFinance:form.activeFinance,
                activePlace:form.activePlace,
                activeStartTime:form.activeStartTime,
                activeEndTime:form.activeEndTime,
                activeDesc:form.activeDesc,
            })
            .then((result)=>{

            });
        }
    }
}