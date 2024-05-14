import React, { useEffect, useState, useContext } from 'react'
import contex from '../../contex/Contex';

import API from '../../Utility/API'
import post from '../../Utility/APIHandle'

import return1 from '../../Assets/img/svgs bold/return 1.svg'
import return2 from '../../Assets/img/svgs bold/return 2.svg'


export default function ReturnTrend() {

    // const [postData, setPostData] = useState({
    //     "strBranch": "",
    //     "strState": "",
    //     "strCity": "",
    //     "strItem": "",
    //     "strSubItem": "",
    //     "strItemGroup": "",
    //     "strItemSubitem": "",
    //     "strPurchaseParty": "",
    //     "strSalesParty": "",
    //     "strSaleman": "",
    //     "strProduct": "",
    //     "strDesignCatalogue": "",
    //     "strSaleAging": "",
    //     "strModeofSale": "",
    //     "strTeamModeofSale": "",
    //     "FromDate": "",
    //     "ToDate": "",
    //     "strMetalType": "",
    //     "strDayBook": "",
    //     "PageNo": 0,
    //     "PageSize": 0,
    //     "Search": ""
    // })


    // useEffect(()=>{
    //     getdata()
    // },[])


    // function getdata() {

    //     post(postData,API.GetReturnTrendCard,'post')
    //     .then((res)=>{

    //     })
    // }
    const contexData = useContext(contex);
    const [weight, setweight] = useState([])
    const [costAmount, setcostAmount] = useState()
    const [prc, setprc] = useState(0)
    let inputdata = contexData.state;

    useEffect(() => {
        getdata()
    }, [inputdata])

    async function getdata() {

        inputdata = { ...inputdata, ['Grouping']: 'sr' }

        await post(inputdata, API.CommonCard, {}, 'post')
            .then((res) => {
                if (res.data.lstResult.length > 0) {
                    setweight(res.data.lstResult[0]['NetWeight'])
                    setcostAmount(res.data.lstResult[0]['CostAmount'])
                    setprc(res.data.lstResult[0]['Prc'])

                    inputdata = { ...inputdata, ['Grouping']: '' }
                }
            })
    }

    function format(val) {
        if (localStorage.getItem('value') === 'k') {
          return (Number(parseFloat(((((val / 1000).toFixed(1)).toString())))).toLocaleString('en', {
            minimumFractionDigits: 0
          }) + " " +"K");
        } else if (localStorage.getItem('value') === 'l') {
          return (Number(parseFloat(((((val / 100000).toFixed(1)).toString())))).toLocaleString('en', {
            minimumFractionDigits: 0
          })+ " " + "L");
        } else if (localStorage.getItem('value') === 'm') {
          return (Number(parseFloat(((((val / 1000000).toFixed(1)).toString())))).toLocaleString('en', {
            minimumFractionDigits: 0
          }) + " " + "M");
        } else if (localStorage.getItem('value') === 'c') {
          return (Number(parseFloat(((((val / 10000000).toFixed(1)).toString())))).toLocaleString('en', {
            minimumFractionDigits: 0
          }) + " " + "CR");
        } else if (localStorage.getItem('value') === 'b') {
          return (Number(parseFloat(((((val / 1000000000).toFixed(1)).toString())))).toLocaleString('en', {
            minimumFractionDigits: 0
          }) + " " + "B");
        } else {
          return (Number(parseFloat(Math.floor(val))).toLocaleString('en', {
            minimumFractionDigits: 0
          }));
        }
      }
    
    function thousandSeparated(val){
        return (Number(parseFloat(val)).toLocaleString('en', {
            minimumFractionDigits: 2
        }));
    }

    return (

        <div className="col-xl-2 col-lg-4 col-md-4 col-12">
            <div className="graph-card">
                <div className="card-title-top2">
                    <h4>Return Trend</h4>
                </div>
                <div className="crancy-progress-card2 top-contant-top-card">
                    <div className="crancy-progress-card__content">
                        <h4 className="crancy-progress-card__title">{thousandSeparated(weight)}</h4>
                        <div className="crancy-progress-card__history">
                            <span>{prc}% Ret.</span>
                        </div>
                    </div>
                    <div className="crancy-progress__single">
                        <img className="crancy-color2__fill" width="32" height="32" viewBox="0 0 20 20"
                            fill="none" src={return1} />
                    </div>
                </div>
                <div className="crancy-progress-card2 top-contant-botton-card">
                    <div className="crancy-progress-card__content">
                        <h4 className="crancy-progress-card__title">₹ {format(costAmount)}</h4>
                        <div className="crancy-progress-card__history">
                            <span>{prc}% Ret.</span>
                        </div>
                    </div>
                    <div className="crancy-progress__single">
                        <img className="crancy-color2__fill" width="32" height="32" viewBox="0 0 20 20"
                            fill="none" src={return2} />
                    </div>
                </div>
            </div>
        </div>
    )
}
