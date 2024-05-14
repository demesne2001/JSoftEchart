import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import { useState, useEffect, useContext } from 'react';
import contex from '../../contex/Contex';
import './../../Assets/css/Custom.css';
import symbol_path from '../../ChartOptions/Symbol_path';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'



export default function Main_chart(props) {

    const contextData = useContext(contex);

    const [name, setName] = useState([])
    const [id, setId] = useState([])
    const [weight, setweight] = useState([])
    const [tempweight, settempweight] = useState([])
    const [data, setdata] = useState([])
    const [flag, setFlag] = useState('donut');
    const [flagSort, setflagSort] = useState('');
    const [flagShowId, setFlagShowId] = useState(true)
    const [componentName, setComponentName] = useState('')
    let input = contextData.state;
    console.log("Main", input)
    const [loader, setLoader] = useState(true);

    const [bardata, setBardata] = useState({})


    useEffect(() => {
        setComponentName(props.state.componentName)

        if (props.state.columnName === props.state.columnID) {
            setFlagShowId(false)
        }

    }, [])

    useEffect(() => {

        setweight(tempweight)
        fetchData()
    }, [flag])



    async function fetchData() {



        input = { ...input, ['Grouping']: props.state.grouping };


        await post(input, API.GetDetailCommanChart, {}, "post").then((res) => {

            let name1 = [];
            let weg = [];
            let id1 = [];
            let data = [];


            if (res.data.lstResult.length !== 0) {

                for (let i = 0; i < res.data.lstResult.length; i++) {

                    data.push({
                        name: res.data.lstResult[i][props.state.columnName] ? res.data.lstResult[i][props.state.columnName] : 'null'
                        , value: res.data.lstResult[i]['NetWeight']
                    })
                    name1.push(res.data.lstResult[i][props.state.columnName] ? res.data.lstResult[i][props.state.columnName] : 'null');
                    weg.push(res.data.lstResult[i]['NetWeight']);
                    id1.push(res.data.lstResult[i][props.state.columnID]);

                }

                setBardata({
                    name: name1,
                    weight: weg
                })

                setdata(data)
                setName(name1);
                setweight(weg);
                settempweight(weg);
                setId(id1)
                setLoader(false)


            }
        })

    }


    function flip() {
        if (document.getElementById("filp").style.transform === "rotateY(360deg)" || document.getElementById("filp").style.transform === "") {

            document.getElementById("filp").style.transform = "rotateY(180deg)"
        } else {

            document.getElementById("filp").style.transform = "rotateY(360deg)"
        }

    }

    function handleChartSelect(e) {

        if (flag !== e.target.id) {
            setFlag(e.target.id)
        }
    }



    function handledropdownMenu() {
        document.getElementById("myDropdowniconSecondScreen").style.display === "block" ? document.getElementById("myDropdowniconSecondScreen").style.display = "none" : document.getElementById("myDropdowniconSecondScreen").style.display = "block";
        const tag_array = document.getElementsByClassName('dropdown-contenticon-second-screen')

        if (tag_array !== undefined) {
            for (let i = 0; i < tag_array.length; i++) {

                if (document.getElementsByClassName('dropdown-contenticon-second-screen')[i]['id'] !== 'myDropdowniconSecondScreen') {
                    document.getElementsByClassName('dropdown-contenticon-second-screen')[i].style.display = 'none';

                }
            }
        }
    }

    document.getElementById("root").addEventListener("click", function (event) {

        if (event.target.className !== 'fa-solid fa-arrow-down-short-wide sort-icon-second-screen' && event.target.className !== 'fa-solid fa-ellipsis-vertical') {
            if (document.getElementById("myDropdowniconSecondScreen") !== null) {
                document.getElementById("myDropdowniconSecondScreen").style.display = "none"
                document.getElementById("sorticonsecondScreen").style.display = "none"
            }
        }

    });

    function handleSorting() {
        document.getElementById("sorticonsecondScreen").style.display === "block" ? document.getElementById("sorticonsecondScreen").style.display = "none" : document.getElementById("sorticonsecondScreen").style.display = "block";
        const tag_array = document.getElementsByClassName('dropdown-contenticon-second-screen')

        if (tag_array !== undefined) {
            for (let i = 0; i < tag_array.length; i++) {

                if (document.getElementsByClassName('dropdown-contenticon-second-screen')[i]['id'] !== 'sorticonsecondScreen') {
                    document.getElementsByClassName('dropdown-contenticon-second-screen')[i].style.display = 'none';

                }
            }
        }
    }

    function handleclickSort(e) {
        if (e.target.id !== 'sorticonsecondScreen' && e.target.id !== '') {
            setflagSort(e.target.id)
        }
    }


    let pathSymbols = symbol_path()

    let symbol = {
        themeId: contextData.ThemeIndex,
        height: '100%',
        width: '100%',
        charttype: 'SymbolBar',
        chartId: '66',
        pathsymbol: pathSymbols,
        symbolSize: ['80%', '60%'],
        bar1: [
            {
                value: 184,
                symbol: pathSymbols.reindeer
            },
            {
                value: 29,
                symbol: pathSymbols.ship
            },
            {
                value: 73,
                symbol: pathSymbols.plane
            },
            {
                value: 91,
                symbol: pathSymbols.train
            },
            {
                value: 95,
                symbol: pathSymbols.car
            },
            {
                value: 102,
                symbol: pathSymbols.train
            },
        ],

    }

    let datapie = [
        ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
        ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
        ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
        ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
        ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
    ]


    let myseries = [
        {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
        },
        {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
        },
        {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
        },
        {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
        },
        {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],
            emphasis: {
                focus: 'self'
            },
            label: {
                formatter: '{b}: {@2012} ({d}%)'
            },
            encode: {
                itemName: 'product',
                value: '2012',
                tooltip: '2012'
            }
        }
    ]



    let line_pie = {
        themeId: contextData.ThemeIndex,
        height: '100%',
        width: '100%',
        chartId: 'pie-line',
        charttype: 'animation-pie-line',
        dataset: datapie,
        series: myseries

    }


    // const barHorizontal = {
    //     charttype: 'round-horizontal-bar',
    //     height: '100%',
    //     chartId: 'Main_chart_secondScreen',
    //     width: '100%',
    //     Xaxis: name,
    //     seriesdata: [
    //         {
    //             type: 'bar',
    //             colorBy: 'data',
    //             stack: 'total',
    //             label: {
    //                 show: false
    //             },
    //             emphasis: {
    //                 focus: 'series'
    //             },
    //             data: weight
    //         }
    //     ]
    // }

    const barHorizontal = {
        themeId: contextData.ThemeIndex,
        charttype: 'round-horizontal-bar',
        height: '100%',
        chartId: 'Main_chart_secondScreen',
        width: '100%',
        Xaxis: bardata.name,
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
                data: bardata.weight
            }
        ]
    }

    const donutoption = {
        themeId: contextData.ThemeIndex,
        charttype: 'donut',
        height: '100%',
        width: '100%',
        chartId: 'Main_chart_secondScreen',
        propdata: data,
        radius: [10, 150],
        fontsize: 13,
        label: {
            show: true,
            position: 'outside',
            fontStyle: 'bold',
            fontsize: 10,
            formatter: '{b} ({d}%)',

        },
        labelLine: {
            show: true
        },

    }


    function divonclick() {

        if (document.getElementsByClassName('component-3').length > 0) {

            if (document.getElementsByClassName('al-donut').length > 0) {


                if (id[document.getElementsByClassName('al-donut')[0]['id']] === '') {


                    contextData.setDefaultChart({ ...contextData.defaultchart, [props.state.filterKey]: '-' })
                }

                else if (document.getElementsByClassName('al-donut')[0]['id']) {


                    contextData.setDefaultChart({ ...contextData.defaultchart, [props.state.filterKey]: id[document.getElementsByClassName('al-donut')[0]['id']].toString() })

                }

            }

        }

        else if (document.getElementsByClassName('component-4').length > 0) {

            if (document.getElementsByClassName('al-Round-horizontal-bar').length > 0) {

                if (id[document.getElementsByClassName('al-Round-horizontal-bar')[0]['id']] === '') {

                    contextData.setDefaultChart({ ...contextData.defaultchart, [props.state.filterKey]: '-' })
                }

                else if (document.getElementsByClassName('al-Round-horizontal-bar')[0]['id']) {


                    contextData.setDefaultChart({ ...contextData.defaultchart, [props.state.filterKey]: id[document.getElementsByClassName('al-Round-horizontal-bar')[0]['id']].toString() })

                }
            }
        }
    }


    return (
        <div>

            <div class="title-top-graphdetail">
                <h5>
                    {componentName}

                    <button id='dropdownbutton' class="fa-solid fa-ellipsis-vertical" style={{ right: '64px', height: '10px', position: 'absolute' }} onClick={handledropdownMenu} ></button>
                    {/* <i className="fa-solid fa-arrow-down-short-wide sort-icon-second-screen" onClick={handleSorting} ></i> */}
                </h5>
            </div>

            <div id="sorticonsecondScreen" className="dropdown-contenticon-second-screen" onClick={handleclickSort}>
                {flagSort === 'Label' ? <><a id='Label'>Sort by Branch ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by Branch ASC&nbsp;</a><hr className='custom-hr' /></>}
                {flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by Branch DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by Branch DESC&nbsp;</a><hr className='custom-hr' /></>}
                {flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
                {flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
            </div>

            <div id="myDropdowniconSecondScreen" className="dropdown-contenticon-second-screen" onClick={handleChartSelect}>

                {flag === 'bar' ? <><a id='bar'> Bar &nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar'>Bar</a><hr className='custom-hr' /> </>}
                {flag === 'donut' ? <><a id='donut'>Donut &nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut'>Donut</a><hr className='custom-hr' /></>}
                {/* {flag === 'symbol' ? <><a id='symbol'> symbol &nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='symbol'>symbol</a><hr className='custom-hr' /> </>} */}
                {/* {flag === 'radialBar'} ?<><a id='radialBar'>Radial Bar &nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr'/></> : <><a id='radialBar'>Radial Bar</a><hr className='custom-hr'/></> */}
                {flag === 'pie-line' ? <><a id='pie-line'> pie-line &nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='pie-line'>pie-line</a><hr className='custom-hr' /> </>}
            </div>





            <div class="flip-card">

                <div class="flip-card-inner" id='filp'>
                    <div class="flip-card-front">


                    </div>
                    <div class="flip-card-back">
                        <div class="" style={{ height: '600px' }} onClick={divonclick}>
                            {loader === false ?
                                <>

                                    {flag === 'bar' ?

                                        <AlphaDashChart obj={JSON.parse(JSON.stringify(barHorizontal))} />
                                        : null}
                                    {flag === 'donut' ?
                                        <AlphaDashChart obj={donutoption} />
                                        : null}
                                    {flag === 'symbol' ?
                                        <AlphaDashChart obj={symbol} />
                                        : null}
                                    {flag === 'pie-line' ?
                                        <AlphaDashChart obj={line_pie} />
                                        : null}

                                </>
                                :
                                <div class="dot-spinner" style={{ margin: "auto", position: 'inherit' }} >
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>

                                </div>}</div>
                    </div>
                </div>
            </div>


        </div>
    )
}


