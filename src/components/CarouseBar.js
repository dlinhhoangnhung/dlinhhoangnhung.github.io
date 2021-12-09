// import React, { useState } from 'react'

// import sl1 from '../assets/img/clouds_from_my_neighbor_totoro_by_itsendy_deb7t16-fullview.jpg'
// import sl2 from '../assets/TiqrWk.jpg'
// import a1 from '../assets/a1.jpg'
// import dataSlide from '../dataSlider'
// import ButtonSlider from './ButtonSlider'
// // import { Navbar } from 'reactstrap'
// import Navbar from './navbar.component'
// import AuthService from "./services/auth.service";


// const CarouseBar = () => {
//     const [slideIndex, setSlideIndex] = useState(1)
//     const nextSlide = () => {
//         console.log("aloo")
//         if (slideIndex !== dataSlide.length) {
//             setSlideIndex(slideIndex + 1)
//         }
//         else if (slideIndex === dataSlide.length) {
//             setSlideIndex(1)
//         }
//     }

//     const prevSlide = () => {
//         if (slideIndex !== 1) {
//             setSlideIndex(slideIndex - 1)
//         }
//         else if (slideIndex === 1) {
//             setSlideIndex(dataSlide.length)
//         }
//     }

//     const logOut = () => {
//         AuthService.logout()
//     }

//     return (
 

//         // <a href="/" onClick={logOut} >
//         //             //                                             Sign out
//         //             //                                         </a>
//         // <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
//         //     {/* <div className="carousel-indicators">
//         //         {Array.from({ length: 5 }).map((item, index) => {
//         //             return (
//         //                 <button type={slideIndex === index + 1 ? "button active" : "button"} data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
//         //             )
//         //         })}
//         //     </div> */}
//         //     {/* <div className="container-dots">
//         //         {Array.from({ length: 5 }).map((item, index) => {
//         //             return (
//         //                 <div className={slideIndex === index + 1 ? "dot active" : "dot"}></div>
//         //             )
//         //         })}
//         //     </div> */}
//         //     <div className="carousel-inner">
//         //         {dataSlide.map((obj, index) => {
//         //             return (
//         //                 <div key={obj.id}
//         //                     className={slideIndex === index + 1 ? "carousel-item active" : "carousel-item"}>
//         //                     <Navbar />

//         //                     <img src={`http://localhost:3000/Imgs/img${index + 1}.png`} className="w-768 d-block w-100" alt="..." />


//         //                     {/* <img src={sl1} className="d-block w-100" alt="..." /> */}
//         //                     <div className="carousel-caption d-none d-md-block">
//         //                         <h5>First slide label</h5>
//         //                         <p>Some representative placeholder content for the first slide.</p>
//         //                     </div>
//         //                 </div>
//         //             )
//         //         })}
//         //     </div>
//         //     <ButtonSlider moveSlide={nextSlide} direction={"next"} />
//         //     <ButtonSlider moveSlide={prevSlide} direction={"prev"} />
//         //     {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
//         //         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//         //         <span className="visually-hidden">Previous</span>
//         //     </button>
//         //     <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
//         //         <span className="carousel-control-next-icon" aria-hidden="true"></span>
//         //         <span className="visually-hidden">Next</span>
//         //     </button> */}
//         // </div>
//     );
// }

// export default CarouseBar


