import React, {useEffect, useState} from 'react'
import SalesEfficiency from './SalesEfficiency'
import Header from '../Header/Header'
import Piegraph1 from './Piegraph1'
import ReturnTrend from './ReturnTrend'
import Collection from './Collection'
import StockAnalysis from './StockAnalysis'
import BranchWise from './BranchWise'
import StateWise from './StateWise'
import CityWise from './CityWise'
import RegionWise from './RegionWise'
import ItemWise from './ItemWise'
import SubItemWise from './SubItemWise'
import ItemGroupWise from './ItemGroupWise'
import ItemWithSubItemWise from './ItemWithSubItemWise'
import PurchasePartyWise from './PurchasePartyWise'
import SalesPartyWise from './SalesPartyWise'
import SalesManWise from './SalesManWise'
import ProductWise from './ProductWise'
import DesignCatalogueWise from './DesignCatalogueWise'
import MonthWise from './MonthWise'
import YearWise from './YearWise'
import SalesAgingWise from './SalesAgingWise'
import ModeofSalesWise from './ModeofSalesWise'
import TeamModeofSalesWise from './TeamModeofSalesWise'

import ContexState from '../../contex/ContexState'
import FilterPrint from '../FilterPrint'
import Navbar from '../NavigationBar/Navbar'
import ExportToExcel from './ExportToExcel'
import { useNavigate } from 'react-router-dom';

// import { Notifications } from 'react-push-notification';

import CommonComponent from '../../CommonComponent/CommonComponent'

// import bootstrapSelectMin from '../../Assets/js/bootstrap-select.min';
// import bootstrapMin from '../../Assets/js/bootstrap.min'
// import jqueryMigrate from '../../Assets/js/jquery-migrate';
// import jquaryMin from '../../Assets/js/jquery.min'
// import main from '../../Assets/js/main'
// import popperMin from '../../Assets/js/popper.min';


export default function Dashboard() {
    const navigate = useNavigate();
    useEffect(()=>{
        if (localStorage.getItem('username') === null) {
            navigate('/',{replace:true})
        }
    },[])
    const [data1, setdata1] = useState([])
    const [data2, setdata2] = useState([])
    const [data3, setdata3] = useState([])
    const [data4, setdata4] = useState([])
    const [data5, setdata5] = useState([])
    const [data6, setdata6] = useState([])
    const [data7, setdata7] = useState([])
    const [data8, setdata8] = useState([])
    const [data9, setdata9] = useState([])
    const [data10, setdata10] = useState([])
    const [data11, setdata11] = useState([])
    const [data12, setdata12] = useState([])
    const [data13, setdata13]= useState([])
    const [data14, setdata14] = useState([])
    const [data15, setdata15] = useState([])
    const [data16a, setdata16a] = useState([])
    const [data17b, setdata17b] = useState([])
    const [data18, setdata18] = useState([])
    const [data19, setdata19] = useState([])
    const [data20, setdata20] = useState([])
    const [data21, setdata21] = useState([])

    const fileName = "ExcelFile";
    const apiData = [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15, data16a, data17b, data18, data19, data20, data21]


    const branchWise = {
        ComponentName:'BrachWise'
    }

    return (
        <div>
            <ContexState>
                
                <Navbar />
                <Header />

                <section className="crancy-adashboard crancy-show">
                    <ExportToExcel apiData={apiData} fileName={fileName} tableTitles={['Branch Wise','State Wise','City Wise','Region Wise', 'Item Wise', 'Sub-Item Wise', 'Item Group Wise' , 'Item with Sub-item Wise', 'Design Wise', 'Sales Party Wise', 'Saleman Wise', 'Product Wise', 'Design Catalogue Wise' , 'Month Wise', 'Year Wise', 'Sale Aging Wise', 'Mode of Sale Wise', 'Sales Efficiency','Return Trend','Collection','Stock Analysis']} />

                    <div className="container">
                        <div className="crancy-body">
                            <div className="crancy-dsinner">
                                <div id='rootElementId'>
                                    <div className="row">

                                        <Piegraph1 />
                                        <SalesEfficiency />
                                        <ReturnTrend />
                                        <Collection />
                                        <StockAnalysis />

                                    </div>

                                    <div className="row crancy-gap-30">
                                        {/* <CommonComponent data={branchWise} /> */}

                                        <BranchWise />
                                        <StateWise />
                                        <CityWise />
                                        <RegionWise />
                                        <ItemGroupWise />
                                        <SubItemWise />
                                        <ItemWise />
                                        <ItemWithSubItemWise />
                                        <PurchasePartyWise />
                                        <SalesPartyWise />
                                        <SalesManWise />
                                        <ProductWise />
                                        <DesignCatalogueWise />
                                        <MonthWise />
                                        <YearWise />
                                        <SalesAgingWise />
                                        <ModeofSalesWise />
                                        {/* <TeamModeofSalesWise/> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

                <div id='pdf-div'><FilterPrint /></div>

                {/* <script type="text/javascript" src={bootstrapSelectMin}></script>
            <script type="text/javascript" src={bootstrapMin}></script>
            <script type="text/javascript" src={jqueryMigrate}></script>
            <script type="text/javascript" src={jquaryMin}></script>
            <script type="text/javascript" src={main}></script>
            <script type="text/javascript" src={popperMin}></script> */}

            </ContexState>
        </div>
    )
}
