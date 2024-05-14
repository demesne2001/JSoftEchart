import React, { useEffect } from "react";
import * as echarts from 'echarts/dist/echarts.js';

const Barpol = () => {
    useEffect(()=>{
        defaultChart()
    },[])


    function defaultChart()
    {
      var dom = document.getElementById('chart-container');
      var myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });
      
      var option;
      
      option = {
        tooltip: {},
        angleAxis: [
          {
            type: 'category',
            polarIndex: 0,
            startAngle: 90,
            endAngle: 0,
            data: ['S1', 'S2', 'S3']
          },
          {
            type: 'category',
            polarIndex: 1,
            startAngle: -90,
            endAngle: -180,
            data: ['T1', 'T2', 'T3']
          }
        ],
        radiusAxis: [{ polarIndex: 0 }, { polarIndex: 1 }],
        polar: [{}, {}],
        series: [
          {
            type: 'bar',
            polarIndex: 0,
            data: [1, 2, 3],
            coordinateSystem: 'polar'
          },
          {
            type: 'bar',
            polarIndex: 1,
            data: [1, 2, 3],
            coordinateSystem: 'polar'
          }
        ]
      };
      
      if (option && typeof option === 'object') {
        myChart.setOption(option);
      }
      
      window.addEventListener('resize', myChart.resize);
    }
    return (
            <div id="chart-container"></div>
    );
};

export default Barpol;
