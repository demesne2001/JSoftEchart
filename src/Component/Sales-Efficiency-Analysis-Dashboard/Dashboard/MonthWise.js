import { useEffect, useState, useContext } from 'react';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
import { useNavigate } from 'react-router-dom';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'



export default function MonthWise() {

  const navigate = useNavigate()
  const contexData = useContext(contex);
  const [name, setName] = useState([])
  const [weight, setweight] = useState([])
  let inputdata = contexData.state;
  const [loader, setLoader] = useState(true)
  const [dataloader, setdataLoader] = useState(true)
  const [flag, setflag] = useState()
  const [flagSort, setflagSort] = useState('')
  const ChartType = "bar"
  const [optionId, setOptionId] = useState()
  function handleclick(e) {

    if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconbranch' && e.target.id !== '') {

      setflag(e.target.id)
    }
    else {

    }

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

  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'datename(month,a.voucherDate)', ['SortByLabel']: 'MonthName' }
    await post(inputdata, API.CommonChart, {}, 'post')
      .then((res) => {


        let name = [];
        let weight = [];

        for (let index = 0; index < res.data.lstResult.length; index++) {
          if (res.data.lstResult[index]['MonthName'] === null) {
            name.push("null")
          } else {
            name.push(res.data.lstResult[index]['MonthName'])
          }
          weight.push(res.data.lstResult[index][inputdata['column']])
        }
        setName(name)
        setweight(weight)
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
    navigate('/graph-detail', { state: { grouping: "datename(month,voucherDate)", columnName: "MonthName", columnID: "MonthName", componentName: " Month Wise", filterKey: "strItemSubitem", chartId: 14 }, replace: true })
  }



  function handleonchangeCurrency() {

    document.getElementById("myDropdowniconmonth").style.display === "block" ? document.getElementById("myDropdowniconmonth").style.display = "none" : document.getElementById("myDropdowniconmonth").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')
    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {

        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconmonth') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }

  document.getElementById("root").addEventListener("click", function (event) {

    if (event.target.className !== 'dropbtn icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
      if (document.getElementById("myDropdowniconmonth") !== null) {
        document.getElementById("myDropdowniconmonth").style.display = "none"
        document.getElementById("sorticonMonth").style.display = "none"
      }
    }

  });

  async function fetchOption() {
    await post({ "ID": 14, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

      .then((res) => {
        if (res.data.lstResult.length === 0) {
          setflag(ChartType)

          post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 14, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
            .then((res) => {

              post({ "ID": 14, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
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

    await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 14, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
      .then((res) => {
        document.getElementById('myDropdowniconmonth').style.display = 'none'
        alert(res.data.Message)

      })
  }

  function handleSorting() {
    document.getElementById("sorticonMonth").style.display === "block" ? document.getElementById("sorticonMonth").style.display = "none" : document.getElementById("sorticonMonth").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')

    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {
        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonMonth') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }

  function handleclickSort(e) {
    if (e.target.id !== 'sorticonMonth' && e.target.id !== '') {
      setflagSort(e.target.id)
    }
  }

  async function fetchSortData() {
    var inputForSort = { ...inputdata, 'SortByLabel': 'MonthName', 'SortBy': flagSort, ['Grouping']: 'datename(month,a.voucherDate)' }

    await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
      let name = [];
      let weight = [];

      for (let index = 0; index < res.data.lstResult.length; index++) {
        if (res.data.lstResult[index]['MonthName'] === null) {
          name.push("null")
        } else {
          name.push(res.data.lstResult[index]['MonthName'])
        }
        weight.push(res.data.lstResult[index][inputdata['column']])
      }
      setName(name)
      setweight(weight)
      setdataLoader(false)
      if (weight.length !== 0) {
        setLoader(false)
      } else {
        setLoader(true)
      }
      inputdata = { ...inputdata, ['Grouping']: '' }
    })
  }

  let optionbar = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'bar',
    height: '400%',
    width: '100%',
    chartId: 'MonthWise',
    Xaxis: name,
    color: ['#00FFD7', '#FFD700', '#D700FF'],
    series: [
      {
        type: 'bar',
        colorBy: 'item',
        barWidth: '60%',
        data: weight
      }
    ]
  }

  let optionarea = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'area',
    height: '400px',
    width: '500px',
    chartId: 'MonthWise',
    Xaxis: name,
    Yaxis: weight,
  }


  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="graph-card">
        <div className="card-title-graph">
          <div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
            <p><i className="fas fa-calendar-week"></i> Month Wise</p>
          </div>

          <div className="col-sm-2 col-md-2 col-2">
            <i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} ></i>

            <div id="sorticonMonth" className="dropdown-contenticon" onClick={handleclickSort}>
              {flagSort === 'Label' ? <><a id='Label'>Sort by Month ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by Month ASC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by Month DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by Month DESC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
              {flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
            </div>
            <img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img>
            <div className='btnicons'>
              <div id="myDropdowniconmonth" className="dropdown-contenticon" onClick={handleclick}>
                {flag === 'bar' ? <><a id='bar' className='bar' >Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' className='bar' >Bar</a><hr className='custom-hr' /></>}
                {flag === 'area' ? <><a id='area' className='area'>Area chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='area' className='area'>Area chart</a><hr className='custom-hr' /></>}


                <button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
              </div>
            </div>
          </div>



        </div>

        {dataloader !== true ?
          loader !== true ?
            <div className="crancy-progress-card card-contain-graph">
              {flag === 'bar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionbar))} /> : null}
              {flag === 'area' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionarea))} /> : null}

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
