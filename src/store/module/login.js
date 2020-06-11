import axios from 'axios'

export default{
    namespaced:true,
    state:{
        title:"",
        type:"",
        //登录人id
        userId:"",
        show:true,
        //登录人身份
        userStatus:"",
        myClubs:[],
        openClubsId:0,
        newForm:{
            //默认注册的权限是学生/1的，修改标签页时修改此处权限
            userStatus:"学生"
        },
    },
    getters:{},
    mutations:{
        resetNewForm(state,userStatus){
            state.newForm.userStatus = userStatus;
        },
        resetUserId(state,userId){
            state.userId = userId;
        },
        resetTitle(state,title){
            state.title = title;
        },
        resetType(state,type){
            state.type = type;
        },
        resetShow(state,show){
            state.show = true;
        },
        resetUserStatus(state,userStatus){
            state.userStatus = userStatus;
        },
        resetMyClubs(state,myClubs){
            state.myClubs = myClubs;
        },
        resetOpenClubsId(state,openClubsId){
            state.openClubsId = openClubsId;
        },
        
    },
    actions:{
        //点击登录时执行的操作
        loginUser(context,form){
            return axios.get("/api/getLoginAccountInformation", {
                params: {id: form.id}
              })
            .then((result)=>{
                if(result.data.length == 0){
                    var title = "登录失败,您输入的账号不存在";
                    var type = "warning"
                    context.commit("resetTitle",title);
                    context.commit("resetType",type);
                }else{
                    if(result.data[0].password == form.password){
                        var title = "登录成功";
                        var type = "success";
                        context.commit("resetTitle",title);
                        context.commit("resetType",type);
                        //长时间保存登录人的id
                        context.commit("resetUserId",form.id);
                        //长时间保存登录人的身份,登录人的身份是老师还是学生，相应的显示导航栏
                        context.commit("resetUserStatus",result.data[0].userStatus);
                        context.commit("resetShow",false);
                        //如果登录的是学生，那么，查找他有几个社团，分别是什么身份
                        context.dispatch("selectMyclubs",form.id);
                    }else{
                        var title = "登录失败,您输入的账号或密码错误";
                        var type = "warning"
                        context.commit("resetTitle",title);
                        context.commit("resetType",type);
                    }
                }
            }).catch((result)=>{
                var title = "登录失败，操作错误";
                var type = "warning";
                context.commit("resetTitle",title);
                context.commit("resetType",type);
            });
        },
        saveUser(context,form){
            //点击注册按钮第一件事应该是先检查账号是否已存在
            return axios.get("/api/getLoginAccountInformation", {
                params: {id: form.userId}
              })
            .then((result)=>{
                console.log(result.data);
                if(result.data.length != 0){
                    var title = "申请账号已存在，请登录";
                    var type = "warning"
                    context.commit("resetTitle",title);
                    context.commit("resetType",type);
                }else{
                    //如果账号不存在，注册，向数据库插入数据
                    return axios.post("/api/newLoginAccountInformation",{
                        userId:form.userId,
                        password:form.password,
                        userStatus:form.userStatus,
                        useName:form.useName,
                        sex:form.sex,
                        telNumber:form.telNumber,
                        userDesc:form.userDesc
                    })
                    .then((result)=>{
                        console.log(result);
                        var title = "注册成功";
                        var type = "success";
                        context.commit("resetTitle",title);
                        context.commit("resetType",type);
                    });
                }
            })
        },
        selectMyclubs(context,id){
            axios.get("/api/selectMyClubs",{
                params:{id:id}
            })
            .then((result)=>{
                console.log(result.data);
                context.commit("resetMyClubs",result.data);
            })
        }
    }
}