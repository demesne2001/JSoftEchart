import { useEffect, useState, useContext } from 'react'
import contex from '../../contex/Contex';
import API from '../../Utility/API'
import post from '../../Utility/APIHandle'
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'

export default function Piegraph1() {
  const contexData = useContext(contex);
  const [weight, setweight] = useState([])
  const [name, setname] = useState([])
  const [weight1, setweight1] = useState([])
  const [name1, setname1] = useState([])
  let inputdata = contexData.state;

  useEffect(() => {
    getdata()
  }, [inputdata])

  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 's,sr' }

    await post(inputdata, API.CommonCard, {}, 'post')
      .then((res) => {



        if (res.data.lstResult.length > 0) {

          setweight(res.data.lstResult[0]['NetWeight'])
          setname(res.data.lstResult[0]['SalesType'])
          setweight1(res.data.lstResult[1] ? res.data.lstResult[1]['NetWeight'] : 0)
          setname1(res.data.lstResult[1] ? res.data.lstResult[1]['SalesType'] : "Return")

          inputdata = { ...inputdata, ['Grouping']: '' }
        }
      })
  }

  let donut = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'donut',
    height: '100%',
    width: '100%',
    legend: {
      type: 'scroll',
      orient: 'vertical',
      left: '0',
      bottom: '0',
      pageTextStyle: {
        fontStyle: 'oblique'
      }
    },
    color: ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"],
    chartId: 'SaleReturn',
    propdata: [{ value: weight, name: name },
    { value: weight1, name: name1 }
    ],
    label: {
      show: true,
      position: 'outside',
      fontStyle: 'bold',
      formatter: '{b|{b}：}{per|{c}}',
      fontsize: 100,
      color: 'black',
      fontWeight: 'bold',
      rich: {
        b: {
          color: '#4C5058',
          fontSize: 12,
          fontWeight: 'bold',
          lineHeight: 33
        },
        per: {
          color: '#fff',
          backgroundColor: '#4C5058',
          padding: [3, 4],
          borderRadius: 2
        }
      }
    },
    labelLine: {
      show: true
    },
  }

  return (


    <div className="col-xl-2 col-lg-4 col-md-4 col-12">
      <div className="graph-card">
        {weight.length !== 0 ?
          <div className="crancy-progress-card top-graph-card">
            <AlphaDashChart obj={JSON.parse(JSON.stringify(donut))} />
          </div> :
          <div className="crancy-progress-card top-graph-card">
            <div class="dot-spinner" style={{ margin: "auto", position: 'inherit' }} >
              <div class="dot-spinner__dot" style={{ top: "7px" }}></div>
              <div class="dot-spinner__dot" style={{ top: "7px" }}></div>
              <div class="dot-spinner__dot" style={{ top: "7px" }}></div>
              <div class="dot-spinner__dot" style={{ top: "7px" }}></div>
              <div class="dot-spinner__dot" style={{ top: "7px" }}></div>
              <div class="dot-spinner__dot" style={{ top: "7px" }}></div>
              <div class="dot-spinner__dot" style={{ top: "7px" }}></div>
              <div class="dot-spinner__dot" style={{ top: "7px" }}></div>
            </div>
          </div>}

      </div>
    </div>
  )
}
