<template>
    <el-card shadow="never">
      <template #header>
        <div class="flex justify-between">
          <span class="flex justify-between justify-center text-sm">实验数据</span>
        </div>
      </template>
  
      <div id="datathree" style="width: 100%; height: 300px;"></div>
    </el-card>
</template>

<script setup>

import { onMounted } from "vue";
import * as echarts from "echarts";
import "echarts-gl";

var myChart = null;
onMounted(() => {

    var chartDom = document.getElementById('datathree');
    var myChart = echarts.init(chartDom);
    var option;

    const data = [];
    for (let i = 0; i < 5; ++i) {
    data.push(Math.round(Math.random() * 200));
    }
    option = {
    xAxis: {
        max: 'dataMax'
    },
    yAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 5 // only the largest 3 bars will be displayed
    },
    series: [
        {
        realtimeSort: true,
        name: '实验层AB总量',
        type: 'bar',
        data: data,
        label: {
            show: true,
            position: 'right',
            valueAnimation: true
        }
        }
    ],
    legend: {
        show: true
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
    };
    function run() {
    for (var i = 0; i < data.length; ++i) {
        if (Math.random() > 0.9) {
        data[i] += Math.round(Math.random() * 2000);
        } else {
        data[i] += Math.round(Math.random() * 200);
        }
    }
    myChart.setOption({
        series: [
        {
            type: 'bar',
            data
        }
        ]
    });
    }
    setTimeout(function () {
    run();
    }, 0);
    setInterval(function () {
    run();
    }, 3000);

    option && myChart.setOption(option);

});


</script>