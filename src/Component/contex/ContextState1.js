import { useState } from "react"
import contex from "./Contex"

const ContexState1 = (props) => {

    const [state, SetState] = useState({

        "strBranch": "",
        "strCompanyID": "",
        "strState": "",
        "strCity": "",
        "strItem": "",
        "strSubItem": "",
        "strItemGroup": "",
        "strRegionID": "",
        "strItemSubitem": "",
        "strPurchaseParty": "",
        "strSalesParty": "",
        "strSaleman": "",
        "strProduct": "",
        "strDesignCodeID": "",
        "strDesignCatalogue": "",
        "strSaleAging": "",
        "strModeofSale": "",
        "strTeamModeofSale": "",
        "FromDate": "",
        "ToDate": "",
        "strMetalType": "",
        "strDayBook": "",
        "PageNo": 1,
        "PageSize": 10,
        "SortBy": "wt",
        "SortByLabel": "",
        "Search": "",
        "Grouping": "",
        "strMonth": "",
        "strFinYear": "",
        "Unity": "G"

    })

    const [defaultchart, setDefaultChart] = useState({
        "strBranch": "",
        "strCompanyID": "",
        "strState": "",
        "strCity": "",
        "strItem": "",
        "strSubItem": "",
        "strItemGroup": "",
        "strRegionID": "",
        "strItemSubitem": "",
        "strPurchaseParty": "",
        "strDesignCodeID": "",
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
        "PageNo": 1,
        "PageSize": 10,
        "Search": "",
        "Grouping": ""
    });

    const [chartImage, setchartImage] = useState({
        "strBranch": "",
        "strState": "",
        "strCity": "",
        "strRegionID": "",
        "strSubItem": "",
        "strItem": "",
        "strItemGroup": "",
        "strItemSubitem": "",
        "strDesignCodeID": "",
        "strSalesParty": "",
        "strSaleman": "",
        "strProduct": "",
        "strDesignCatalog": "",
        "strSaleAging": "",
        "strMonth": "",
        "strFinYear": "",
        "PageNo": 1,
        "PageSize": 5
    });
    let Index = localStorage.getItem("ThemeIndex")
    const [ThemeIndex, setThemeIndex] = useState(Index)


    return (

        <contex.Provider value={{ state: state, SetState: SetState, defaultchart, setDefaultChart, chartImage, setchartImage, ThemeIndex, setThemeIndex }}>

            {props.children}

        </contex.Provider>

    )

}

export default ContexState1