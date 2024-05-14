import React, { useEffect } from "react";
import * as echarts from 'echarts/dist/echarts.js';

const Bar = () => {
    useEffect(()=>{
        defaultChart()
    },[])
    
    const defaultPalette = [
        '#5470c6',
        '#91cc75',
        '#fac858',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc'
      ];
    const pieData =[
        { value: 40, name: 'A' },
        { value: 32, name: 'B' },
        { value: 28, name: 'C' },
        { value: 24, name: 'D' },
        { value: 19, name: 'E' },
        { value: 15, name: 'F' },
        { value: 12, name: 'G' },
        { value: 10, name: 'H' },
      ]
    function defaultChart()
    {
        var dom = document.getElementById('chart-container');
        var myChart = echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        
        var option;
        
        option = {
            xAxis: {
                data: pieData.map((item) => item.name),
              },
              yAxis: {},
              textStyle: {
                fontFamily: "Open Sans Condensed', sans-serif",
              },
          series: [
            {
              type: 'bar',
              label: {
                show: false,
              },
              animationEasingUpdate: 'circularInOut',
              animationDurationUpdate: 800,
              universalTransition: {
                enabled: true,
                seriesKey: 'point',
                delay: (idx, count) => {
                  // return count === 1 ? 0 : (1 - idx / count) * 1000;
                  return Math.random() * 1000;
                },
              },
              itemStyle: {},
              data: pieData.map((item, idx) => {
                return {
                  value: item.value,
                  groupId: item.name,
                  itemStyle: {
                    color: defaultPalette[idx % defaultPalette.length],
                  },
                };
              }),
            },
          ],
        };
        
        if (option && typeof option === 'object') {
          myChart.setOption(option);
        }
        
        window.addEventListener('resize', myChart.resize);
    }
    
    return (
            <div id="chart-container" ></div>
    );
};

export default Bar;
