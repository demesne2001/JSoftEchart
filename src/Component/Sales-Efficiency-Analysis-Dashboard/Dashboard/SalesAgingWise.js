import React, { useContext } from 'react'

import ReactApexChart from 'react-apexcharts';
import BlackDots from '../../Assets/image/Dots.png'
import post from '../../Utility/APIHandle'
import { useEffect, useState } from 'react';
import API from '../../Utility/API';
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
import { useNavigate } from 'react-router-dom';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'

export default function SalesAgingWise() {
	const [loader, setLoader] = useState(true)
	const [dataloader, setdataLoader] = useState(true)
	const contexData = useContext(contex);
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	let inputdata = contexData.state;
	const navigate = useNavigate()
	const [optionId, setOptionId] = useState()
	const [flagSort, setflagSort] = useState('')
	const [flag, setflag] = useState("line")
	const ChartType = "line"
	let optionline = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'line',
		height: '400px',
		width: '100%',
		chartId: 'salesAgingWise',
		Xaxis: name,
		Yaxis: weight,
	}

	let optionarea = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'area',
		height: '400px',
		width: '100%',
		chartId: 'salesAgingWise',
		Xaxis: name,
		Yaxis: weight
	}

	let comboChart = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'compare-bar-line',
		height: '400px',
		width: '100%',
		Xaxis: name,
		Yaxis: [{
			type: 'value',
			name: 'weight1',
			
		  },
		  {
			type: 'value',
			name: 'weight2',
			
		  }],
		series: [
            {
				name: 'weight1',				
                type: 'bar',
                data: weight
            },
            {   
				name: 'weight2',
                type: 'line',
                yAxisIndex: 1,
                data: weight
            }
        ]
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
	function handleclick(e) {

		if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconbranch' && e.target.id !== '') {

			setflag(e.target.id)
		}
		else {

		}

	}
	async function getdata() {

		inputdata = { ...inputdata, ['Grouping']: 'a.[rd.caption]', ['SortByLabel']:'[rd.caption]' }

		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];

				for (let index = 0; index < res.data.lstResult.length; index++) {
					if (res.data.lstResult[index]['rd.caption'] === null) {
						name.push("null")
					} else {
						name.push(res.data.lstResult[index]['rd.caption'])
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
		navigate('/graph-detail', { state: { grouping: "a.[rd.caption]", columnName: "rd.caption", columnID: "rd.caption", componentName: "Sales Aging Wise", filterKey: "strSaleAging", chartId: 16 }, replace: true })
	}


	function handleonchangeCurrency() {

		document.getElementById("myDropdowniconSalesAging").style.display === "block" ? document.getElementById("myDropdowniconSalesAging").style.display = "none" : document.getElementById("myDropdowniconSalesAging").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')
		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {

				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconSalesAging') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	document.getElementById("root").addEventListener("click", function (event) {

		if (event.target.className !== 'dropbtn icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
			if (document.getElementById("myDropdowniconSalesAging") !== null) {
				document.getElementById("myDropdowniconSalesAging").style.display = "none"
				document.getElementById("sorticonSalesAging").style.display = "none"
			}
		}

	});

	async function fetchOption() {
		await post({ "ID": 16, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

			.then((res) => {
				if (res.data.lstResult.length === 0) {
					setflag(ChartType)

					post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 16, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
						.then((res) => {

							post({ "ID": 16, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
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

		await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 16, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
			.then((res) => {
				document.getElementById('myDropdowniconSalesAging').style.display = 'none'
				alert(res.data.Message)

			})
	}

	function handleSorting() {
		document.getElementById("sorticonSalesAging").style.display === "block" ? document.getElementById("sorticonSalesAging").style.display = "none" : document.getElementById("sorticonSalesAging").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')

		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {
				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonSalesAging') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	function handleclickSort(e) {
		if (e.target.id !== 'sorticonSalesAging' && e.target.id !== '') {
			setflagSort(e.target.id)
		}
	}

	async function fetchSortData() {
		var inputForSort = { ...inputdata, 'SortByLabel': '[rd.caption]', 'SortBy': flagSort, ['Grouping']: 'a.[rd.caption]' }

		await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
			let name = [];
			let weight = [];

			for (let index = 0; index < res.data.lstResult.length; index++) {
				if (res.data.lstResult[index]['rd.caption'] === null) {
					name.push("null")
				} else {
					name.push(res.data.lstResult[index]['rd.caption'])
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



	return (
		<div class="col-lg-6 col-md-6 col-12">
			<div class="graph-card">
				<div class="card-title-graph">
					<div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
						<p><i class="fas fa-chart-line"></i> Sales Aging Wise</p>
					</div>

					< div className="col-sm-2 col-md-2 col-2">
						<i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} ></i>

						<div id="sorticonSalesAging" className="dropdown-contenticon" onClick={handleclickSort}>
							{flagSort === 'Label' ? <><a id='Label'>Sort by SalesAging ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by SalesAging ASC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by SalesAging DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by SalesAging DESC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
							{flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
						</div>
						<img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img>
						<div className='btnicons'>

							<div id="myDropdowniconSalesAging" className="dropdown-contenticon" onClick={handleclick}>

								{flag === 'line' ? <><a id='line' className='line' >line&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='line' className='line' >line </a><hr className='custom-hr' /></>}
								{flag === 'area' ? <><a id='area' className='area'>area chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='area' className='area'>area chart</a><hr className='custom-hr' /></>}
								{flag === 'linebar' ? <><a id='linebar' className='line'>Combo chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='linebar' className='line'>Combo chart</a><hr className='custom-hr' /></>}
								<button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
							</div>
						</div>
					</div>

				</div>
				
				{dataloader !== true ?
					loader !== true ?
						<div class="crancy-progress-card card-contain-graph">

					
							{flag === 'line' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionline))} /> : null}
							{flag === 'area' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionarea))} /> : null}
							{flag === 'linebar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(comboChart))} /> : null}

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
