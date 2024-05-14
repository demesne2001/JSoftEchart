import React, { useContext, useEffect, useState } from 'react';
import Fancybox from './Fancybox';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import contex from '../../contex/Contex';
import post from '../../Utility/APIHandle';
import API from '../../Utility/API';
import { map } from '../../Assets/font/js/v4-shims';
import notFound from '../../Assets/image/imageNotFound.jpg'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import src from 'react-select/dist/declarations/src';

export default function Tag_Image() {
    const navigate = useNavigate();
    const contextData = useContext(contex);
    const [pagesize, setPageSize] = useState(5);
    const [pageNo, setPageNo] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [TotalCount, setTotalCount] = useState();
    const [ImageData, setImageData] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let inputdata = contextData.chartImage
    useEffect(() => {
        handleShowPhotos()

        setCurrentPage(1)
    }, [inputdata])
    useEffect(() => {
        handleShowPhotos()
    }, [])
    const settings = {

        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 0,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 2500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };
    
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            null
            // <div
            //     // className={className}
            //     // style={{ ...style, marginLeft: '100px', zIndex: '1', display: "block", background: "#094876", width: '28px', height: '28px', top: '30%', fontSize: '10px' }}
            //     // onClick={onClick}

            // />

        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;

        return (
            null
        );
    }

    async function handleShowPhotos() {
        await post(inputdata, API.GetDetailChartImage, {}, "post").then((res) => {
            var imageData = [];
            if (res.data.lstResult.length !== 0) {
                for (let i = 0; i < res.data.lstResult.length; i++) {
                    imageData.push({ 'ImagePath': res.data.lstResult[i]['ImagePath'], 'netweight': res.data.lstResult[i]['netweight'], 'barcode': res.data.lstResult[i]['barcode'] })
                }
                setImageData(imageData);
                setTotalCount(res.data.lstResult[0]['TotalCount']);
            } else {
                setImageData(imageData);
                setTotalCount(0);
            }
        })
    }

    function handleLeftFivePage() {
        if (pageNo > 0) {
            setPageNo(pageNo - 5);
        }
    }
    function handleRightFivePage() {

        if (pageNo + 5 < TotalCount) {
            setPageNo(pageNo + 5);
        }
    }

    async function handlePageNoChange(page) {

        var inputPageUpdate = { ...inputdata, ['PageNo']: page }
        setCurrentPage(page)
        await post(inputPageUpdate, API.GetDetailChartImage, {}, "post").then((res) => {
            var imageData = [];
            if (res.data.lstResult.length !== 0) {

                for (let i = 0; i < res.data.lstResult.length; i++) {
                    imageData.push({ 'ImagePath': res.data.lstResult[i]['ImagePath'], 'netweight': res.data.lstResult[i]['netweight'], 'barcode': res.data.lstResult[i]['barcode'] })
                }
                setImageData(imageData);
                // setTotalCount(res.data.lstResult[0]['TotalCount']);
            }
        })
        // for (let i = 0; i < document.getElementsByClassName('pageImageButtom').length; i++) {

        //     if (parseInt(document.getElementsByClassName('pageImageButtom')[i]['id']) === page) {

        //         document.getElementById(page).style.backgroundColor = "#e3e9ed";
        //         document.getElementById(page).style.color = "#094876";
        //         document.getElementById(page).style.border = "1px solid #094876";
        //     } else {


        //         document.getElementById(page).style.backgroundColor = "#094876";
        //         document.getElementById(page).style.color = "#e3e9ed";
        //         document.getElementById(page).style.border = "";
        //     }
        // }

    }
    // async function handleLeftOnePage() {
    //     if (currentPage > 1) {
    //         var inputPageUpdate = { ...inputdata, ['PageNo']: currentPage - 1 }
    //         setCurrentPage(currentPage - 1)
    //         await post(inputPageUpdate, API.GetDetailChartImage, {}, "post").then((res) => {
    //             var imageData = [];
    //             if (res.data.lstResult.length !== 0) {
    //                 for (let i = 0; i < res.data.lstResult.length; i++) {
    //                     imageData.push({ 'ImagePath': res.data.lstResult[i]['ImagePath'], 'netweight': res.data.lstResult[i]['netweight'], 'barcode': res.data.lstResult[i]['barcode'] })
    //                 }
    //                 setImageData(imageData);
    //                 // setTotalCount(res.data.lstResult[0]['TotalCount']);
    //             }
    //         })
    //         if (currentPage < pageNo + 2) {
    //             setPageNo(pageNo - 5)
    //         }
    //     }
    // }
    // async function handleRightOnePage() {
    //     if (currentPage < TotalCount) {


    //         var inputPageUpdate = { ...inputdata, ['PageNo']: currentPage + 1 }
    //         setCurrentPage(currentPage + 1)
    //         await post(inputPageUpdate, API.GetDetailChartImage, {}, "post").then((res) => {
    //             var imageData = [];
    //             if (res.data.lstResult.length !== 0) {
    //                 for (let i = 0; i < res.data.lstResult.length; i++) {
    //                     imageData.push({ 'ImagePath': res.data.lstResult[i]['ImagePath'], 'netweight': res.data.lstResult[i]['netweight'], 'barcode': res.data.lstResult[i]['barcode'] })
    //                 }
    //                 setImageData(imageData);
    //                 // setTotalCount(res.data.lstResult[0]['TotalCount']);
    //             }
    //         })
    //         if (currentPage > pageNo + 4) {
    //             setPageNo(pageNo + 5)
    //         }
    //     }
    // }
    // if (document.getElementsByClassName('f-button')[4] !== null && document.getElementsByClassName('f-button')[4] !== undefined) {


    //     document.getElementsByClassName('f-button')[4].addEventListener("click", function (event) {

    //         navigate('/graph-detail', { replace: true })
    //     })


    //         , "buttoncollected");
    // }


    // function openModal(e) {


    //     document.getElementById("myModal").style.display = "block";
    // }

    // function closeModal() {
    //     document.getElementById("myModal").style.display = "none";
    // }

    // var slideIndex = 1;
    // showSlides(slideIndex);

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // function currentSlide(n) {
    //     showSlides(slideIndex = n);
    // }

    // function showSlides(n) {

    //     var i;
    //     var slides = document.getElementsByClassName("mySlides");
    //     var dots = document.getElementsByClassName("demo");
    //     var captionText = document.getElementById("caption");
    //     if (n > slides.length) { slideIndex = 1 }
    //     if (n < 1) { slideIndex = slides.length }
    //     for (i = 0; i < slides.length; i++) {
    //         slides[i].style.display = "none";
    //     }
    //     for (i = 0; i < dots.length; i++) {
    //         dots[i].className = dots[i].className.replace(" active", "");
    //     }

    //     if (slides.length > 0) {
    //         slides[slideIndex - 1].style.display = "block";
    //         dots[slideIndex - 1].className += " active";
    //         captionText.innerHTML = dots[slideIndex - 1].alt;
    //     }

    // }

    function openModal() {
        setShow(true)
    }


    
    return (
        <>
            <div class="col-xl-12 col-lg-12 col-md-12 col-12">
                <div class="title-top-graphdetail">
                    <h5>Tag Image</h5>

                </div>
                <div class="graphdetailcards-silder graphdetail-fourthcard">
                    <div align='right'>Page No.{currentPage}</div>
                    {/* <div class="ag-carousel-arrow_box">
                                        <i class="js-ag-carousel-arrow_prev ag-carousel-arrow top-slider-prevarrow"></i>
                                        <i class="js-ag-carousel-arrow_next ag-carousel-arrow top-slider-nextarrow"></i>
                                    </div> */}


                    <ul id="TagImage" class="js-carousel ag-carousel_list" >
                        {ImageData.length > 0 ?
                            <Fancybox
                                options={{
                                    Carousel: {
                                        infinite: false,
                                    },
                                }}
                            >

                                <Slider  {...settings} >


                                    {
                                        ImageData.map((e, i) => {

                                            return <><li class="ag-carousel_item">
                                                <figure class="ag-carousel_figure">
                                                    <a data-fancybox="gallery" href={e['ImagePath']} data-caption={"NetWeight : " + e['netweight'] + ",  Barcode : " + e['barcode']}><img src={e['ImagePath']} /></a>
                                                    {/* <img src={e['ImagePath']} onClick={(e) => { openModal() }} class="hover-shadow cursor" /> */}
                                                    <figcaption class="ag-carousel_figcaption">
                                                        NetWeight: {e['netweight']}<br></br>{e['barcode']}
                                                    </figcaption>
                                                </figure>
                                            </li >

                                            </>
                                        })
                                    }


                                </Slider>


                            </Fancybox> :
                            <li class="ag-carousel_item">
                                <figure class="ag-carousel_figure">
                                    <img src={notFound} alt='hii' />

                                </figure>
                            </li >


                        }

                        {/* <div className='pagonationdiv'>
                            <button class="fa-solid fa-angles-left pageImageButtom" onClick={handleLeftFivePage}></button>
                            {(pageNo + 1) * 5 <= (TotalCount + (TotalCount % 5) + 1) ? <button className='pageImageButtom' id={(pageNo + 1)} onClick={() => handlePageNoChange((pageNo + 1))}>{pageNo + 1}</button> : null}
                            {(pageNo + 2) * 5 <= (TotalCount + (TotalCount % 5) + 1) ? <button className='pageImageButtom' id={(pageNo + 2)} onClick={() => handlePageNoChange((pageNo + 2))}>{pageNo + 2}</button> : null}
                            {(pageNo + 3) * 5 <= (TotalCount + (TotalCount % 5) + 1) ? <button className='pageImageButtom' id={(pageNo + 3)} onClick={() => handlePageNoChange((pageNo + 3))}>{pageNo + 3}</button> : null}
                            {(pageNo + 4) * 5 <= (TotalCount + (TotalCount % 5) + 1) ? <button className='pageImageButtom' id={(pageNo + 4)} onClick={() => handlePageNoChange((pageNo + 4))}>{pageNo + 4}</button> : null}
                            {(pageNo + 5) * 5 <= (TotalCount + (TotalCount % 5) + 1) ? <button className='pageImageButtom' id={(pageNo + 5)} onClick={() => handlePageNoChange((pageNo + 5))}>{pageNo + 5}</button> : null}
                            <button class="fa-solid fa-angles-right pageImageButtom" onClick={handleRightFivePage}></button>
                        </div> */}
                    </ul>

                </div>


            </div>
            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header class="modal-header" >
                    <h5 class="modal-title filter-modal-title">Images</h5>
                    <button class="geex-btn geex-btn__customizer-close" onClick={handleClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z"
                                fill="#ffffff" />
                            <path
                                d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z"
                                fill="#ffffff" fill-opacity="0.8" />
                        </svg>
                    </button>
                </Modal.Header>
                <Modal.Body className=''>
                    {
                        ImageData.map((e) => {
                            return (
                                <div style={{display:'flex'}}>
                                    <img src={e['ImagePath']} />
                                </div>
                            )
                        })
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal> */}

            {/* </div > */}
            {/* 
            <div id="myModal" class="modal1">
                <span class="close cursor" onClick={closeModal}>&times;</span>
                <div class="modal-content1">
                    {
                        ImageData.map((e) => {
                            return (
                                <div class="mySlides">
                                    <img src={e['ImagePath']} style={{ width: '50%', height:'50%' ,  objectFit: 'contain'}} />
                                </div>
                            )
                        })
                    }

                    <a class="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
                    <a class="next" onClick={() => plusSlides(1)}>&#10095;</a>

                    <div class="caption-container">
                        <p id="caption"></p>
                    </div>

                    <div className='modalselectImage'>
                        {
                            ImageData.map((e, i) => {
                                return (
                                    <div class="column">
                                        <img class="demo cursor" src={e['ImagePath']} style={{ width: '50%', height:'50%',   objectFit: 'contain' }} onClick={() => currentSlide(i + 1)}  />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div> */}
        </>

    )
}
