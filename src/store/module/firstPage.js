import axios from 'axios'

export default{
    namespaced:true,
    state:{
        tableName: [],
        tableDate:[],
        pieName:['老师','学生'],
        pieDate:[]
    },
    getters:{},
    mutations:{
        resetTable(state,tableData){
            state.tableData = tableData;
        }
    },
    actions:{
        getBarInformation(context){
            axios.get("/api/getBarInformation")
            .then((result)=>{
                // context.commit("resetTable",result.data);
                context.state.tableName = [];
                context.state.tableDate = [];
                result.data.forEach((item,index)=>{
                    context.state.tableName.push(item.activeName);
                });
                result.data.forEach((item,index)=>{
                    context.state.tableDate.push(Number(item.activeFinance));
                });

            });
        },
        getPieInformation(context){
            axios.get("/api/getPieInformation")
            .then((result)=>{
                console.log(result);
                // context.state.pieName = [];
                context.state.pieDate = [];
                let teacherValue = 0; 
                let studentValue = 0;
                result.data.forEach((item,index)=>{
                    if(item.userStatus == "老师"){
                        teacherValue++;
                    }
                    if(item.userStatus == "学生"){
                        studentValue++;
                    }
                });
                context.state.pieDate.push({
                    value : teacherValue,
                    name: '老师'
                });
                context.state.pieDate.push({
                    value : studentValue,
                    name: '学生'
                });
            });
        }
    }
}