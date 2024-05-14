import { useContext } from 'react'
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import { useEffect, useState } from 'react';
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
import { useNavigate } from 'react-router-dom';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'

export default function YearWise() {

	const navigate = useNavigate()
	const contexData = useContext(contex);
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	let inputdata = contexData.state;
	const [loader, setLoader] = useState(true)
	const [dataloader, setdataLoader] = useState(true)
	const [optionId, setOptionId] = useState()
	const [flag, setflag] = useState()
	const ChartType = "kpi"
	const [flagSort, setflagSort] = useState('')
	const [data, setdata] = useState([])
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

		inputdata = { ...inputdata, ['Grouping']: 'M.FinYearID,m.YearCode', ['SortByLabel']: 'YearCode' }

		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];
				let data = [];

				for (let index = 0; index < res.data.lstResult.length; index++) {
					if (res.data.lstResult[index]['YearCode'] === null) {
						name.push("null")
						data.push({ name: "null", value: res.data.lstResult[index][inputdata['column']] })
					} else {
						name.push(res.data.lstResult[index]['YearCode'])
						data.push({ name: res.data.lstResult[index]['YearCode'], value: res.data.lstResult[index][inputdata['column']] })
					}
					weight.push(res.data.lstResult[index][inputdata['column']])
				}
				setdata(data)
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



	function handleonchangeCurrency() {

		document.getElementById("myDropdowniconyear").style.display === "block" ? document.getElementById("myDropdowniconyear").style.display = "none" : document.getElementById("myDropdowniconyear").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')
		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {

				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconyear') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "M.FinYearID,m.YearCode", columnName: "YearCode", columnID: "FinYearID", componentName: "Year Wise", chartId: 15 }, replace: true })
	}

	document.getElementById("root").addEventListener("click", function (event) {

		if (event.target.className !== 'dropbtn icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
			if (document.getElementById("myDropdowniconyear") !== null) {
				document.getElementById("myDropdowniconyear").style.display = "none"
				document.getElementById("sorticonYear").style.display = "none"
			}
		}

	});
	async function fetchOption() {
		await post({ "ID": 15, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

			.then((res) => {
				if (res.data.lstResult.length === 0) {
					setflag(ChartType)

					post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 15, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
						.then((res) => {

							post({ "ID": 15, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
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

		await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 15, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
			.then((res) => {
				document.getElementById('myDropdowniconyear').style.display = 'none'
				alert(res.data.Message)

			})
	}

	function handleSorting() {
		document.getElementById("sorticonYear").style.display === "block" ? document.getElementById("sorticonYear").style.display = "none" : document.getElementById("sorticonYear").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')

		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {
				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonYear') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	function handleclickSort(e) {
		if (e.target.id !== 'sorticonYear' && e.target.id !== '') {
			setflagSort(e.target.id)
		}
	}

	async function fetchSortData() {
		var inputForSort = { ...inputdata, 'SortByLabel': 'YearCode', 'SortBy': flagSort, ['Grouping']: 'M.FinYearID,m.YearCode' }

		await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
			let name = [];
			let weight = [];

			for (let index = 0; index < res.data.lstResult.length; index++) {
				if (res.data.lstResult[index]['YearCode'] === null) {
					name.push("null")
					data.push({ name: "null", value: res.data.lstResult[index][inputdata['column']] })
				} else {
					name.push(res.data.lstResult[index]['YearCode'])
					data.push({ name: res.data.lstResult[index]['YearCode'], value: res.data.lstResult[index][inputdata['column']] })
				}
				weight.push(res.data.lstResult[index][inputdata['column']])
			}
			setdata(data)
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

	let optionDonut = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'donut',
		height: '100%',
		width: '100%',
		chartId: 'YearWise',
		propdata: data,
		radius: [10, 150],
	}

	let optionbar = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'bar',
		height: '400%',
		width: '100%',
		chartId: 'YearWise',
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

	let semiDonut = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'radialbar',
		height: '100%',
		width: '100%',
		chartId: 'yearwise',
		propdata: data,
	}


	return (
		<div className="col-lg-4 col-md-6 col-12">
			<div className="graph-card">
				<div className="card-title-graph">
					<div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
						<p><i className="fas fa-calendar-alt"></i> Year Wise</p>
					</div>

					<div className="col-sm-2 col-md-2 col-2">
						<i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} ></i>

						<div id="sorticonYear" className="dropdown-contenticon" onClick={handleclickSort}>
							{flagSort === 'Label' ? <><a id='Label'>Sort by Year ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by Year ASC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by Year DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by Year DESC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
							{flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
						</div>
						<img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img>
						<div className='btnicons'>
							<div id="myDropdowniconyear" className="dropdown-contenticon" onClick={handleclick}>

								{flag === 'donut' ? <><a id='donut' className='donut'>Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut' className='donut'>Donut</a><hr className='custom-hr' /></>}
								{flag === 'bar' ? <><a id='bar' className='bar' >Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' className='bar' >Bar</a><hr className='custom-hr' /></>}
								{flag === 'semiDonut' ? <><a id='semiDonut' className='semiDonut'>Semi Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='semiDonut' className='semiDonut'>Semi Donut</a><hr className='custom-hr' /></>}

								<button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
							</div>
						</div>
					</div>
				
				</div>
				
				{dataloader !== true ?
					loader !== true ?
						<div className="crancy-progress-card card-contain-graph">
							{flag === 'donut' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionDonut))} /> : null}
							{flag === 'bar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionbar))} /> : null}
							{flag === 'semiDonut' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(semiDonut))} /> : null}

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
