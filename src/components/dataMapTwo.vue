

<template>
    <el-card shadow="never">
      <template #header>
        <div class="flex justify-between">
          <span class="flex justify-between justify-center text-sm">饼图数据</span>
        </div>
      </template>
  
      <div id="datatwo" style="width: 100%; height: 300px;"></div>
    </el-card>
  </template>


<script setup>

import { onMounted } from "vue";
import * as echarts from "echarts";
import "echarts-gl";

var myChart = null;
onMounted(() => {

    var chartDom = document.getElementById('datatwo');
    var myChart = echarts.init(chartDom);
    var option;

    // const data = genData1();
    const data = genData(15);
    // console.log(data)

    option = {
    title: {
        text: '分布统计',
        subtext: '',
        left: 'left'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: data.legendData
    },
    series: [
        {
        name: '姓名',
        type: 'pie',
        radius: '55%',
        center: ['40%', '50%'],
        data: data.seriesData,
        emphasis: {
            itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
        }
    ]
    };
    function genData(count) {
    // prettier-ignore
    const nameList = [
            '御','弟','哥','哥'
        ];
    const dataList = [
            '接口','UI','策略','性能'
        ];

    const legendData = [];
    const seriesData = [];
    for (var i = 0; i < count; i++) {
        var name =
        Math.random() > 0.65
            ? makeWord(1, 1) + '·' + makeWord(1, 1)
            : makeWord(1, 1);
        legendData.push(name);
        seriesData.push({
        name: name,
        value: Math.round(Math.random())
        });
    }
    return {
        legendData: legendData,
        seriesData: seriesData
    };

    function makeWord(max, min) {
        const nameLen = Math.ceil(Math.random() * max + min);
        const name = [];
        for (var i = 0; i < nameLen; i++) {
        name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
        }
        return name.join('');
    }};
    function genData1() {
    
    const legendData = [
        {0:'接口'},{1:'UI'},{2:'策略'},{3:'性能'}
    ];
    const seriesData = [
    {name: '接口', value: 1},
    {name: 'UI', value: 2},
    {name: '策略', value: 3},
    {name: '性能', value: 4},
    ];

    return {
    legendData: legendData,
    seriesData: seriesData
    }};

    option && myChart.setOption(option);
});




</script>