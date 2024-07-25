<template>
    <el-card shadow="never">
        <template #header>
            <div class="flex justify-between">
                <span class="text-sm">统计数据</span>
                    <div>
                        <el-check-tag v-for="(item,index) in options" :key="index" 
                        :checked="current == item.value" @click="handleChoose"
                        style="margin-right: 8px;">{{item.text}}</el-check-tag>
                    </div>
            </div>
        </template>

        <div id="chart" style="width: 100%; height: 300px;"></div>

    </el-card>


</template>

<script setup>

import { ref,onMounted } from 'vue';
import * as echarts from 'echarts';
import {
    getStatistics3
} from "~/api/index.js"

const current = ref("week")
const options = [{
    text:"近24小时",
    value:'hour'
},{
    text:"近一周",
    value:'week'
},{
    text:"近一个月",
    value:'month'
}]


const handleChoose = (type)=>(
    current.value = type
)


var myChart = null
onMounted(()=>{

    var chartDom = document.getElementById('chart');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
        }
    ]
    };

    option && myChart.setOption(option);
})

function getData(){


    myChart.showLoding()
    getStatistics3(current.value).then(res=>{
        options.xAxis.data = rex.x
        options.series[0].data = rex.y
        
        myChart.setOption()
    })
}





</script>