import API from '../../Utility/API';
import { useEffect, useState, useContext } from 'react';
import post from '../../Utility/APIHandle'
import Gradient from "javascript-color-gradient";
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'
import { useNavigate } from 'react-router-dom';


export default function ItemWithSubItemWise() {
	const contexData = useContext(contex);
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	let inputdata = contexData.state;
	const [loader, setLoader] = useState(true)
	const [dataloader, setdataLoader] = useState(true)
	const [flag, setflag] = useState()
	const ChartType = "bar"
	const [optionId, setOptionId] = useState()
	const [flagSort, setflagSort] = useState('')
	const [sales, setSales] = useState([])
	const navigate = useNavigate()
	const [data, setdata] = useState([])
	const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()

	function handleclick(e) {

		if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconbranch' && e.target.id !== '') {

			setflag(e.target.id)
		}
		else {

		}

	}

	function setMargin() {
		if (weight.length < 7) {
			return 80
		} else {
			return 30
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

		inputdata = { ...inputdata, ['Grouping']: 'f.ItemSubNAme,f.ItemSubID', ['SortByLabel']: 'ItemSubNAme' }

		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];
				let sale = [];
				var js = {};
				let data= []
				for (let index = 0; index < res.data.lstResult.length; index++) {
					data.push({ value: res.data.lstResult[index][inputdata['column']], name: res.data.lstResult[index]['ItemSubNAme'] })
				
					if (res.data.lstResult[index]['ItemSubNAme'] === null) {
						name.push("null")
					} else {
						name.push(res.data.lstResult[index]['ItemSubNAme'])
					}
					weight.push(res.data.lstResult[index][inputdata['column']])
					js = { 'product': '', 'thisYearProfit': 0 }
					if (res.data.lstResult[index]['ItemSubNAme'] === null) {
						js['product'] = 'null'
					} else {
						js['product'] = res.data.lstResult[index]['ItemSubNAme']
					}
					js['thisYearProfit'] = res.data.lstResult[index][inputdata['column']]

					sale.push(js)

				}
				setdataLoader(false)
				if (weight.length !== 0) {
					setLoader(false)
				} else {
					setLoader(true)
				}
				setdata(data)
				setName(name)
				setweight(weight)
				var j = []
				for (let index = 0; index < sale.length; index++) {
					j.push({ ...sale[index], ['color']: gradientArray[index] })
				}
				setSales(j)
				inputdata = { ...inputdata, ['Grouping']: '' }
			})
	}

	function handleonchangeCurrency() {

		document.getElementById("myDropdowniconitemsub").style.display === "block" ? document.getElementById("myDropdowniconitemsub").style.display = "none" : document.getElementById("myDropdowniconitemsub").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')
		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {

				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconitemsub') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "f.ItemSubNAme,f.ItemSubID", columnName: "ItemSubNAme", columnID: "ItemSubID", componentName: "Item With Sub Item Wise", filterKey: "strItemSubitem", chartId: 7 }, replace: true })
	}

	async function fetchOption() {
		await post({ "ID": 8, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

			.then((res) => {
				if (res.data.lstResult.length === 0) {
					setflag(ChartType)

					post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 8, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
						.then((res) => {
							post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 8, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
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

		await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 8, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
			.then((res) => {
				document.getElementById('myDropdowniconitemsub').style.display = 'none'
				alert(res.data.Message)

			})
	}


	document.getElementById("root").addEventListener("click", function (event) {

		if (event.target.className !== 'dropbtn icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
			if (document.getElementById("myDropdowniconitemsub") !== null) {
				document.getElementById("myDropdowniconitemsub").style.display = "none"
				document.getElementById("sorticonItemSubitem").style.display = "none"
			}
		}

	});


	function handleSorting() {
		document.getElementById("sorticonItemSubitem").style.display === "block" ? document.getElementById("sorticonItemSubitem").style.display = "none" : document.getElementById("sorticonItemSubitem").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')

		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {
				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonItemSubitem') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	function handleclickSort(e) {
		if (e.target.id !== 'sorticonItemSubitem' && e.target.id !== '') {
			setflagSort(e.target.id)
		}
	}

	async function fetchSortData() {
		var inputForSort = { ...inputdata, 'SortByLabel': 'ItemSubNAme', 'SortBy': flagSort, ['Grouping']: 'f.ItemSubNAme,f.ItemSubID' }

		await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
			let name = [];
			let weight = [];
			let sale = [];
			var js = {};
			let data= []
			for (let index = 0; index < res.data.lstResult.length; index++) {
				data.push({ value: res.data.lstResult[index][inputdata['column']], name: res.data.lstResult[index]['ItemSubNAme'] })
				if (res.data.lstResult[index]['ItemSubNAme'] === null) {
					name.push("null")
				} else {
					name.push(res.data.lstResult[index]['ItemSubNAme'])
				}
				weight.push(res.data.lstResult[index][inputdata['column']])
				js = { 'product': '', 'thisYearProfit': 0 }
				if (res.data.lstResult[index]['ItemSubNAme'] === null) {
					js['product'] = 'null'
				} else {
					js['product'] = res.data.lstResult[index]['ItemSubNAme']
				}
				js['thisYearProfit'] = res.data.lstResult[index][inputdata['column']]

				sale.push(js)

			}
			setdataLoader(false)
			if (weight.length !== 0) {
				setLoader(false)
			} else {
				setLoader(true)
			}
			setdata(data)
			setName(name)
			setweight(weight)
			var j = []
			for (let index = 0; index < sale.length; index++) {
				j.push({ ...sale[index], ['color']: gradientArray[index] })
			}
			setSales(j)
			inputdata = { ...inputdata, ['Grouping']: '' }
		})
	}

	let optionbar = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'bar',
		height: '400%',
		width: '100%',
		chartId: 'itemWithSubItemWise',
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

	let barHorizontal = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'round-horizontal-bar',
		height: '100%',
		width: '100%',
		chartId: 'itemWithSubItemWise',
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

			},

		]
	}
	let radialdata = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'polar-radialbar',
		height: '100%',
		width: '100%',
		chartId: 'itemWithSubItemWise',
		radiusAxis: name,
		seriesdata: weight,
	}
	let optiondonut = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'donut',
		height: '100%',
		width: '100%',
		chartId: 'itemWithSubItemWise',
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
		chartId: 'PieChartitemWithSubItemWise',
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
		chartId: 'RadialBarchartitemWithSubItemWise',
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
						<p><i className="fas fa-sitemap"></i> Item with Sub item Wise</p>
					</div>

					<div className="col-sm-2 col-md-2 col-2">
						<i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} ></i>

						<div id="sorticonItemSubitem" className="dropdown-contenticon" onClick={handleclickSort}>
							{flagSort === 'Label' ? <><a id='Label'>Sort by Item With SubItem ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by Item With SubItem ASC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by Item With SubItem DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by Item With SubItem DESC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
							{flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
						</div>
						<img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img>
						<div className='btnicons'>
							<div id="myDropdowniconitemsub" className="dropdown-contenticon" onClick={handleclick}>
								{flag === 'bar' ? <><a id='bar' >Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' >bar</a><hr className='custom-hr' /></>}
								{flag === 'barv' ? <><a id='barv' >Vertical Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='barv' >vertical bar </a><hr className='custom-hr' /></>}
								{flag === 'donut' ? <><a id='donut' className='donut'>Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut' className='donut'>Donut</a><hr className='custom-hr' /></>}
								{flag === 'radialBar' ? <><a id='radialBar' className='radialBar'>Radial Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='radialBar' className='radialBar'>Radial Bar</a><hr className='custom-hr' /></>}
								{flag === 'pie' ? <><a id='pie' className='pie'>Pie Chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='pie' className='pie'>Pie chart </a><hr className='custom-hr' /></>}
								{flag === 'semidonut' ? <><a id='semidonut' className='semidonut'>Semi Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='semidonut' className='semidonut'>Semi Donut </a><hr className='custom-hr' /></>}
							
								{/* {flag === 'heatmap' ? <><a id='heatmap' >Heat map&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='heatmap' >Heat map</a><hr className='custom-hr' /></>} */}
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

							{flag === 'bar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(barHorizontal))} /> : null}
							{flag === 'barv' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionbar))} /> : null}
							{flag === 'heatmap' ?
								<table align='center' rules='rows' border='white' style={{ border: 'white', marginTop: setMargin() }}>
									<tr>
										<th>ItemWithSubItemWise</th>
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
