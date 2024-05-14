import React, { useEffect, useState, useContext } from 'react'
import contex from '../../contex/Contex'

import API from '../../Utility/API'
import post from '../../Utility/APIHandle'

import StockAnalysis2 from '../../Assets/img/svgs bold/stock analysis 2.svg'
import Vector2 from '../../Assets/img/svgs bold/Vector (2).svg'

export default function StockAnalysis() {

  // const [postData, setPostData] = useState({
  //       "strBranch": "",
  //       "strState": "",
  //       "strCity": "",
  //       "strItem": "",
  //       "strSubItem": "",
  //       "strItemGroup": "",
  //       "strItemSubitem": "",
  //       "strPurchaseParty": "",
  //       "strSalesParty": "",
  //       "strSaleman": "",
  //       "strProduct": "",
  //       "strDesignCatalogue": "",
  //       "strSaleAging": "",
  //       "strModeofSale": "",
  //       "strTeamModeofSale": "",
  //       "FromDate": "",
  //       "ToDate": "",
  //       "strMetalType": "",
  //       "strDayBook": "",
  //       "PageNo": 0,
  //       "PageSize": 0,
  //       "Search": ""
  //   })


  //   useEffect(()=>{
  //       getdata()
  //   },[])


  //   function getdata() {

  //       post(postData,API.GetStockAnalysisCard,'post')
  //       .then((res)=>{

  //       })
  //   }
  const contexData = useContext(contex);
  const [tag, settag] = useState()
  const [loose, setloose] = useState()
  let inputdata = contexData.state;

  useEffect(() => {
    getdata()
  }, [inputdata])

  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'stock' }

    await post(inputdata, API.CommonCard, {}, 'post')
      .then((res) => {
        if (res.data.lstResult.length > 0) {

          settag(res.data.lstResult[1]['NetAmount']);
          setloose(res.data.lstResult[0]['NetAmount'])

          inputdata = { ...inputdata, ['Grouping']: '' }
        }
      })

  }

  function thousandSeparated(val) {
    return (Number(parseFloat(val)).toLocaleString('en', {
      minimumFractionDigits: 2
    }));
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

  return (
    <div className="col-xl-2 col-lg-6 col-md-6 col-12">
      <div className="graph-card">
        <div className="card-title-top4">
          <h4>Stock Analysis</h4>
        </div>
        <div className="crancy-progress-card4 top-contant-top-card">
          <div className="crancy-progress-card__content">
            <h4 className="crancy-progress-card__title">₹ {format(tag)}</h4>
            <div className="crancy-progress-card__history">
              <span>(Tag Stock)</span>
            </div>
          </div>
          <div className="crancy-progress__single">
            <img className="crancy-color2__fill" width="32" height="32" viewBox="0 0 20 20"
              fill="none" src={StockAnalysis2} />
          </div>
        </div>
        <div className="crancy-progress-card4 top-contant-botton-card">
          <div className="crancy-progress-card__content">
            <h4 className="crancy-progress-card__title">₹ {format(loose)}</h4>
            <div className="crancy-progress-card__history">
              <span>(Losse Stock)</span>
            </div>
          </div>
          <div className="crancy-progress__single">
            <img className="crancy-color2__fill" width="32" height="32" viewBox="0 0 20 20"
              fill="none" src={Vector2} />
          </div>
        </div>
      </div>
    </div>
  )
}
