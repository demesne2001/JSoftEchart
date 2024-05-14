import { useContext, useEffect, useState } from 'react'
import Gradient from "javascript-color-gradient";
import img from '../../Assets/icons8-person-48.png'
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
import { useNavigate } from 'react-router-dom';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'


export default function PurchasePartyWise() {


  const navigate = useNavigate()
  const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()
  const [loader, setLoader] = useState(true)
  const [dataloader, setdataLoader] = useState(true)
  const [imagearr, setImageArr] = useState([])
  const [sales, setSales] = useState([])
  const [flag, setflag] = useState()
  const [flagSort, setflagSort] = useState('')
  const ChartType = "donut"
  const [optionId, setOptionId] = useState()
  const [demo, setdemo] = useState("bar")
  const contexData = useContext(contex);
  const [name, setName] = useState([])
  const [weight, setweight] = useState([])
  let inputdata = contexData.state;
  const [data, setdata] = useState([])
  function handleclick(e) {
    if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconbranch' && e.target.id !== '') {
      setflag(e.target.id)
      setdemo(e.target.className)
    }
  }

  function setMargin() {
    if (weight.length < 7) {
      return 80
    } else {
      return 30
    }
  }

  function handleNavigation() {
    navigate('/graph-detail', { state: { grouping: "g.DesigncodeID,g.DesignCode", columnName: "DesignCode", columnID: "DesigncodeID", componentName: "Design Wise", filterKey: "strPurchaseParty", chartId: 9 }, replace: true })
  }

  useEffect(() => {
    fetchOption()
    getdata()

  }, [inputdata])

  useEffect(() => {
    if (flagSort !== '') {
      fetchSortData()
    }
  }, [flagSort])


  useEffect(() => {
    imagepoint()

  }, [imagearr])

  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'g.DesigncodeID,g.DesignCode', ['SortByLabel']: 'DesignCode' }

    await post(inputdata, API.CommonChart, {}, 'post')
      .then((res) => {
        let sale = [];
        var js = {};
        let name = [];
        let weight = [];
        let data = []
        for (let index = 0; index < res.data.lstResult.length; index++) {
          data.push({ value: res.data.lstResult[index][inputdata['column']], name: res.data.lstResult[index]['DesignCode'] })
				
          if (res.data.lstResult[index]['DesignCode'] === null) {
            name.push("null")
          } else {
            name.push(res.data.lstResult[index]['DesignCode'])
          }
          weight.push(res.data.lstResult[index][inputdata['column']])

          js = { 'product': '', 'thisYearProfit': 0 }
          if (res.data.lstResult[index]['DesignCode'] === null) {
            js['product'] = 'null'
          } else {
            js['product'] = res.data.lstResult[index]['DesignCode']
          }
          js['thisYearProfit'] = res.data.lstResult[index][inputdata['column']]

          sale.push(js)


        }
        var j = []
        for (let index = 0; index < sale.length; index++) {
          j.push({ ...sale[index], ['color']: gradientArray[index] })
        }

        setdata(data)
        setName(name)
        setweight(weight)
        setSales(j)
        setdataLoader(false)
        if (weight.length !== 0) {
          setLoader(false)
        } else {
          setLoader(true)
        }

        inputdata = { ...inputdata, ['Grouping']: '' }
      })
  }

  function imagepoint() {

    let temp = []

    for (let index = 0; index < weight.length; index++) {

      temp.push({

        x: name[index],
        y: weight[index],
        marker: {
          size: 15,
        },
        image: {
          path: img,
        }

      })
    }

  }

  function handleonchangeCurrency() {

    document.getElementById("myDropdowniconPurchase").style.display === "block" ? document.getElementById("myDropdowniconPurchase").style.display = "none" : document.getElementById("myDropdowniconPurchase").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')
    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {

        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconPurchase') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }

  document.getElementById("root").addEventListener("click", function (event) {

    if (event.target.className !== 'dropbtn icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
      if (document.getElementById("myDropdowniconPurchase") !== null) {
        document.getElementById("myDropdowniconPurchase").style.display = "none"
        document.getElementById("sorticonDesign").style.display = "none"
      }
    }

  });

  async function fetchOption() {
    await post({ "ID": 9, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

      .then((res) => {
        if (res.data.lstResult.length === 0) {
          setflag(ChartType)

          post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 9, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
            .then((res) => {
              post({ "ID": 9, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
                .then((res) => {
                  setOptionId(res.data.lstResult[0].ChartOptionID)
                })
              alert(res.data.Message)
            })

        }
        else {
          setOptionId(res.data.lstResult[0].ChartOptionID)
          setflag(res.data.lstResult[0].ChartOption)
        }

      })
  }

  async function addEditOption() {

    await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 9, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
      .then((res) => {
        document.getElementById('myDropdowniconPurchase').style.display = 'none'
        alert(res.data.Message)

      })
  }

  function handleSorting() {
    document.getElementById("sorticonDesign").style.display === "block" ? document.getElementById("sorticonDesign").style.display = "none" : document.getElementById("sorticonDesign").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')

    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {
        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonDesign') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }

  function handleclickSort(e) {
    if (e.target.id !== 'sorticonDesign' && e.target.id !== '') {
      setflagSort(e.target.id)
    }
  }

  async function fetchSortData() {
    var inputForSort = { ...inputdata, 'SortByLabel': 'DesignCode', 'SortBy': flagSort, ['Grouping']: 'g.DesigncodeID,g.DesignCode' }

    await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
      let sale = [];
      var js = {};
      let name = [];
      let weight = [];
      let data = []
      for (let index = 0; index < res.data.lstResult.length; index++) {
        data.push({ value: res.data.lstResult[index][inputdata['column']], name: res.data.lstResult[index]['DesignCode'] })
				
        if (res.data.lstResult[index]['DesignCode'] === null) {
          name.push("null")
        } else {
          name.push(res.data.lstResult[index]['DesignCode'])
        }
        weight.push(res.data.lstResult[index][inputdata['column']])

        js = { 'product': '', 'thisYearProfit': 0 }
        if (res.data.lstResult[index]['DesignCode'] === null) {
          js['product'] = 'null'
        } else {
          js['product'] = res.data.lstResult[index]['DesignCode']
        }
        js['thisYearProfit'] = res.data.lstResult[index][inputdata['column']]

        sale.push(js)


      }
      var j = []
      for (let index = 0; index < sale.length; index++) {
        j.push({ ...sale[index], ['color']: gradientArray[index] })
      }

      setdata(data)
      setName(name)
      setweight(weight)
      setSales(j)
      setdataLoader(false)
      if (weight.length !== 0) {
        setLoader(false)
      } else {
        setLoader(true)
      }

      inputdata = { ...inputdata, ['Grouping']: '' }
    })
  }

  let roundbar = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'roundbar',
    height: '400px',
    chartId: 'designwise',
    width: '100%',
    Xaxis: name,
    seriesdata: [
      {
        data: weight,
        colorBy: 'data',
        type: 'bar',
        stack: 'a',
      }
    ]
  }
  let radialdata = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'polar-radialbar',
    height: '100%',
    width: '100%',
    chartId: 'designwise',
    radiusAxis: name,
    seriesdata: weight,
  }
  let optiondonut = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'donut',
    height: '100%',
    width: '100%',
    chartId: 'designwise',
    propdata: data,
    radius: [10, 150],
    label: {
      position: 'inside',
      formatter: '{d}%',
      color: 'white',
      fontWeight: 'bold',
    },

  }

  let optionpie = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'simplepie',
    height: '100%',
    width: '100%',
    propdata: data,
    chartId: 'PieChartdesignwise',
    label: {
      position: 'inside',
      formatter: '{d}%',
      color: 'white',
      fontWeight: 'bold',
    },
  }
  let optradialbar = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'radialbar',
    height: '100%',
    width: '100%',
    chartId: 'RadialBarchartdesignwise',
    propdata: data,
    position: 'center',
    fontsize: 20,
    label: {
      position: 'inside',
      formatter: '{d}%',
      color: 'white',
      fontWeight: 'bold',
    },
  }


  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="graph-card">
        <div className="card-title-graph">
          <div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
            <p><i className="fas fa-people-carry"></i> Design Wise</p>
          </div>

          <div className="col-sm-2 col-md-2 col-2">
            <i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} ></i>

            <div id="sorticonDesign" className="dropdown-contenticon" onClick={handleclickSort}>
              {flagSort === 'Label' ? <><a id='Label'>Sort by Design ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by Design ASC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by Design DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by Design DESC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
              {flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
            </div>
            <img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img>
            <div className='btnicons'>
              <div id="myDropdowniconPurchase" className="dropdown-contenticon" onClick={handleclick}>
                {flag === 'bar' ? <><a id='bar' className='bar'>Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' className='bar'>bar</a><hr className='custom-hr' /></>}
                {flag === 'donut' ? <><a id='donut' className='donut'>Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut' className='donut'>Donut</a><hr className='custom-hr' /></>}
                {flag === 'radialBar' ? <><a id='radialBar' className='radialBar'>Radial Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='radialBar' className='radialBar'>Radial Bar</a><hr className='custom-hr' /></>}
                {flag === 'pie' ? <><a id='pie' className='pie'>Pie Chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='pie' className='pie'>Pie chart </a><hr className='custom-hr' /></>}
                {flag === 'semidonut' ? <><a id='semidonut' className='semidonut'>Semi Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='semidonut' className='semidonut'>Semi Donut </a><hr className='custom-hr' /></>}

                {/* {flag === 'heatmap' ? <><a id='heatmap' className='heatmap'>Heat map&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='heatmap' className='heatmap'>Heat map </a><hr className='custom-hr' /></>} */}
                <button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
              </div>
            </div>
          </div>
        </div>

        {dataloader !== true ?
          loader !== true ?
            <div className="crancy-progress-card card-contain-graph">
              {flag === 'donut' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optiondonut))} /> : null}
              {flag === 'radialBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(radialdata))} /> : null}
              {flag === 'pie' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionpie))} /> : null}
              {flag === 'semidonut' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optradialbar))} /> : null}

              {flag === 'bar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(roundbar))} /> : null}
              {flag === 'heatmap' ?
                <table align='center' rules='rows' border='white' style={{ border: 'white', marginTop: setMargin() }}>
                  <tr>
                    <th>DesignCode</th>
                    <th>NetWeight</th>
                  </tr>


                  {sales.map((data) => {
                    return (
                      <tr >
                        <td style={{ backgroundColor: data.color, width: 250, color: 'white' }}>{data.product} </td>
                        <td style={{ backgroundColor: data.color, width: 250, color: 'white' }}>{data.thisYearProfit}</td>
                      </tr>
                    )
                  })}

                </table> : null}
            </div> :
            <div className="crancy-progress-card card-contain-graph"  >
              Not Found
            </div>
          :
          <div className="crancy-progress-card card-contain-graph">
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
        }
      </div>
    </div>
  )
}
