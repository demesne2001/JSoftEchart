import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as htmlToImage from 'html-to-image'
import { Buffer } from 'buffer';
import CreatContext from './../../contex/Contex';
import post from '../../Utility/APIHandle';
import API from '../../Utility/API';

const ExportToExcel = ({ tableTitles }) => {

    const con = useContext(CreatContext);
    let inputdata = con.state;

    let flag1 = con.flagExcel;

    useEffect(() => {


        if (flag1 !== 0) {
            setTimeout(() => {
              exporttoimage()
            }, 20000);
            exportToExcel()
            
        }

    }, [flag1])


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
    const [data13, setdata13] = useState([])
    const [data14, setdata14] = useState([])
    const [data15, setdata15] = useState([])
    const [data16a, setdata16a] = useState([])
    const [data17b, setdata17b] = useState([])
    const [data18, setdata18] = useState([])
    const [data19, setdata19] = useState([])
    const [data20, setdata20] = useState([])
    const [data21, setdata21] = useState([])
    const [data16, setdata16] = useState(uuidv4())    



    const [input16, setinput16] = useState({
        "Base64": "",
        "Extension": "",
        "LoginID": ""
    })

    const [input17, setinput17] = useState({
        "FileName": ""
    })

    const apiData = [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15, data16a, data17b, data18, data19, data20, data21]

    const fileName = "myfile";

    let count = 0
    let array1 = []
    const [array, setarray] = useState(array1)
    let obj1 = []
    const [obj, setobj] = useState([])
    let flag111 = []



    const list11 = [["From Date ", con.state['FromDate']], ["To Date", con.state['ToDate']], ["MetalType", con.state['strMetalType']], ["Day Book Selection", con.state['strDayBookValue']],
    ["Branch", con.state['strBranchValue']],
    ["Region", con.state['strRegionValue']], ["State", con.state['strStateValue']], ["City", con.state['strCity']],
    ["Item Group", con.state['strItemGroupValue']], ["Product", con.state['strProductValue']], ["Item", con.state['strItemValue']],
    ["Sub-Item", con.state['strSubItemValue']], ["Item with Sub-item", con.state['strItemSubitemValue']], ["Design Catalogue", con.state['strDesignCatalogueValue']],
    ["Saleman", con.state['strSalemanValue']], ["Mode of Sale", con.state['strModeofSaleValue']], ["Sale Aging", con.state['strSaleAgingValue']],
    ["Design", con.state['strPurchasePartyValue']], ["Sales Party", con.state['strSalesPartyValue']], ["Month", con.state['strMonth']]]



    useEffect(() => {

        getData();
        getData2();
        getData3();
        getData4();
        getData5();
        getData6();
        getData7();
        getData8();
        getData9();
        getData10();
        getData11();
        getData12();
        getData13();
        getData14();
        getData15();
        getData16a();
        getData17b();
        getData18();
        getData19();
        getData20();
        getData21();

    }, [inputdata])

    useEffect(() => {
        setTimeout(() => {

            exporttoimage()
        }, 20000);
    }, [inputdata])



    const dd = localStorage.getItem('token')

    //   const authAxios = axios.create({
    //     baseURL: 'http://192.168.1.208:2024/StockToSales/GetStockToSales',
    //     headers: {
    //       Authorization: `Bearer ${dd}`,
    //     },
    //   });


    function uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
          (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );
      }

    function getData() {
        inputdata = { ...inputdata, ['Grouping']: 'a.BranchID,b.BranchName' }

        post(inputdata, API.CommonChart, {}, "post")
            .then((response) => {

                setdata1(response.data.lstResult);

                array1.push({ "index": 1, "length": response.data.lstResult.length })

            })
    }
    function getData2() {
        inputdata = { ...inputdata, ['Grouping']: 'k.stateID,k.Statename' }
        post(inputdata, API.CommonChart, {}, "post")
            .then((response) => {
                setdata2(response.data.lstResult);

                array1.push({ "index": 2, "length": response.data.lstResult.length })

            })
    }

    function getData3() {
        inputdata = { ...inputdata, ['Grouping']: 'c.cityname' }
        post(inputdata, API.CommonChart, {}, "post")
            .then((response) => {
                setdata3(response.data.lstResult);

                array1.push({ "index": 3, "length": response.data.lstResult.length })

            })
    }
    function getData4() {
        inputdata = { ...inputdata, ['Grouping']: 'l.RegionID,l.RegionName' }
        post(inputdata, API.CommonChart, {}, "post")
            .then((response) => {
                setdata4(response.data.lstResult);

                array1.push({ "index": 4, "length": response.data.lstResult.length })


            })
    }
    function getData5() {
        inputdata = { ...inputdata, ['Grouping']: 'o.ItemGroupId,o.GroupName' }
        post(inputdata, API.CommonChart, {}, "post")
            .then((response) => {
                setdata5(response.data.lstResult);

                array1.push({ "index": 5, "length": response.data.lstResult.length })


            })
    }
    function getData6() {
        inputdata = { ...inputdata, ['Grouping']: 'e.subitemID,e.subItemName' }
        post(inputdata, API.CommonChart, {}, "post")
            .then((response) => {
                setdata6(response.data.lstResult);

                array1.push({ "index": 6, "length": response.data.lstResult.length })


            })
    }
    function getData7() {
        inputdata = { ...inputdata, ['Grouping']: 'd.itemID,d.ItemName' }

        post(inputdata, API.CommonChart, {}, "post")

            .then((response) => {
                // if (response.data.lstResult[0]["Total"] !== null) {
                setdata7(response.data.lstResult);

                array1.push({ "index": 7, "length": response.data.lstResult.length })


                // }
            })
    }
    function getData8() {
        inputdata = { ...inputdata, ['Grouping']: 'f.ItemSubNAme,f.ItemSubID' }
        post(inputdata, API.CommonChart, {}, "post")
            .then((response) => {
                setdata8(response.data.lstResult);

                array1.push({ "index": 8, "length": response.data.lstResult.length })

            })
    }
    function getData9() {
        inputdata = { ...inputdata, ['Grouping']: 'g.DesigncodeID,g.DesignCode' }
        post(inputdata, API.CommonChart, {}, "post")
            .then((response) => {
                setdata9(response.data.lstResult);

                array1.push({ "index": 9, "length": response.data.lstResult.length })


            })
    }
    function getData10() {
        inputdata = { ...inputdata, ['Grouping']: 'a.accountID,c.AccountName' }
        post(inputdata, API.CommonChart, {}, "post")
            .then((response) => {
                setdata10(response.data.lstResult);

                array1.push({ "index": 10, "length": response.data.lstResult.length })

                // setarray([ ...array , ...array1])

            })
    }
    function getData11() {
        inputdata = { ...inputdata, ['Grouping']: 'h.SalesmanID,h.SalesmanNAme' }
        post(inputdata, API.CommonChart, {}, "post")
            .then((response) => {
                setdata11(response.data.lstResult);

                array1.push({ "index": 11, "length": response.data.lstResult.length })

            })
    }
    function getData12() {
        inputdata = { ...inputdata, ['Grouping']: 'i.ProductId,i.ProductName' }
        post(inputdata, API.CommonChart, {}, "post")
            .then((response) => {
                setdata12(response.data.lstResult);

                array1.push({ "index": 12, "length": response.data.lstResult.length })


            })
    }
    function getData13() {
        inputdata = { ...inputdata, ['Grouping']: 'j.designCatalogID,j.DesignNo' }
        post(inputdata, API.CommonChart, {}, "post")
            .then((response) => {
                setdata13(response.data.lstResult);


                array1.push({ "index": 13, "length": response.data.lstResult.length })

            })
    }
    function getData14() {
        inputdata = { ...inputdata, ['Grouping']: 'datename(month,a.voucherDate)' }
        post(inputdata, API.CommonChart, {}, "post")
            .then((response) => {
                setdata14(response.data.lstResult);


                array1.push({ "index": 14, "length": response.data.lstResult.length })

            })
    }
    function getData15() {
        inputdata = { ...inputdata, ['Grouping']: 'M.FinYearID,m.YearCode' }
        post(inputdata, API.CommonChart, {}, "post")
            .then((response) => {
                setdata15(response.data.lstResult);

                array1.push({ "index": 15, "length": response.data.lstResult.length })


            })
    }
    function getData16a() {
        inputdata = { ...inputdata, ['Grouping']: 'a.[rd.caption]' }
        post(inputdata, API.CommonChart, {}, "post")
            .then((response) => {
                setdata16a(response.data.lstResult);


                array1.push({ "index": 16, "length": response.data.lstResult.length })

            })
    }
    function getData17b() {
        inputdata = { ...inputdata, ['Grouping']: 'a.ChallanGenerateTypeID,N.ChallanGenerateType' }
        post(inputdata, API.CommonChart, {}, "post")
            .then((response) => {
                setdata17b(response.data.lstResult);


                array1.push({ "index": 17, "length": response.data.lstResult.length })

            })
    }
    function getData18() {
        post(inputdata, API.GetSalesEfficiencyCard, {}, "post")
            .then((response) => {
                setdata18(response.data.lstResult);


                array1.push({ "index": 18, "length": response.data.lstResult.length })
            })
    }
    function getData19() {
        post(inputdata, API.GetReturnTrendCard, {}, "post")
            .then((response) => {
                setdata19(response.data.lstResult);

                array1.push({ "index": 19, "length": response.data.lstResult.length })


            })
    }
    function getData20() {
        post(inputdata, API.GetCollectionCard, {}, "post")
            .then((response) => {
                setdata20(response.data.lstResult);

                array1.push({ "index": 20, "length": response.data.lstResult.length })


            })
    }
    function getData21() {
        post(inputdata, API.GetStockAnalysisCard, {}, "post")
            .then((response) => {
                setdata21(response.data.lstResult);

                setarray(array1)
                setobj(obj)
            })
    }

    function getData16(img) {

        setinput16({ Base64: img, Extension: "png", LoginID: data16.toString() + ".png" })

        axios.post('http://103.131.196.61:52202/Common/uploadImage', { Base64: img, Extension: "png", LoginID: data16.toString() })
            .then((response) => {
                // setdata16(data16 + 1);

            })
    }

    function getData17(img) {


        setinput17({ FileName: data16.toString() + ".png" })
        axios.post('http://103.131.196.61:52202/Common/DeleteFile', { FileName: data16.toString() + ".png" })
            .then((response) => {

            })
    }

    function exporttoimage() {
        var node = document.getElementById('rootElementId');

        htmlToImage.toPng(node)
            .then(function (dataUrl) {
                document.getElementById("downloadExcel").style.color = "#0d4876";
                document.getElementById("downloadExcel").style.pointerEvents = "";
                var img = new Image();
                img.src = dataUrl;



                getData16(dataUrl)
                getData17(dataUrl)
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    }


    const exportToExcel = async () => {
        // var node = ;

        htmlToImage.toPng(document.getElementById('rootElementId'))
            .then(function (dataUrl) {
                document.getElementById("downloadExcel").style.pointerEvents = "";
                // var img = new Image();
                // img.src = dataUrl;



                getData16(dataUrl)
                getData17(dataUrl)
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });

        const workbook = new ExcelJS.Workbook();

        const ws1 = workbook.addWorksheet('ChartData');

        // const title = ['FILTER']  //array
        // ws1.addRow(title)


        if (!list11 || !list11[0]) {
            console.error('Table or table[0] is null or undefined');
            return [];
        }
        if (list11 && list11.length > 0) {

            const header2 = ['FilterName', 'Filtervalue']

            const header = list11.map((item) => Object.keys(item)).flat();

            ws1.addRow(header2);
            if (header.length === 0 || header.length === 'undefined') {
                header = Object.keys(list11[1])
            }


            list11.forEach(item => {
                const value = Object.values(item);

                if (value[1] !== '') {
                    ws1.addRow(value)
                    flag111.push(value)

                    count++

                }
                obj1 = [count + 3]
                setobj([count + 3])

            })
        }





        const rows = apiData.map((table, index) => {

            const titleRow = [tableTitles[index],];   //array

            if (!table || !table[0]) {
                console.error('Table or table[0] is null or undefined');
                return [];
            }

            const headerRow = Object.keys(table[0]).map((key) => (key));
            if (headerRow.length === 0 || headerRow.length === 'undefined') {
                headerRow = Object.keys(table[1]).map((key) => (key));
            }


            const dataRows = table.map((row) =>
                Object.values(row).map((cell) => {
                    return cell;
                })
            );

            return [titleRow, headerRow, ...dataRows, ([]), ([])];  //return arrays of array //2 empty row
        })
            .reduce((acc, curr) => acc.concat(curr), [])

        ws1.addRows(rows)



        array.sort((a, b) => a.index - b.index); //sort array







        for (var i = 0; i < array.length; i++) {

            if (i === 0) {
                if (array[i]['length'] !== 0) {
                    obj1.push((flag111.length + 3) + array[i]['length'] + 4)
                } else {
                    obj1.push((obj1[i]))
                }
            } else {
                if (array[i]['length'] !== 0) {
                    obj1.push((obj1[i] + array[i]['length'] + 4))

                } else {
                    obj1.push((obj1[i]))
                }
            }
        }


        for (let i = 0; i < 2; i++) {
            ws1.getRow([i]).font = { bold: true, underline: true, size: 13 };
        }



        //     for (let i = 0; i < obj1.length; i++) {
        //       if ( 'C' + obj1[i].toString()!== "") {
        //         ['A' + obj1[i].toString(), 'B' + obj1[i].toString(), 'C' + obj1[i].toString()].map(key => {
        //           ws1.getCell(key).fill = {
        //             type: 'pattern',
        //             pattern: 'solid',
        //             fgColor: { argb: 'EAC8FC' },
        //           };
        //           ws1.getCell(key).border = {
        //             top: { style: 'thin' },
        //             left: { style: 'thin' },
        //             bottom: { style: 'thin' },
        //             right: { style: 'thin' }
        //           };
        //         });


        //       }
        //   }



        for (let i = 0; i < obj1.length; i++) {
            ws1.getRow(obj1[i] - 1).font = { bold: true, size: 20, underline: true, name: 'Calibri', color: { argb: '0d4876' } };
            ws1.getRow(obj1[i]).font = { bold: true, size: 13, color: { argb: 'D20103' } }
        }

        for (let i = 0; i < 1000; i++) {                               // FONT LEFT
            ws1.getRow(i).alignment = { horizontal: "left" }
        }
        ws1.getRow(1).font = { bold: true, size: 15, color: { argb: 'D20103' } }



        ws1.columns.forEach(function (column, i) {                       // increase cell size
            let maxLength = 0;
            column["eachCell"]({ includeEmpty: true }, function (cell) {
                var columnLength = cell.value ? cell.value.toString().length : 20;
                if (columnLength > maxLength) {
                    maxLength = columnLength;
                }
            });
            column.width = maxLength < 10 ? 15 : maxLength;
        });
        for (let i = 0; i < ws1.rowCount; i++) {
            ws1.getRow(i).height = 25; // Set row height to 20
        }




        const response =  await fetch(`http://103.131.196.61:52202/image/${(data16).toString() + ".png"}`);


        const image = await response.arrayBuffer();

        const base64Image = Buffer.from(image).toString('base64');


        const ws2 = workbook.addWorksheet('DashBoard');

        const imageId = workbook.addImage({
            base64: base64Image,
            extension: 'png',
        });
        if (window.innerWidth <= 768) {
            ws2.addImage(imageId, {
                tl: { col: 1, row: 1 },
                ext: { width: 250, height: 2000 },
            });

        } else if (window.innerWidth <= 1000) {
            ws2.addImage(imageId, {
                tl: { col: 1, row: 1 },
                ext: { width: 800, height: 2000 },
            });

        } else {
            ws2.addImage(imageId, {
                tl: { col: 1, row: 1 },
                ext: { width: 1500, height: 2000 },
            });

        }

        const buffer =  await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer]);
        saveAs(blob, `${fileName}.xlsx`);
        obj1 = []
    };

    return (
        <>
            {/* <button className='btn btn-success' onClick={exportToExcel} >
        Export Data To Excel
      </button> */}
        </>
    );
};

export default ExportToExcel;