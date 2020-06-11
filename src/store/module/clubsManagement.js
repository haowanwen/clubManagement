import axios from 'axios'

export default{
    namespaced:true,
    state:{
        tableData: [],
        options:[],
        title:"",
        type:""
    },
    getters:{},
    mutations:{
        resetTable(state,tableData){
            state.tableData = tableData;
        },
        resetTitle(state,title){
            state.title = title;
        },
        resetType(state,type){
            state.type = type
        }
    },
    actions:{
        //初始化页面
        findAll(context){
            axios.get("/api/getClubsInformation")
            .then((result)=>{
                console.log(result.data);
                context.commit("resetTable",result.data);
            });
        },
        //修改社团信息
        saveOrUpdateClubs(context,form){
            // console.log(form,"++++++++++++++");
            return axios.post("/api/setClubsInformation",{
                siclubsName:form.clubsName,
                aiuseName:form.useName,
                aitelNumber:form.telNumber,
                siclubsdesc:form.clubsdesc,
                clubsId:form.clubsId
            })
            .then((result)=>{
                context.dispatch("findAll");
            });
        },
        //获取新增社团模态框中的下拉列表数据
        getOptions(context,newform){
            context.state.options = [];
            axios.get("/api/getNewClubsOptions")
            .then((result)=>{
                // console.log(result.data);
                result.data.forEach((item,index)=>{
                    context.state.options.push({
                        value : item.userId,
                        label : "学号："+ item.userId +" 姓名:"+ item.useName
                    })
                })
            });
        },
        //新增一个社团
        saveNewClubs(context,newform){
            return axios.get("/api/selectClubsInformation",{
                params:{id:newform.userId}
            })
            .then((result)=>{
                if(result.data.length != 0){
                    context.commit("resetTitle","该学生已经是某社团社长，不能重复任命");
                    context.commit("resetType","warning");
                }else{
                    axios.post("/api/saveNewClubs",{
                        clubsName:newform.clubsName,
                        userId:newform.userId,
                        clubsdesc:newform.clubsdesc
                    })
                    .then((result)=>{
                        axios.post("/api/updateClubsMember",{
                            userId:newform.userId,
                        })
                        .then((result)=>{
                            axios.post("/api/updateAllClubsMember")
                            // console.log(result,"==========");
                        })
                        context.commit("resetTitle","操作成功");
                        context.commit("resetType","success");
                        context.dispatch("findAll");
                    });
                }
            });
        },
        deleteClubs(context,row){
            return axios.get("/api/deleteClubs",{
                params: {id: row.clubsId}
            })
            .then(()=>{
                context.dispatch("findAll");
            });
        }

    }
}