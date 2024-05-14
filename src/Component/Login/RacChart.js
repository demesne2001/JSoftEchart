import React, { useEffect } from "react";
import * as echarts from 'echarts/dist/echarts.js';

const RacChart = () => {
    useEffect(() => {
        defaultChart()
    }, [])

    function defaultChart() {
        var dom = document.getElementById('chart-container');
        var myChart = echarts.init(dom, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });
        var option;

        const data = [];
        for (let i = 0; i < 13; ++i) {
          data.push(Math.round(Math.random() * 200));
        }
       
        option = {
            xAxis: {
                max: 'dataMax'
            },
            yAxis: {
                type: 'category',
                data: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Diamond Princess', 'District of Columbia', 'Florida', 'Georgia', 'Grand Princess', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
                inverse: true,
                animationDuration: 300,
                animationDurationUpdate: 300,
                max: 13 // only the largest 3 bars will be displayed
            },
            series: [
                {
                    realtimeSort: true,
                    name: 'X',
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

        if (option && typeof option === 'object') {
            myChart.setOption(option);
        }

        window.addEventListener('resize', myChart.resize);
    }
    return (
        <div id="chart-container"></div>
    );
};

export default RacChart;
