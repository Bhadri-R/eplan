import React from "react";
import { Col } from "reactstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import './auth-style.css'
// Import Images
import logoLight from "../../assets/images/logo-light.png";

const AuthSlider = () => {
    const toggle = () => {}; // Define an empty function to prevent errors

    return (
        <React.Fragment>

            <Col lg={6}>
                <div className="p-lg-5 p-4 auth-one-bg h-100">
                    <div className="bg-overlay"></div>
                    <div className="position-relative h-100 d-flex flex-column">
                        <div className="mb-4">
                            <Link to="/dashboard" className="d-block">
                                {/* <img src={logoLight} alt="" height="18" />/ */}
                            </Link>
                        </div>
                        <div className="mt-auto">
                            <div className="mb-3">
                                <i className="ri-double-quotes-l display-4 text-white"></i>
                            </div>

                            <Carousel showThumbs={false} autoPlay={true} showArrows={false} showStatus={false} infiniteLoop={true} className="carousel slide" id="qoutescarouselIndicators" >
                                <div className="carousel-inner text-center text-white pb-5">
                                    <div className="item">
                                        <p className="fs-15 fst-italic">" Invest today, retire worry-free tomorrow with ePlan! "</p>
                                    </div>
                                </div>
                                <div className="carousel-inner text-center text-white pb-5">
                                    <div className="item">
                                        <p className="fs-15 fst-italic">" Your future deserves security—let ePlan guide the way "</p>
                                    </div>
                                </div>
                                <div className="carousel-inner text-center text-white pb-5">
                                    <div className="item">
                                        <p className="fs-15 fst-italic">" Smart savings today, a comfortable future forever! "</p>
                                    </div>
                                </div>
                                <div className="carousel-inner text-center text-white pb-5">
                                    <div className="item">
                                        <p className="fs-15 fst-italic">" Plan ahead with ePlan—because peace of mind is priceless "</p>
                                    </div>
                                </div>
                             
                            </Carousel>

                        </div>
                    </div>
                </div>
            </Col>
        </React.Fragment >
    );
};

export default AuthSlider;