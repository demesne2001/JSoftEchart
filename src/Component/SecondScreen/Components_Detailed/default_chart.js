import React, { useRef } from 'react';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import { useState, useEffect, useContext } from 'react';
import contex from '../../contex/Contex';
import ReactApexChart from 'react-apexcharts';
import './../../Assets/css/Custom.css';
import axios from 'axios';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'

export default function Default_chart(props) {
    
    console.log(props)
    const contextData = useContext(contex);
    console.log(contextData)
    const [name, setName] = useState([]);
    const [id, setid] = useState([]);
    const [weight, setweight] = useState([])
    const checkref = useRef(null)
    const [data, setdata] = useState([])
    const [loader, setLoader] = useState(true);
    let input = contextData.defaultchart;
    console.log("input", input)
    const [flagSort, setflagSort] = useState('');
    const defaultImageData = {
        "strBranch": "",
        "strState": "",
        "strCity": "",
        "strRegionID": "",
        "strSubItem": "",
        "strItem": "",
        "strItemGroup": "",
        "strItemSubitem": "",
        "strDesignCodeID": "",
        "strSalesParty": "",
        "strSaleman": "",
        "strProduct": "",
        "strDesignCatalog": "",
        "strSaleAging": "",
        "strMonth": "",
        "strFinYear": "",
        "PageNo": 1,
        "PageSize": 5
    }

    useEffect(() => {
        if (props.graph !== '' && props.graph.group !== undefined) {
            fetchData()
        }
    }, [props])
    useEffect(() => {
        if (flagSort !== '') {
            // fetchSortData()
        }
    }, [flagSort])

    useEffect(() => {
       
        fetchData()
    }, [input])



    async function fetchData() {
       

        input = { ...input, ['Grouping']: props.graph.group };
        


        
        await post(input, API.CommonChart, {}, "post").then((res) => {
           
            console.log(res ,"defdata")

            if (res.data.lstResult !== 0) {


                let name = [];
                let weg = [];
                let id1 = [];
                for (let i = 0; i < res.data.lstResult.length; i++) {
                    if (res.data.lstResult[i][props.graph.column] !== null) {
                        name.push(res.data.lstResult[i][props.graph.column]);
                        weg.push(res.data.lstResult[i]['NetWeight']);
                        id1.push(res.data.lstResult[i][props.graph.columnID]);
                    }
                    else {
                        name.push('null');
                        weg.push(res.data.lstResult[i]['NetWeight']);
                        id1.push('-')
                    }
                }

                
                setName(name);
                setweight(weg);
                setid(id1);

                setLoader(false)
            }
        })


    }
   
    const series = [{
        data: weight
    }]
    const options = {
        chart: {
            type: 'bar',
            height: 350,
            events: {
                dataPointSelection: (event, chartContex, config) => {
                    if (id[config.dataPointIndex] !== null && id[config.dataPointIndex] !== undefined) {
                      
                        contextData.setchartImage({ ...defaultImageData, [props.graph.filter_key1]: contextData.defaultchart[props.graph.filter_key1], [props.graph.filter_key2]: (id[config.dataPointIndex]).toString() })
                    }
                }
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: name,
        },
        yaxis: {
            labels: {
                show: true,
                formatter: function (val) {
                    if (val.length > 7) {
                        return val.slice(0, 6) + "..."
                    } else {
                        return val
                    }
                }
            }
        },
        tooltip: {
            x: {
                formatter: function (val) {
                    return val
                }
            },
            y: {
                formatter: function (val) {
                    return val
                }
            }
        },

        responsive: [
            {
                breakpoint: 850,
                options: {
                    legend: {
                        position: "bottom"
                    }
                },
                breakpoint: 415,
                options: {

                    xaxis: {
                        categories: name,
                        labels: {
                            style: {
                                fontSize: "8px",

                            }

                        }


                    },
                }
            },
        ],
    }

    function flip() {
        if (document.getElementById("filp").style.transform === "rotateY(360deg)" || document.getElementById("filp").style.transform === "") {
            
            document.getElementById("filp").style.transform = "rotateY(180deg)"
        } else {
            
            document.getElementById("filp").style.transform = "rotateY(360deg)"
        }

    }
    document.getElementById("root").addEventListener("click", function (event) {
        
        if (event.target.className !== 'fa-solid fa-arrow-down-short-wide sort-icon-second-screen' && event.target.className !== 'fa-solid fa-ellipsis-vertical') {
            if (document.getElementById("myDropdowniconSecondScreen") !== null) {
                document.getElementById("myDropdowniconSecondScreen").style.display = "none"
                document.getElementById("sorticonsecondScreenDefault").style.display = "none"
            }
        }

    });

    function handleSorting() {
        document.getElementById("sorticonsecondScreenDefault").style.display === "block" ? document.getElementById("sorticonsecondScreenDefault").style.display = "none" : document.getElementById("sorticonsecondScreenDefault").style.display = "block";
        const tag_array = document.getElementsByClassName('dropdown-contenticon-second-screen')
        
        if (tag_array !== undefined) {
            for (let i = 0; i < tag_array.length; i++) {
                
                if (document.getElementsByClassName('dropdown-contenticon-second-screen')[i]['id'] !== 'sorticonsecondScreenDefault') {
                    document.getElementsByClassName('dropdown-contenticon-second-screen')[i].style.display = 'none';

                }
            }
        }
    }

    function handleclickSort(e) {
        if (e.target.id !== 'sorticonsecondScreenDefault' && e.target.id !== '') {
            setflagSort(e.target.id)
        }
    }

    async function fetchSortData() {
        var inputForSort = { ...input, 'SortByLabel': props.graph.column, 'SortBy': flagSort, ['Grouping']: props.graph.group }
        
        await post(inputForSort, API.CommonChart, {}, "post").then((res) => {
            
            if (res.data.lstResult !== 0) {


                let name = [];
                let weg = [];
                let id1 = [];
                for (let i = 0; i < res.data.lstResult.length; i++) {
                    if (res.data.lstResult[i][props.graph.column] !== null) {


                      

                        name.push(res.data.lstResult[i][props.graph.column]);
                        weg.push(res.data.lstResult[i]['NetWeight']);
                        id1.push(res.data.lstResult[i][props.graph.columnID]);
                    }
                    else {
                        name.push('null');
                        weg.push(res.data.lstResult[i]['NetWeight']);
                        id1.push(res.data.lstResult[i][props.graph.columnID])
                    }
                }
               
                setName(name);
                setweight(weg);
                setid(id1);
                setLoader(false)
            }
        })
    }

    let barHorizontal = {
        themeId: contextData.ThemeIndex,
        charttype: 'round-horizontal-bar',
        height: '400%',
        width: '100%',
        chartId: 'Default_chart_secondScreen',
        Xaxis: name,
        seriesdata: [
            {
                type: 'bar',
                colorBy: 'data',
                stack: 'total',
                label: {
                    show: false
                },
                emphasis: {
                    focus: 'series'
                },
                data: weight
            }
        ]
    }

    // let optionbar = {
    //     charttype: 'bar',
    //     height: '400%',
    //     width: '100%',
    //     chartId: '14',
    //     Xaxis: name,
    //     // color: ['red','black', '#444', '#fdd334','#778', '#123', '#076'],
    //     // Yaxis: lst2,
    //     series: [
    //         {
    //             type: 'bar',
    //             colorBy: 'item',
    //             barWidth: '60%',
    //             data: weight
    //         },
    //     ]
    // }

    function divonclick() {




        if (document.getElementsByClassName('component-4').length > 0) {

            console.log("Loggg",document.getElementsByClassName('al-Round-horizontal-bar')[0]['id'])
            if (document.getElementsByClassName('al-Round-horizontal-bar').length > 0) {


                if (id[document.getElementsByClassName('al-Round-horizontal-bar')[0]['id']] === '') {


                    contextData.setchartImage({ ...contextData.chartImage, [props.graph.filter_key2]: '-' })
                }

                else if (document.getElementsByClassName('al-Round-horizontal-bar')[0]['id']  && document.getElementsByClassName('al-Round-horizontal-bar')[0]['id'] !== null ) {

                    console.log("Id def", id)
                    contextData.setchartImage({ ...contextData.chartImage, [props.graph.filter_key2]: id[document.getElementsByClassName('al-Round-horizontal-bar')[0]['id']].toString() })

                }

            }


        }


      


    }

    

    return (
        <div>
            <div class="title-top-graphdetail-withoutcolor">
                <h5>{props.graph.componentName}</h5>
                <i className="fa-solid fa-arrow-down-short-wide sort-icon-second-screen" onClick={handleSorting} ></i>
            </div>
            <div id="sorticonsecondScreenDefault" className="dropdown-contenticon-second-screen" onClick={handleclickSort}>
                {flagSort === 'Label' ? <><a id='Label'>Sort by Branch ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by Branch ASC&nbsp;</a><hr className='custom-hr' /></>}
                {flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by Branch DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by Branch DESC&nbsp;</a><hr className='custom-hr' /></>}
                {flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
                {flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
            </div>
            {loader === false ?
                <div class="graphdetailcards graphdetail-secondcard" onClick={divonclick}>
                    <AlphaDashChart obj={JSON.parse(JSON.stringify(barHorizontal))} />
                    <div class="topimg-gd">
                        {/* <ReactApexChart options={options} series={series} type="bar" height={450} />  */}
                        
                    </div>
                </div> :
                <div class="graphdetailcards graphdetail-secondcard">
                    <div class="topimg-gd" style={{ height: 500 }}>
                        <div class="dot-spinner" style={{ margin: "auto", position: 'inherit' }} >
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}
