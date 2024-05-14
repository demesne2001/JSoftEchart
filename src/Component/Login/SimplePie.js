import React, { useEffect } from "react";
import * as echarts from 'echarts/dist/echarts.js';

const SimplePie = () => {  
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
                tooltip: {
                  trigger: 'item'
                },
                legend: {
                  top: '5%',
                  left: 'center'
                },
                series: [
                  {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                      borderRadius: 10,
                      borderColor: '#fff',
                      borderWidth: 2
                    },
                    label: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                      }
                    },
                    labelLine: {
                      show: false
                    },
                    data: [
                      { value: 1048, name: 'Search Engine' },
                      { value: 735, name: 'Direct' },
                      { value: 580, name: 'Email' },
                      { value: 484, name: 'Union Ads' },
                      { value: 300, name: 'Video Ads' }
                    ]
                  }
                ]
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

export default SimplePie;
