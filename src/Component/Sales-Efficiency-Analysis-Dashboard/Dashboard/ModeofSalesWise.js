import { useContext } from 'react'
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import drop from '../../Assets/img/svg/dropdown.svg'
import { useEffect, useState } from 'react';
import contex from '../../contex/Contex';
import { useNavigate } from 'react-router-dom';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'

export default function ModeofSalesWise() {


  const contexData = useContext(contex);
  const [flag, setflag] = useState()
  const [flagSort, setflagSort] = useState('')
  const [optionId, setOptionId] = useState()
  let inputdata = contexData.state;
  const ChartType = "semiDonut"
  const [loader, setLoader] = useState(true)
  const [dataloader, setdataLoader] = useState(true)
  const navigate = useNavigate()
  const [data, setData] = useState()


  useEffect(() => {
    fetchOption()
    getdata()
  }, [inputdata])

  useEffect(() => {
		if (flagSort !== '') {
			fetchSortData()
		}
	}, [flagSort])

  async function fetchOption() {
    await post({ "ID": 17, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

      .then((res) => {
        if (res.data.lstResult.length === 0) {
          setflag(ChartType)

          post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 17, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
            .then((res) => {
              post({ "ID": 17, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
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

    await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 17, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
      .then((res) => {

        document.getElementById('myDropdowniconModeOfSales').style.display = 'none'
        alert(res.data.Message)

      })
  }

  function handleonchangeCurrency() {
    document.getElementById("myDropdowniconModeOfSales").style.display === "block" ? document.getElementById("myDropdowniconModeOfSales").style.display = "none" : document.getElementById("myDropdowniconModeOfSales").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')
    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {

        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconModeOfSales') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }


  function handleclick(e) {



    if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconModeOfSales' && e.target.id !== '') {

      setflag(e.target.id)
    }
    else {

    }

  }

  document.getElementById("root").addEventListener("click", function (event) {

    if (event.target.className !== 'dropbtn icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
      if (document.getElementById("myDropdowniconModeOfSales") !== null) {
        document.getElementById("myDropdowniconModeOfSales").style.display = "none"
        document.getElementById("sorticonModeOfScale").style.display = "none"
      }
    }

  });

  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'a.ChallanGenerateTypeID,N.ChallanGenerateType',['SortByLabel']:'ChallanGenerateType' }

    await post(inputdata, API.CommonChart, {}, 'post')
      .then((res) => {
        let name = [];
        let weight = [];
        let data = [];

       
        for (let index = 0; index < res.data.lstResult.length; index++) {
          if (res.data.lstResult[index]['ChallanGenerateType'] === null) {
            name.push("null")
            data.push({ name: "null", value: res.data.lstResult[index]['NetWeight'] })
          } else {
            name.push(res.data.lstResult[index]['ChallanGenerateType'])
            data.push({ name: res.data.lstResult[index]['ChallanGenerateType'], value: res.data.lstResult[index]['NetWeight'] })
          }
          weight.push(res.data.lstResult[index][inputdata['column']])
        }
        setData(data)
        // setName(name)
        // setweight(weight)
        setdataLoader(false)
        if (weight.length !== 0) {
          setLoader(false)
        } else {
          setLoader(true)
        }
        inputdata = { ...inputdata, ['Grouping']: '' }
      })
  }

  function handleNavigation() {
    navigate('/graph-detail', { state: { grouping: "a.ChallanGenerateTypeID,N.ChallanGenerateType", columnName: "ChallanGenerateType", columnID: "ChallanGenerateTypeID", componentName: "Mode of Sales Wise", chartId: 17 }, replace: true })
  }




  function handleSorting() {
    document.getElementById("sorticonModeOfScale").style.display === "block" ? document.getElementById("sorticonModeOfScale").style.display = "none" : document.getElementById("sorticonModeOfScale").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')

    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {
        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonModeOfScale') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }

  function handleclickSort(e) {
    if (e.target.id !== 'sorticonModeOfScale' && e.target.id !== '') {
      setflagSort(e.target.id)
    }
  }

  async function fetchSortData() {
    var inputForSort = { ...inputdata, 'SortByLabel': 'ChallanGenerateType', 'SortBy': flagSort, ['Grouping']: 'a.ChallanGenerateTypeID,N.ChallanGenerateType' }

    await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
      let name = [];
      let weight = [];
      let data = [];

      for (let index = 0; index < res.data.lstResult.length; index++) {
        if (res.data.lstResult[index]['ChallanGenerateType'] === null) {
          name.push("null")
          data.push({ name: "null", value: res.data.lstResult[index]['NetWeight'] })
        } else {
          name.push(res.data.lstResult[index]['ChallanGenerateType'])
          data.push({ name: res.data.lstResult[index]['ChallanGenerateType'], value: res.data.lstResult[index]['NetWeight'] })
        }
        weight.push(res.data.lstResult[index][inputdata['column']])
      }
      setData(data)
      // setName(name)
      // setweight(weight)
      setdataLoader(false)
      if (weight.length !== 0) {
        setLoader(false)
      } else {
        setLoader(true)
      }
      inputdata = { ...inputdata, ['Grouping']: '' }
    })
  }

  let opt_pie = {
    themeId: localStorage.getItem("ThemeIndex"),
    radius: '67%',
    charttype: 'customized-pie',
    height: '100%',
    width: '100%',
    chartId: 'customized-pie',
    propdata: data,
    // color: ['red']
}

  let optionpie = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'simplepie',
    height: '100%',
    width: '100%',
    propdata: data,
    chartId: 'Mode of Sale Wise',
    label: {
      position: 'inside',
      formatter: '{d}%',
      color: 'white',
      fontWeight: 'bold',
  },
  }

  let semiDonut = {
    themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'radialbar',
		height: '380px',
		width: '100%',
		chartId: 'Mode of Sale Wise',
		propdata: data,
    label: {
      show: true,
      position: 'outside',
      fontStyle: 'bold',
  },
	}

  return (
    <div className="col-lg-6 col-md-6 col-12">
      <div className="graph-card">
        <div className="card-title-graph">

          <div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation} >

            <p><i class="fas fa-chart-pie"></i> Mode of Sales Wise</p>

          </div>

          <div className="col-sm-2 col-md-2 col-2" >

            <i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} ></i>

            <div id="sorticonModeOfScale" className="dropdown-contenticon" onClick={handleclickSort}>
              {flagSort === 'Label' ? <><a id='Label'>Sort by ModeOfScale ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by ModeOfScale ASC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by ModeOfScale DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by ModeOfScale DESC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
              {flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
            </div>
            <img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img>

            <div className='btnicons'>


              <div id="myDropdowniconModeOfSales" className="dropdown-contenticon" onClick={handleclick}>

                {flag === 'semiDonut' ? <><a id='semiDonut'>Semi Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='semiDonut' >Semi Donut</a><hr className='custom-hr' /></>}
                {flag === 'donut' ? <><a id='donut'>Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut' >Donut</a><hr className='custom-hr' /></>}

                <button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>

              </div>

            </div>

          </div>
        </div>
       
        {dataloader !== true ?
          loader !== true ?
            <div className="crancy-progress-card card-contain-graph">

             
              {flag === 'semiDonut' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(semiDonut))} /> : null}
              {/* {flag === 'donut' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(opt_pie))} /> : null} */}
              {flag === 'donut' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionpie))} /> : null}

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
