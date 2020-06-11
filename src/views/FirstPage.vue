<template>
    <!-- 登录界面 -->
    <div class="firstPage">
        <!-- 活动和财务状况表 -->
        <div>
            <div class="Layer" id="myPieChart" style="width: 600px;height:500px;"></div>
            <div class="Layer" id="myBarChart" style="width: 600px;height:500px;"></div>
        </div>
        <!-- 展示图片 -->
        <div>
            <div class="Layer" style=" width:33%; height:15%;">
                <img src="../assets/two.jpg" width="90%" />
            </div>
            <div class="Layer" style="width:33%; height:15%;">
                <img src="../assets/one.jpg" width="90%" />
            </div>
            <div class="Layer" style="width:33%; height:15%;">
                <img src="../assets/three.jpg" width="90%" />
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
export default {
    data(){
        return{
        }
    },
    created(){
        this.getBarInformation();
        this.getPieInformation();
    },
    mounted(){
        this.drawLine();
        this.drawPie();
    },
    computed:{
        ...mapState("firstPage",["tableName","tableDate","pieDate","pieName"]),
    },
    methods:{
        ...mapActions("firstPage",["getBarInformation","getPieInformation"]),
         drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myBarChart'))
            // 绘制图表
            myChart.setOption({
                title: {text: '社团活动及财务'},
                tooltip: {},
                xAxis: {
                    data: this.tableName,
                    axisLabel: {  
                                interval: 0,
                                formatter:function(value)  
                                {  
                                    return value.split("").join("\n");  
                                }
                            },
                },
                yAxis: {
                    
                },
                series: [{
                    name: '活动经费',
                    type: 'bar',
                    data: this.tableDate
                }]
            });
        },
        drawPie(){
            // 基于准备好的dom，初始化echarts实例
            let myPieChart = this.$echarts.init(document.getElementById('myPieChart'))
            // 绘制图表
            myPieChart.setOption({
                title: {
                    text: '本系统师生用户比',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: this.pieName
                },
                series: [
                    {
                        name: '高校社团管理',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: this.pieDate,
                        // [
                        //     {value: 335, name: '直接访问'},
                        //     {value: 310, name: '邮件营销'},
                        //     {value: 234, name: '联盟广告'},
                        //     {value: 135, name: '视频广告'},
                        //     {value: 1548, name: '搜索引擎'}
                        // ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
        },

    }
}
</script>

<style scoped>
    .Layer{
        display: inline-block;
    }
</style>