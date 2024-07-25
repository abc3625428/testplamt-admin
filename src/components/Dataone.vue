<template>
    <div id="mamain" style="width: 100%; height: 300px"></div>
</template>

<script setup>


import * as echarts from 'echarts';
import { onMounted } from "vue";



var myChart = null;
onMounted(() => {

    var chartDom = document.getElementById('mamain');
    var myChart = echarts.init(chartDom);
    var option;

    const res0 = [
    {
        "code": "AD",
        "emoji": "🇦🇩",
        "unicode": "U+1F1E6 U+1F1E9",
        "name": "Andorra",
        "title": "flag for Andorra",
        "dialCode": "+376"
    },
    {
        "code": "AE",
        "emoji": "🇦🇪",
        "unicode": "U+1F1E6 U+1F1EA",
        "name": "United Arab Emirates",
        "title": "flag for United Arab Emirates",
        "dialCode": "+971"
    },
    {
        "code": "AF",
        "emoji": "🇦🇫",
        "unicode": "U+1F1E6 U+1F1EB",
        "name": "Afghanistan",
        "title": "flag for Afghanistan",
        "dialCode": "+93"
    },
    ]

    const res1 = [["Income","Life Expectancy","Population","Country","Year"],[1314,39,645526,"Canada",1800],[985,32,321675013,"China",1800],[1803,33.96717024,29355111,"France",1800]]

    const updateFrequency = 2000;
    const dimension = 0;
    const countryColors = {
    Canada: '#f00',
    China: '#ffde00',
    France: '#ed2939',
    };

  
    const flags = res0[0];
    const data = res1[0];
    const years = [];
    for (let i = 0; i < data.length; ++i) {
        if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
        years.push(data[i][4]);
        }
    }
    function getFlag(countryName) {
        if (!countryName) {
        return '';
        }
        return (
        flags.find(function (item) {
            return item.name === countryName;
        }) || {}
        ).emoji;
    }
    let startIndex = 10;
    let startYear = years[startIndex];
    option = {
        grid: {
        top: 10,
        bottom: 30,
        left: 150,
        right: 80
        },
        xAxis: {
        max: 'dataMax',
        boundaryGap: false,
        axisLabel: {
            formatter: function (n) {
            return Math.round(n) + '';
            }
        }
        },
        dataset: {
        source: data.slice(1).filter(function (d) {
            return d[4] === startYear;
        })
        },
        yAxis: {
        type: 'category',
        inverse: true,
        max: 10,
        axisLabel: {
            show: true,
            fontSize: 14,
            formatter: function (value) {
            return value + '{flag|' + getFlag(value) + '}';
            },
            rich: {
            flag: {
                fontSize: 25,
                padding: 5
            }
            }
        },
        animationDuration: 300,
        animationDurationUpdate: 300
        },
        series: [
        {
            realtimeSort: true,
            seriesLayoutBy: 'column',
            type: 'bar',
            itemStyle: {
            color: function (param) {
                return countryColors[param.value[3]] || '#5470c6';
            }
            },
            encode: {
            x: dimension,
            y: 3
            },
            label: {
            show: true,
            precision: 1,
            position: 'right',
            valueAnimation: true,
            fontFamily: 'monospace'
            }
        }
        ],
        // Disable init animation.
        animationDuration: 0,
        animationDurationUpdate: updateFrequency,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        graphic: {
        elements: [
            {
            type: 'text',
            right: 160,
            bottom: 60,
            style: {
                text: startYear,
                font: 'bolder 80px monospace',
                fill: 'rgba(100, 100, 100, 0.25)'
            },
            z: 100
            }
        ]
        }
    };
    // console.log(option);
    myChart.setOption(option);
    for (let i = startIndex; i < years.length - 1; ++i) {
        (function (i) {
        setTimeout(function () {
            updateYear(years[i + 1]);
        }, (i - startIndex) * updateFrequency);
        })(i);
    }
    function updateYear(year) {
        let source = data.slice(1).filter(function (d) {
        return d[4] === year;
        });
        option.series[0].data = source;
        option.graphic.elements[0].style.text = year;
        myChart.setOption(option);
    }
    

    option && myChart.setOption(option);

});

</script>