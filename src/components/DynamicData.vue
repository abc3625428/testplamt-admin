
<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex justify-between">
        <span class="flex justify-between justify-center text-sm">实时数据</span>
      </div>
    </template>

    <div id="dynamicdata" style="width: 100%; height: 300px"></div>
  </el-card>
</template>
  
<script setup>

import { onMounted } from "vue";
import * as echarts from "echarts";
import "echarts-gl";

var myChart = null;
onMounted(() => {
  var app = {};
  var chartDom = document.getElementById("dynamicdata");
  var myChart = echarts.init(chartDom);
  var option;

  const categories = (function () {
    let now = new Date();
    let res = [];
    let len = 10;
    while (len--) {
      res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
      now = new Date(+now - 2000);
    }
    return res;
  })();
  const categories2 = (function () {
    let res = [];
    let len = 10;
    while (len--) {
      res.push(10 - len - 1);
    }
    return res;
  })();

  const data = (function (){
    let res = [];
    let len = 10;
    while (len--) {
      res.push(Math.round(Math.random() * 1000));
    }
    return res;
  })();
  const data2 = (function () {
    let res = [];
    let len = 0;
    while (len < 10) {
      res.push(+(Math.random() * 10 + 5).toFixed(1));
      len++;
    }
    return res;
  })();
  option = {
    title: {
      text: "Data",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#283b56",
        },
      },
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: true,
        data: categories,
      },
      {
        type: "category",
        boundaryGap: true,
        data: categories2,
      },
    ],
    yAxis: [
      {
        type: "value",
        scale: true,
        name: "Price",
        max: 30,
        min: 0,
        boundaryGap: [0.2, 0.2],
      },
      {
        type: "value",
        scale: true,
        name: "Order",
        max: 1200,
        min: 0,
        boundaryGap: [0.2, 0.2],
      },
    ],
    series: [
      {
        name: "Dynamic Bar",
        type: "bar",
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data,
      },
      {
        name: "Dynamic Line",
        type: "line",
        data: data2,
      },
    ],
  };
  app.count = 11;
  setInterval(function () {
    let axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");
    data.shift();
    data.push(Math.round(Math.random() * 1000));
    data2.shift();
    data2.push(+(Math.random() * 10 + 5).toFixed(1));
    categories.shift();
    categories.push(axisData);
    categories2.shift();
    categories2.push(app.count++);
    myChart.setOption({
      xAxis: [
        {
          data: categories,
        },
        {
          data: categories2,
        },
      ],
      series: [
        {
          data: data,
        },
        {
          data: data2,
        },
      ],
    });
  }, 2100);

  option && myChart.setOption(option);
});
</script>