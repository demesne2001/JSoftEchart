import { useContext, useEffect, useState } from 'react'
import img from '../../Assets/icons8-person-48.png'
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import { useNavigate } from 'react-router-dom';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'

export default function SalesManWise() {
  const [loader, setLoader] = useState(true)
  const [dataloader, setdataLoader] = useState(true)
  const [imagearr, setImageArr] = useState([])
  const contexData = useContext(contex);
  const [name, setName] = useState([])
  const [weight, setweight] = useState([])
  const [flag, setFlag] = useState()
  const ChartType = 'bar'
  const [optionId, setOptionId] = useState()
  let inputdata = contexData.state;
  const navigate = useNavigate()
  const [flagSort, setflagSort] = useState('')
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

  function handleNavigation() {
    navigate('/graph-detail', { state: { grouping: "h.SalesmanID,h.SalesmanNAme", columnName: "SalesmanNAme", columnID: "SalesmanID", componentName: "SalesMan Wise", filterKey: "strSaleman", chartId: 11 }, replace: true })
  }

  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'h.SalesmanID,h.SalesmanNAme', ['SortByLabel']: 'SalesmanNAme' }

    await post(inputdata, API.CommonChart, {}, 'post')
      .then((res) => {
        let name = [];
        let weight = [];

        for (let index = 0; index < res.data.lstResult.length; index++) {
          if (res.data.lstResult[index]['SalesmanNAme'] === null) {
            name.push("null")
          } else {
            name.push(res.data.lstResult[index]['SalesmanNAme'])
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



  function handleclick(e) {

    if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconSalesManWise' && e.target.id !== '') {

      setFlag(e.target.id)
    }
    else {

    }

  }

  function handleonchangeCurrency() {

    document.getElementById("myDropdowniconSalesManWise").style.display === "block" ? document.getElementById("myDropdowniconSalesManWise").style.display = "none" : document.getElementById("myDropdowniconSalesManWise").style.display = "block";
  }

  document.getElementById("root").addEventListener("click", function (event) {

    if (event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
      if (document.getElementById("sorticonSalesManWise") !== null) {
        document.getElementById("sorticonSalesManWise").style.display = "none"
      }
    }

  });

  async function fetchOption() {
    await post({ "ID": 11, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

      .then((res) => {
        if (res.data.lstResult.length === 0) {
          setFlag(ChartType)

          post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 11, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
            .then((res) => {

              post({ "ID": 11, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
                .then((res) => {
                  setOptionId(res.data.lstResult[0].ChartOptionID)
                })
              alert(res.data.Message)
            })

        }
        else {
          setOptionId(res.data.lstResult[0].ChartOptionID)
          setFlag(res.data.lstResult[0].ChartOption)
        }

      })
  }

  async function addEditOption() {

    await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 11, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
      .then((res) => {

        alert(res.data.Message)

      })
  }
  function handleSorting() {
    document.getElementById("sorticonSalesManWise").style.display === "block" ? document.getElementById("sorticonSalesManWise").style.display = "none" : document.getElementById("sorticonSalesManWise").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')

    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {
        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonSalesManWise') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }

  function handleclickSort(e) {
    if (e.target.id !== 'sorticonSalesManWise' && e.target.id !== '') {
      setflagSort(e.target.id)
    }
  }

  async function fetchSortData() {
    var inputForSort = { ...inputdata, 'SortByLabel': 'SalesmanNAme', 'SortBy': flagSort, ['Grouping']: 'h.SalesmanID,h.SalesmanNAme' }

    await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
      let name = [];
      let weight = [];

      for (let index = 0; index < res.data.lstResult.length; index++) {
        if (res.data.lstResult[index]['SalesmanNAme'] === null) {
          name.push("null")
        } else {
          name.push(res.data.lstResult[index]['SalesmanNAme'])
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
    chartId: 'SalesManWise',
    Xaxis: name,
    series: [
      {
        type: 'bar',
        colorBy: 'item',
        barWidth: '60%',
        data: weight
      }
    ]
  }

let avataropt = {
  themeId: localStorage.getItem("ThemeIndex"),
  chartId: 'avatar',
  charttype: 'avatar-bar',
  height: '400%',
  width: '100%',
  Xaxis: name,
  Yaxis: weight
}


  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="graph-card">
        <div className="card-title-graph">

          <div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
            <p><i className="fas fa-users"></i> Salesmen Wise</p>
          </div>


          <div className="col-sm-2 col-md-2 col-2">
            <i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} ></i>

            <div id="sorticonSalesManWise" className="dropdown-contenticon" onClick={handleclickSort}>
              {flagSort === 'Label' ? <><a id='Label'>Sort by SalesMan ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by SalesMan ASC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by SalesMan DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by SalesMan DESC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
              {flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
            </div>

     <img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img>
              <div className='btnicons'>
                <div id="myDropdowniconSalesManWise" className="dropdown-contenticon" onClick={handleclick}>
                  {flag === 'bar' ? <><a id='bar' className='bar' >Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' className='bar' >Bar</a><hr className='custom-hr' /></>}
                  {flag === 'avatar' ? <><a id='avatar' className='avatar' >Avatar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='avatar' className='avatar' >Avatar</a><hr className='custom-hr' /></>}
             
                  <button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
                </div>
              </div>

            
          </div>

        </div>
  
        {dataloader !== true ?
          loader !== true ?
            <div className="crancy-progress-card card-contain-graph">
               {flag === 'bar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionbar))} /> : null}
               {flag === 'avatar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(avataropt))} /> : null}
        
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
