import React, { useContext } from 'react'

import ReactApexChart from 'react-apexcharts';
import BlackDots from '../../Assets/image/Dots.png'
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import { useEffect, useState } from 'react';
import contex from '../../contex/Contex';

export default function TeamModeofSalesWise() {

	const contexData = useContext(contex)

	const series = [{
		name: 'PRODUCT A',
		data: [44, 55, 41, 67, 22, 43]
	}, {
		name: 'PRODUCT B',
		data: [13, 23, 20, 8, 13, 27]
	}, {
		name: 'PRODUCT C',
		data: [11, 17, 15, 15, 21, 14]
	}, {
		name: 'PRODUCT D',
		data: [21, 7, 25, 13, 22, 8]
	}]

	const label = ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
		'01/05/2011 GMT', '01/06/2011 GMT'
	]
	const option ={}

	const [postData, setPostData] = useState({
		"strBranch": "",
		"strState": "",
		"strCity": "",
		"strItem": "",
		"strSubItem": "",
		"strItemGroup": "",
		"strItemSubitem": "",
		"strPurchaseParty": "",
		"strDesignCodeID":"",
		"strSalesParty": "",
		"strSaleman": "",
		"strProduct": "",
		"strDesignCatalogue": "",
		"strSaleAging": "",
		"strModeofSale": "",
		"strTeamModeofSale": "",
		"FromDate": "",
		"ToDate": "",
		"strMetalType": "",
		"strDayBook": "",
		"PageNo": 0,
		"PageSize": 0,
		"Search": ""
	})


	useEffect(() => {

		setPostData(contexData.state)

	}, [contexData.state])

	useEffect(() => {
		getdata()
	}, [postData])


	async function getdata() {

		let temp1 = []

		await post(postData, API.GetModeOfSalesWise, 'post')
			.then((res) => {

				for (let index = 0; index < res.data.lstResult.length; index++) {

					temp1.push({

					})

				}

			})
	}

	function handledropdownMenu() {
		document.getElementById("myDropdownTeammode").style.display === "block" ? document.getElementById("myDropdownTeammode").style.display = "none" : document.getElementById("myDropdownTeammode").style.display = "block";
	}


	function handleSelectedChart(num) {
		// setBranchWiseChart(num)
	}

	return (
		<div class="col-lg-4 col-md-6 col-12">
			<div class="graph-card">
				<div href="#" target="_self" class="card-title-graph team-card-title">
					<p><i class="fas fa-stream"></i>
						Team & Mode of Sales Wise</p>
					<i class="fas fa-external-link-alt"></i>
					{/* <p class="geex-content__header__quickaction__link  geex-btn__customizer dots" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu} >
						<img src={BlackDots} className='dropbtn' />
					</p>
					<div id="myDropdownTeammode" class="dropdown-content" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu}>
						<a id='option1' onClick={() => handleSelectedChart(1)}>Radial Bar</a><hr class="custom-hr" />
						<a id='option2' onClick={() => handleSelectedChart(2)}>Pie</a><hr class="custom-hr" />
					</div> */}
				</div>
				<div class="crancy-progress-card card-contain-graph">
					<ReactApexChart options={option} series={series} type="bar" height={390} />
				</div>
			</div>
		</div>
	)
}
