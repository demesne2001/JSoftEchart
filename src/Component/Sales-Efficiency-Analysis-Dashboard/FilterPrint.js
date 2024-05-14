import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import contex from '../contex/Contex';
import { json } from 'react-router-dom';



export default function FilterPrint() {
  const filter = useContext(contex);
  const default_filter = {
    strBranch: "",
    strState: "",
    strCity: "",
    strItem: "",
    strSubItem: "",
    strItemGroup: "",
    strItemSubitem: "",
    strPurchaseParty: "",
    strDesignCodeID: "",
    strSalesParty: "",
    strSaleman: "",
    strProduct: "",
    strDesignCatalogue: "",
    strDesignCodeID: "",
    strSaleAging: "",
    strModeofSale: "",
    strTeamModeofSale: "",
    strRegionID: "",
    FromDate: "",
    ToDate: "",
    strMetalType: "",
    strDayBook: "",
    PageNo: 0,
    PageSize: 9999,
    Search: "",
    Grouping: "",
    FilterIndex: "",
    strBranchValue: "",
    strItemValue: "",
    strSubItemValue: "",
    strItemGroupValue: "",
    strItemSubitemValue: "",
    strPurchasePartyValue: "",
    strSalesPartyValue: "",
    strSalemanValue: "",
    strProductValue: "",
    strDesignCatalogueValue: "",
    strSaleAgingValue: "",
    strModeofSaleValue: "",
    strTeamModeofSaleValue: "",
    strRegionValue: "",
    strDayBookValue: "",
    strStateValue: '',
    strMonth: "",
    strFinYear: "",
    strMonthValue: ""
  }
 

  return (
    <div align='right'>
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Filter Name</th>
            <th>Filter Value</th>
          </tr>
        </thead>
        <tbody>


          {filter.state['FromDate'] !== '' ? <tr><td>From Date</td><td>{filter.state['FromDate']}</td></tr> : null}
          {filter.state['ToDate'] !== '' ? <tr><td>To Date</td><td>{filter.state['ToDate']}</td></tr> : null}
          {filter.state['strBranch'] !== '' ? <tr><td>Branch Name</td><td>{filter.state['strBranchValue']}</td></tr> : null}
          {filter.state['strState'] !== '' ? <tr><td>State Name</td><td>{filter.state['strStateValue']}</td></tr> : null}
          {filter.state['strCity'] !== '' ? <tr><td>City Name</td><td>{filter.state['strCity']}</td></tr> : null}

          {filter.state['strItem'] !== '' ? <tr><td>Item Name</td><td>{filter.state['strItemValue']}</td></tr> : null}
          {filter.state['strSubItem'] !== '' ? <tr><td>Sub Item Name</td><td>{filter.state['strSubItemValue']}</td></tr> : null}
          {filter.state['strItemGroup'] !== '' ? <tr><td>Item Group Name</td><td>{filter.state['strItemGroupValue']}</td></tr> : null}
          {filter.state['strItemSubitem'] !== '' ? <tr><td>Item Subitem Name</td><td>{filter.state['strItemSubitemValue']}</td></tr> : null}
          {filter.state['strDesignCodeID'] !== '' ? <tr><td>Purchase Party Name</td><td>{filter.state['strDesignCodeValue']}</td></tr> : null}

          {filter.state['strSalesParty'] !== '' ? <tr><td>Sales Party Name</td><td>{filter.state['strSalesPartyValue']}</td></tr> : null}
          {filter.state['strSaleman'] !== '' ? <tr><td>Saleman Name</td><td>{filter.state['strSalemanValue']}</td></tr> : null}
          {filter.state['strProduct'] !== '' ? <tr><td>Product Name</td><td>{filter.state['strProductValue']}</td></tr> : null}
          {filter.state['strDesignCatalogue'] !== '' ? <tr><td>Design Catalogue Name</td><td>{filter.state['strDesignCatalogueValue']}</td></tr> : null}
          {filter.state['strSaleAging'] !== '' ? <tr><td>Sale Aging Name</td><td>{filter.state['strSaleAgingValue']}</td></tr> : null}

          {filter.state['strModeofSale'] !== '' ? <tr><td>Mode of Sale Name</td><td>{filter.state['strModeofSaleValue']}</td></tr> : null}
          {filter.state['strTeamModeofSale'] !== '' ? <tr><td>Team Mode of Sale Name</td><td>{filter.state['strTeamModeofSaleValue']}</td></tr> : null}
          {filter.state['strRegionID'] !== '' ? <tr><td>Region Name</td><td>{filter.state['strRegionValue']}</td></tr> : null}


        </tbody>
      </Table>
    </div>)

}
