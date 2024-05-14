import React, { useEffect } from "react";
import * as echarts from 'echarts/dist/echarts.js';

const Pie = () => {
    useEffect(()=>{
        defaultChart()
    },[])
    
    function defaultChart()
    {
       var domm = document.getElementById('chart-container');
       let dom=domm
        if (dom !== null) {
            var myChart = echarts.init(dom, null, {
                renderer: 'canvas',
                useDirtyRect: false 
            });
    
            var option;
    
            option = {
              
                series: [
                    {
                      type: 'pie',
                      radius: ['20%', '100%'],
                      center: ['50%', '50%'],
                      roseType: 'radius',
                      emphasis: {
                        disabled: true,
                      },
                      label: {
                        show: false,
                      },
                      itemStyle: {
                        borderColor: 'white',
                        borderWidth: 4,
                      },
                      labelLine: {
                        show: false,
                      },
                      animationType: 'scale',
                      // animationDuration: opts.initialPieAnimation ? 500 : 0
                      animationDuration: 1000,
                      animationEasing: 'cubicOut',
                      animationDelay(idx) {
                        return (1 - idx / 8) * 500;
                      },
                      universalTransition: {
                        enabled: true,
                        seriesKey: 'point',
                      },
                      data:  [
                        { value: 40, name: 'rose 1' },
                        { value: 38, name: 'rose 2' },
                        { value: 32, name: 'rose 3' },
                        { value: 30, name: 'rose 4' },
                        { value: 28, name: 'rose 5' },
                        { value: 26, name: 'rose 6' },
                        { value: 22, name: 'rose 7' },
                        { value: 18, name: 'rose 8' }
                      ]
                    },
                  ],
              };
            if (option && typeof option === 'object') {
                myChart.setOption(option);
            }
    
            window.addEventListener('resize', myChart.resize);
        }
    }
    return (
            <div id="chart-container"></div>
    );
};

export default Pie;
