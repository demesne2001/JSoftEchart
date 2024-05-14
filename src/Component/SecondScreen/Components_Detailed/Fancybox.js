// import React, { useRef, useEffect } from "react"

// import { Fancybox as NativeFancybox, manageCloseBtn } from "@fancyapps/ui"
// import "@fancyapps/ui/dist/fancybox/fancybox.css"
// import { useNavigate } from 'react-router-dom';

// function Fancybox(props) {
//   const containerRef = useRef(null)
//   const navigate = useNavigate();
//   useEffect(() => {
//     const container = containerRef.current

//     const delegate = props.delegate || "[data-fancybox]"
//     const options = props.options || {}

//     //   if (document.getElementsByClassName('f-button')[4] !== null && document.getElementsByClassName('f-button')[4] !== undefined) {
//     //     document.getElementsByClassName('f-button')[4].addEventListener("click", function (event) {

//     //         navigate('/graph-detail', { replace: true })
//     //     })

//     // }
//     // NativeFancybox.manageCloseBtn()
//     NativeFancybox.bind(container, delegate, options)
    

//     return () => {
//       NativeFancybox.unbind(container)
//       // NativeFancybox.close =  ()  => {
//       //   navigate('/graph-detail', { replace: true })
  
//       // }
//       // NativeFancybox.destroy()
//       NativeFancybox.close(true)
//     }
//   })

//   return (
//     <>
//       <div ref={containerRef}>{props.children}</div>
//     </>
//   )
// }

// export default Fancybox

import React, { useRef, useEffect, PropsWithChildren } from 'react';

import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

// import { OptionsType } from '@fancyapps/ui/types/Fancybox/options';


function Fancybox(props) {
  const containerRef = useRef(null);
  const setFancyboxIsActive = props.setFancyboxIsActive || undefined;

  if (setFancyboxIsActive) {
    NativeFancybox.defaults.on = {
      init: () => {
        setFancyboxIsActive(true);
      },
      close: () => {
        setFancyboxIsActive(false);
      },
    };
  }

  const delegate = props.delegate || '[data-fancybox]';
  const options = props.options || {};

  useEffect(() => {
    const container = containerRef.current;

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);

      // !!! Commented out to prevent closing on re-render
      // NativeFancybox.close();
    };
  });

  return <div ref={containerRef}>{props.children}</div>;
}

export default Fancybox;

