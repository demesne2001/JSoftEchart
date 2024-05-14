import React from 'react'

import jsoftInitial from '../../Assets/image/logo/jsoft-initial.png'


export default function Navbar() {

  function handleNavbar() {

    if (document.getElementsByClassName("crancy-close")[0] !== undefined) {
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
    } else {
      const element = document.getElementsByClassName("crancy-smenu")[0];
      element.classList.add("crancy-close");

      const element1 = document.getElementsByClassName("crancy-header")[0];
      element1.classList.add("crancy-close");

      const element2 = document.getElementsByClassName("crancy-adashboard")[0];
      element2.classList.add("crancy-close");

      if (document.getElementsByClassName("crancy-adashboard")[1] !== undefined) {
        const element3 = document.getElementsByClassName("crancy-adashboard")[1];
        element3.classList.add("crancy-close");
      }
    }

  }

  return (
    <div className="crancy-body-area">

      <div className="crancy-smenu" id="CrancyMenu">

        <div className="admin-menu">

          <div className="logo crancy-sidebar-padding pd-right-0">
            <a className="crancy-logo">

              <img className="crancy-logo__main" src={jsoftInitial} alt="#" />
              <img className="crancy-logo__main--dark" src={jsoftInitial} alt="#" />

              <img className="crancy-logo__main--small" src={jsoftInitial} alt="#" />
              <img className="crancy-logo__main--small--dark" src={jsoftInitial} alt="#" />
            </a>
            <div id="crancy__sicon" className="crancy__sicon close-icon" onClick={handleNavbar}>
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.5" d="m9 5 7 7-7 7" />
              </svg>
              

              {/* <i style={{fontSize:'10px'}} class='fas'>&#xf105;</i> */}
              {/* <i className="fas fa-angle-right" style={{ color: "#ffffff" }}></i> */}
            </div>
          </div>

          <div className="admin-menu__one crancy-sidebar-padding mg-top-20">

            <div className="menu-bar">
              <ul id="CrancyMenu" className="menu-bar__one crancy-dashboard-menu">
                <li><a className="collapsed"><span className="menu-bar__text">
                  <i className="fas fa-home"></i>
                  <span className="menu-bar__name">Dashboard</span></span></a>
                </li>
                <li><a className="collapsed"><span className="menu-bar__text">
                  <i className="fas fa-chart-line"></i>
                  <span className="menu-bar__name">Stock to sales</span></span></a>
                </li>
                <li><a className="collapsed"><span className="menu-bar__text">
                  <i className="fas fa-user-clock"></i>
                  <span className="menu-bar__name">Outstanding</span></span></a>
                </li>
                <li><a className="collapsed"><span className="menu-bar__text">
                  <i className="far fa-calendar-alt"></i>
                  <span className="menu-bar__name last-silderbar-title">Schedule
                    Analysis</span></span></a>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
