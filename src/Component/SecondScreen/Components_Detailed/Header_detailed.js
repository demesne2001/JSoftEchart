import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import post from '../../Utility/APIHandle';
import API from '../../Utility/API';
import contex from "../../contex/Contex";



export default function Header_detailed() {
    const contexData = useContext(contex);
    const [fullscreen, setFullScreen] = useState(false);
    const [syncDate, setSyncDate] = useState()
    let preDefinedThemes = [{
        name: 'vintage',
        background: '#fef8ef',
        theme: [
          '#d87c7c', '#919e8b', '#d7ab82', '#6e7074', '#61a0a8',
          '#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b'
        ]
      }, {
        name: 'dark',
        background: '#333',
        theme: [
          '#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53',
          '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c',
          '#f49f42'
        ]
      }, {
        name: 'westeros',
        background: 'transparent',
        theme: [
          '#516b91', '#59c4e6', '#edafda', '#93b7e3', '#a5e7f0',
          '#cbb0e3'
        ]
      }, {
        name: 'essos',
        background: 'rgba(242,234,191,0.15)',
        theme: [
          '#893448', '#d95850', '#eb8146', '#ffb248', '#f2d643',
          '#ebdba4'
        ]
      }, {
        name: 'wonderland',
        background: 'transparent',
        theme: [
          '#4ea397', '#22c3aa', '#7bd9a5', '#d0648a', '#f58db2',
          '#f2b3c9'
        ]
      }, {
        name: 'walden',
        background: 'rgba(252,252,252,0)',
        theme: [
          '#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad',
          '#96dee8'
        ]
      }, {
        name: 'chalk',
        background: '#293441',
        theme: [
          '#fc97af', '#87f7cf', '#f7f494', '#72ccff', '#f7c5a0',
          '#d4a4eb', '#d2f5a6', '#76f2f2'
        ]
      }, {
        name: 'infographic',
        background: 'transparent',
        theme: [
          '#C1232B', '#27727B', '#FCCE10', '#E87C25', '#B5C334',
          '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
          '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
        ]
      }, {
        name: 'macarons',
        background: 'transparent',
        theme: [
          '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
          '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
          '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
          '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
        ]
      }, {
        name: 'roma',
        background: 'transparent',
        theme: [
          '#E01F54', '#001852', '#f5e8c8', '#b8d2c7', '#c6b38e',
          '#a4d8c2', '#f3d999', '#d3758f', '#dcc392', '#2e4783',
          '#82b6e9', '#ff6347', '#a092f1', '#0a915d', '#eaf889',
          '#6699FF', '#ff6666', '#3cb371', '#d5b158', '#38b6b6'
        ]
      }, {
        name: 'shine',
        background: 'transparent',
        theme: [
          '#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa',
          '#339ca8', '#cda819', '#32a487'
        ]
      }, {
        name: 'purple-passion',
        background: 'rgba(91,92,110,1)',
        theme: [
          '#8a7ca8', '#e098c7', '#8fd3e8', '#71669e', '#cc70af',
          '#7cb4cc'
        ]
      }, {
        name: 'halloween',
        background: 'rgba(51,51,51,1)',
        theme: [
          '#ff715e', '#ffaf51', '#ffee51', '#797fba', '#715c87'
        ]
      }];
    useEffect(() => {
        getSyncDate()
        const element = document.getElementsByClassName("crancy-smenu")[0];
        element.classList.remove("crancy-close");

        const element1 = document.getElementsByClassName("crancy-header")[0];
        element1.classList.remove("crancy-close");

        const element2 = document.getElementsByClassName("crancy-adashboard")[0];
        element2.classList.remove("crancy-close");

        if (document.getElementsByClassName("crancy-adashboard")[1] !== undefined) {
            const element3 = document.getElementsByClassName("crancy-adashboard")[1];
            element3.classList.remove("crancy-close");
        }
    }, [])

    function Handlefullscreen() {
        if (fullscreen === true) {
            setFullScreen(false);
            document.exitFullscreen();
        } else {
            setFullScreen(true);
            var ele = document.documentElement;
            ele.requestFullscreen();
        }
    }

    async function getSyncDate() {
        await post({}, API.GetDefaultScreenData, {}, 'post')
            .then((res) => {
                setSyncDate(res.data.lstResult[0].SyncDate)
            })
    }



    const navigate = useNavigate()

    function handleNavigation() {
        const element = document.getElementsByClassName("crancy-smenu")[0];
        element.classList.remove("crancy-close");

        const element1 = document.getElementsByClassName("crancy-header")[0];
        element1.classList.remove("crancy-close");

        const element2 = document.getElementsByClassName("crancy-adashboard")[0];
        element2.classList.remove("crancy-close");
        navigate('/Home', { replace: true })
    }

    function handleNavbar() {

        if (document.getElementsByClassName("crancy-close")[0] !== undefined) {
            const element = document.getElementsByClassName("crancy-smenu")[0];
            element.classList.remove("crancy-close");

            const element1 = document.getElementsByClassName("crancy-header")[0];
            element1.classList.remove("crancy-close");

            const element2 = document.getElementsByClassName("crancy-adashboard")[0];
            element2.classList.remove("crancy-close");

            const element3 = document.getElementsByClassName("crancy-adashboard")[1];
            element3.classList.remove("crancy-close");
        } else {
            const element = document.getElementsByClassName("crancy-smenu")[0];
            element.classList.add("crancy-close");

            const element1 = document.getElementsByClassName("crancy-header")[0];
            element1.classList.add("crancy-close");

            const element2 = document.getElementsByClassName("crancy-adashboard")[0];
            element2.classList.add("crancy-close");

            const element3 = document.getElementsByClassName("crancy-adashboard")[1];
            element3.classList.add("crancy-close");
        }

    }

    function handlerOnTheme(e) {

        if (document.getElementById("open-modal").className === 'modal-window') {
          document.getElementById("open-modal").className = 'modal-window-open'
        } else {
          document.getElementById("open-modal").className = 'modal-window'
        }
      }
    
     
      function selectPreDefinedTheme(id) {
        contexData.settheme(id)
        contexData.setThemeIndex(id)
        
      };

    return (
        <header class="crancy-header">
            <div class="container g-0">
                <div class="row g-0">
                    <div class="col-12">
                        <div class="crancy-header__inner">
                            <div class="crancy-header__middle">
                                <div class="crancy-header__left">
                                    <div class="crancy-header__nav-bottom">
                                        <div class="logo crancy-sidebar-padding">
                                            <a class="crancy-logo">
                                                <img
                                                    class="crancy-logo__main"
                                                    src="image/logo/jsoft-initial.png"
                                                />
                                                <img
                                                    class="crancy-logo__main--small"
                                                    src="image/logo/jsoft-initial.png"
                                                />
                                            </a>
                                        </div>
                                    </div>

                                    <div id="crancy__sicon" class="crancy__sicon close-icon" onClick={handleNavbar}>
                                        <i class="fas fa-angle-left" style={{ color: '#ffffff' }}></i>
                                    </div>
                                </div>
                                <div class="geex-content__header">
                                    <div class='geex-header-title-date'>
                                        <div class="geex-content__header__content">
                                            <div class="geex-content__header__customizer">
                                                <h2 class="geex-content__header__title">
                                                    Sales Efficiency Analysis Dashboard
                                                </h2>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="geex-content__header__action">
                                        <div class="geex-content__header__action__wrap">
                                            <ul class="geex-content__header__quickaction">
                                                <li class="from-date-to-date-header__quickaction">
                                                    <h5>
                                                        Last Sync :
                                                        <span class="text-muted"
                                                        >{syncDate}</span
                                                        >
                                                    </h5>
                                                </li>
                                                <li class="geex-content__header__quickaction__item">
                                                    <div
                                                        class="geex-content__header__quickaction__link crancy-header__alarm top-header-icon"
                                                        id="crancy-header__full"
                                                    >
                                                        <i class="fas fa-expand-alt" onClick={Handlefullscreen}></i>
                                                    </div>
                                                </li>
                                                <li class="geex-content__header__quickaction__item">
                                                    <div
                                                        class="geex-content__header__quickaction__link"
                                                    >
                                                        <i class="fas fa-sync"></i>
                                                    </div>
                                                </li>
                                                <li class="geex-content__header__quickaction__item">
                                                    <a>
                                                        <div
                                                            class="geex-content__header__quickaction__link"
                                                        >
                                                            <i class="fas fa-reply-all" onClick={handleNavigation} ></i>
                                                        </div>
                                                    </a>
                                                </li>

                                                <li className="geex-content__header__quickaction__item">
                            <div
                              className="geex-content__header__quickaction__link  geex-btn__customizer"
                              id="thememodal"
                            >
                              <i class="fa-solid fa-palette" onClick={handlerOnTheme}></i>
                              <div id="open-modal" class="modal-window">
                                <div>
                                  <div class="header22">
                                    <h2 class="logo22">Default Themes</h2>
                                    <div class="header-right22">
                                    <button onClick={handlerOnTheme}>X</button>
                                    </div>
                                  </div>
                                  <hr style={{marginBottom:'0'}}/>
                                  <div id="theme-builder">
                                    <div class="container-fluid" id="content">
                                      <div id="acc-port" class="panel-group">
                                        <div class="panel panel-default">
                                          <div id="acc-port-body" >
                                            <div class="panel-body">
                                              <div class="port-row">
                                                <div class="btn-group" role="group">
                                                  <button type="button" class="btn btn-outline-success" onClick={()=> {selectPreDefinedTheme(13)}} >
                                                    Reset
                                                  </button>
                                                </div>
                                              </div>
                                              <form class="form-horizontal">
                                                <hr />

                                                <div >
                                                  {preDefinedThemes.map((group, index) => {
                                                    return (
                                                      <>
                                                        <div className="col-sm-3" key={index}>
                                                          <a className="theme-plan-group" onClick={() => selectPreDefinedTheme(index)} style={{ backgroundColor: group.background }} title={group.name}>
                                                            {group.theme.map((color, colorIndex) => (
                                                              <div className="theme-plan-color" key={colorIndex} style={{ backgroundColor: color }}></div>
                                                            ))}
                                                          </a>
                                                        </div>

                                                      </>
                                                    )
                                                  })}
                                                </div>

                                              </form>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                    </div>
                                  </div>

                                </div>
                              </div>



                            </div>
                          </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}



