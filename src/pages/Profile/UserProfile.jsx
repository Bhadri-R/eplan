import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Nav, NavItem, NavLink, Pagination, PaginationItem, PaginationLink, Progress, Row, TabContent, Table, TabPane, UncontrolledCollapse, UncontrolledDropdown } from 'reactstrap';
import classnames from 'classnames';
import { Swiper, SwiperSlide } from "swiper/react";
import  { Autoplay } from "swiper/modules";
import SwiperCore from "swiper";

//Images
import profileBg from '../../assets/images/profile-bg.jpg';
import avatar1 from '../../assets/images/users/avatar-1.jpg';
import avatar2 from '../../assets/images/users/avatar-2.jpg';
import avatar3 from '../../assets/images/users/avatar-3.jpg';
import avatar4 from '../../assets/images/users/avatar-4.jpg';
import avatar5 from '../../assets/images/users/avatar-5.jpg';
import avatar6 from '../../assets/images/users/avatar-6.jpg';
import avatar7 from '../../assets/images/users/avatar-7.jpg';
import avatar8 from '../../assets/images/users/avatar-8.jpg';

import smallImage2 from '../../assets/images/small/img-2.jpg';
import smallImage3 from '../../assets/images/small/img-3.jpg';
import smallImage4 from '../../assets/images/small/img-4.jpg';
import smallImage5 from '../../assets/images/small/img-5.jpg';
import smallImage6 from '../../assets/images/small/img-6.jpg';
import smallImage7 from '../../assets/images/small/img-7.jpg';
import smallImage9 from '../../assets/images/small/img-9.jpg';

import { projects, document } from '../../common/data';

const SimplePage = () => {

    SwiperCore.use([Autoplay]);

    const [activeTab, setActiveTab] = useState('1');
    const [activityTab, setActivityTab] = useState('1');

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const toggleActivityTab = (tab) => {
        if (activityTab !== tab) {
            setActivityTab(tab);
        }
    };

    document.title = "Profile | Velzon - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="profile-foreground position-relative mx-n4 mt-n4">
                        <div className="profile-wid-bg">
                            <img src={profileBg} alt="" className="profile-wid-img" />
                        </div>
                    </div>
                    <div className="pt-4 mb-4 mb-lg-3 pb-lg-4">
                        <Row className="g-4">
                            <div className="col-auto">
                                <div className="avatar-lg">
                                    <img src={avatar1} alt="user-img"
                                        className="img-thumbnail rounded-circle" />
                                </div>
                            </div>

                            <Col>
                                <div className="p-2">
                                    <h3 className="text-white mb-1">Anna Adame</h3>
                                    <p className="text-white text-opacity-75">Owner & Founder</p>
                                    
                                </div>
                            </Col>

                            <Col xs={12} className="col-lg-auto order-last order-lg-0">
                                <Row className="text text-white-50 text-center">
                                    <Col lg={6} xs={4}>
                                        <div className="p-2">
                                            <h4 className="text-white mb-1">24.3K</h4>
                                            <p className="fs-14 mb-0">Followers</p>
                                        </div>
                                    </Col>
                                    <Col lg={6} xs={4}>
                                        <div className="p-2">
                                            <h4 className="text-white mb-1">1.3K</h4>
                                            <p className="fs-14 mb-0">Following</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        <Col lg={12}>
                            <div>
                                <div className="d-flex">
                                    <Nav pills className="animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1"
                                        role="tablist">
                                        <NavItem>
                                            <NavLink
                                                href="#overview-tab"
                                                className={classnames({ active: activeTab === '1' }, "fs-14")}
                                                onClick={() => { toggleTab('1'); }}
                                            >
                                                <i className="ri-airplay-fill d-inline-block d-md-none"></i> <span
                                                    className="d-none d-md-inline-block">Overview</span>
                                            </NavLink>
                                        </NavItem>
                                         
                                        <NavItem>
                                            <NavLink
                                                href="#projects"
                                                className={classnames({ active: activeTab === '3' }, "fs-14")}
                                                onClick={() => { toggleTab('3'); }}
                                            >
                                                <i className="ri-price-tag-line d-inline-block d-md-none"></i> <span
                                                    className="d-none d-md-inline-block">Projects</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#documents"
                                                className={classnames({ active: activeTab === '4' }, "fs-14")}
                                                onClick={() => { toggleTab('4'); }}
                                            >
                                                <i className="ri-folder-4-line d-inline-block d-md-none"></i> <span
                                                    className="d-none d-md-inline-block">Documents</span>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <div className="flex-shrink-0">
                                        <Link to="/pages-profile-settings" className="btn btn-success"><i
                                            className="ri-edit-box-line align-bottom"></i> Edit Profile</Link>
                                    </div>
                                </div>

                                <TabContent activeTab={activeTab} className="pt-4">
                                    <TabPane tabId="1">
                                        <Row>
                                            <Col xxl={3}>
                                                <Card>
                                                    <CardBody>
                                                        <h5 className="card-title mb-5">Complete Your Profile</h5>
                                                        <Progress value={30} color="danger" className="animated-progess custom-progress progress-label" ><div className="label">30%</div> </Progress>
                                                    </CardBody>
                                                </Card>

                                                <Card>
                                                    <CardBody>
                                                        <h5 className="card-title mb-3">Info</h5>
                                                        <div className="table-responsive">
                                                            <Table className="table-borderless mb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Full Name :</th>
                                                                        <td className="text-muted">Anna Adame</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Mobile :</th>
                                                                        <td className="text-muted">+(1) 987 6543</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">E-mail :</th>
                                                                        <td className="text-muted">daveadame@velzon.com</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Location :</th>
                                                                        <td className="text-muted">California, United States
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Joining Date</th>
                                                                        <td className="text-muted">24 Nov 2021</td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </CardBody>
                                                </Card>

                                                <Card>
                                                    <CardBody>
                                                        <h5 className="card-title mb-4">Portfolio</h5>
                                                        <div className="d-flex flex-wrap gap-2">
                                                            <div>
                                                                <Link to="#" className="avatar-xs d-block">
                                                                    <span
                                                                        className="avatar-title rounded-circle fs-16 bg-body text-body">
                                                                        <i className="ri-github-fill"></i>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div>
                                                                <Link to="#" className="avatar-xs d-block">
                                                                    <span
                                                                        className="avatar-title rounded-circle fs-16 bg-primary">
                                                                        <i className="ri-global-fill"></i>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div>
                                                                <Link to="#" className="avatar-xs d-block">
                                                                    <span
                                                                        className="avatar-title rounded-circle fs-16 bg-success">
                                                                        <i className="ri-dribbble-fill"></i>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div>
                                                                <Link to="#" className="avatar-xs d-block">
                                                                    <span
                                                                        className="avatar-title rounded-circle fs-16 bg-danger">
                                                                        <i className="ri-pinterest-fill"></i>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </CardBody>
                                                </Card>

                                                <Card>
                                                    <CardBody>
                                                        <h5 className="card-title mb-4">Skills</h5>
                                                        <div className="d-flex flex-wrap gap-2 fs-15">
                                                            <Link to="#"
                                                                className="badge bg-primary-subtle text-primary">Photoshop</Link>
                                                            <Link to="#"
                                                                className="badge bg-primary-subtle text-primary">illustrator</Link>
                                                            <Link to="#"
                                                                className="badge bg-primary-subtle text-primary">HTML</Link>
                                                            <Link to="#"
                                                                className="badge bg-primary-subtle text-primary">CSS</Link>
                                                            <Link to="#"
                                                                className="badge bg-primary-subtle text-primary">Javascript</Link>
                                                            <Link to="#"
                                                                className="badge bg-primary-subtle text-primary">Php</Link>
                                                            <Link to="#"
                                                                className="badge bg-primary-subtle text-primary">Python</Link>
                                                        </div>
                                                    </CardBody>
                                                </Card>

                                                <Card>
                                                    <CardBody>
                                                        <div className="d-flex align-items-center mb-4">
                                                            <div className="flex-grow-1">
                                                                <h5 className="card-title mb-0">Suggestions</h5>
                                                            </div>
                                                            <div className="flex-shrink-0">

                                                                <UncontrolledDropdown direction='start'>
                                                                    <DropdownToggle tag="a" id="dropdownMenuLink2" role="button">
                                                                        <i className="ri-more-2-fill fs-14"></i>
                                                                    </DropdownToggle>
                                                                    <DropdownMenu>
                                                                        <DropdownItem>View</DropdownItem>
                                                                        <DropdownItem>Edit</DropdownItem>
                                                                        <DropdownItem>Delete</DropdownItem>
                                                                    </DropdownMenu>
                                                                </UncontrolledDropdown>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="d-flex align-items-center py-3">
                                                                <div className="avatar-xs flex-shrink-0 me-3">
                                                                    <img src={avatar3} alt=""
                                                                        className="img-fluid rounded-circle" />
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <div>
                                                                        <h5 className="fs-14 mb-1">Esther James</h5>
                                                                        <p className="fs-13 text-muted mb-0">Frontend
                                                                            Developer</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-shrink-0 ms-2">
                                                                    <button type="button"
                                                                        className="btn btn-sm btn-outline-success shadow-none"><i
                                                                            className="ri-user-add-line align-middle"></i></button>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center py-3">
                                                                <div className="avatar-xs flex-shrink-0 me-3">
                                                                    <img src={avatar4} alt=""
                                                                        className="img-fluid rounded-circle" />
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <div>
                                                                        <h5 className="fs-14 mb-1">Jacqueline Steve</h5>
                                                                        <p className="fs-13 text-muted mb-0">UI/UX Designer
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-shrink-0 ms-2">
                                                                    <button type="button"
                                                                        className="btn btn-sm btn-outline-success shadow-none"><i
                                                                            className="ri-user-add-line align-middle"></i></button>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center py-3">
                                                                <div className="avatar-xs flex-shrink-0 me-3">
                                                                    <img src={avatar5} alt=""
                                                                        className="img-fluid rounded-circle" />
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <div>
                                                                        <h5 className="fs-14 mb-1">George Whalen</h5>
                                                                        <p className="fs-13 text-muted mb-0">Backend
                                                                            Developer</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-shrink-0 ms-2">
                                                                    <button type="button"
                                                                        className="btn btn-sm btn-outline-success shadow-none"><i
                                                                            className="ri-user-add-line align-middle"></i></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardBody>
                                                </Card>


                                                <Card>
                                                    <CardBody>
                                                        <div className="d-flex align-items-center mb-4">
                                                            <div className="flex-grow-1">
                                                                <h5 className="card-title mb-0">Popular Posts</h5>
                                                            </div>
                                                            <div className="flex-shrink-0">
                                                                <UncontrolledDropdown direction='start'>
                                                                    <DropdownToggle tag="a" id="dropdownMenuLink1" role="button">
                                                                        <i className="ri-more-2-fill fs-14"></i>
                                                                    </DropdownToggle>
                                                                    <DropdownMenu>
                                                                        <DropdownItem>View</DropdownItem>
                                                                        <DropdownItem>Edit</DropdownItem>
                                                                        <DropdownItem>Delete</DropdownItem>
                                                                    </DropdownMenu>
                                                                </UncontrolledDropdown>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mb-4">
                                                            <div className="flex-shrink-0">
                                                                <img src={smallImage4} alt=""
                                                                    height="50" className="rounded" />
                                                            </div>
                                                            <div className="flex-grow-1 ms-3 overflow-hidden">
                                                                <Link to="#">
                                                                    <h6 className="text-truncate fs-14">Design your apps in
                                                                        your own way</h6>
                                                                </Link>
                                                                <p className="text-muted mb-0">15 Dec 2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mb-4">
                                                            <div className="flex-shrink-0">
                                                                <img src={smallImage5} alt=""
                                                                    height="50" className="rounded" />
                                                            </div>
                                                            <div className="flex-grow-1 ms-3 overflow-hidden">
                                                                <Link to="#">
                                                                    <h6 className="text-truncate fs-14">Smartest
                                                                        Applications for Business</h6>
                                                                </Link>
                                                                <p className="text-muted mb-0">28 Nov 2021</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex">
                                                            <div className="flex-shrink-0">
                                                                <img src={smallImage6} alt=""
                                                                    height="50" className="rounded" />
                                                            </div>
                                                            <div className="flex-grow-1 ms-3 overflow-hidden">
                                                                <Link to="#">
                                                                    <h6 className="text-truncate fs-14">How to get creative
                                                                        in your work</h6>
                                                                </Link>
                                                                <p className="text-muted mb-0">21 Nov 2021</p>
                                                            </div>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col xxl={9}>
                                                <Card>
                                                    <CardBody>
                                                        
                                                        <Row>
                                                            <Col xs={6} md={4}>
                                                                <div className="d-flex mt-4">
                                                                    <div
                                                                        className="flex-shrink-0 avatar-xs align-self-center me-3">
                                                                        <div
                                                                            className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                                                            <i className="ri-user-2-fill"></i>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-grow-1 overflow-hidden">
                                                                        <p className="mb-1">Designation :</p>
                                                                        <h6 className="text-truncate mb-0">Lead Designer /
                                                                            Developer</h6>
                                                                    </div>
                                                                </div>
                                                            </Col>

                                                            <Col xs={6} md={4}>
                                                                <div className="d-flex mt-4">
                                                                    <div
                                                                        className="flex-shrink-0 avatar-xs align-self-center me-3">
                                                                        <div
                                                                            className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                                                            <i className="ri-global-line"></i>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-grow-1 overflow-hidden">
                                                                        <p className="mb-1">Website :</p>
                                                                        <Link to="#" className="fw-semibold">www.velzon.com</Link>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                </Card>

                                            

                                                <Card>
                                                    <CardBody>
                                                        <h5 className="card-title">Projects</h5>
                                                        <div className="d-flex justify-content-end gap-2 mb-2">
                                                            <div className="slider-button-prev">
                                                                <div className="avatar-title fs-18 rounded px-1">
                                                                    <i className="ri-arrow-left-s-line"></i>
                                                                </div>
                                                            </div>
                                                            <div className="slider-button-next">
                                                                <div className="avatar-title fs-18 rounded px-1">
                                                                    <i className="ri-arrow-right-s-line"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Swiper className="project-swiper"
                                                            slidesPerView={3}
                                                            spaceBetween={20}
                                                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                                                            pagination={{ clickable: true }}
                                                        >

                                                            <div className="swiper-wrapper">
                                                                <SwiperSlide>
                                                                    <Card
                                                                        className="profile-project-card shadow-none profile-project-success mb-0">
                                                                        <CardBody className="p-4">
                                                                            <div className="d-flex">
                                                                                <div
                                                                                    className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5
                                                                                        className="fs-14 text-truncate mb-1">
                                                                                        <Link to="#"
                                                                                            className="text-body">ABC
                                                                                            Project Customization</Link>
                                                                                    </h5>
                                                                                    <p className="text-muted text-truncate mb-0">
                                                                                        Last Update : <span className="fw-semibold text-body">4 hr Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div className="badge bg-warning-subtle text-warning fs-10">
                                                                                        Inprogress</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div
                                                                                        className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5 className="fs-12 text-muted mb-0">
                                                                                                Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div
                                                                                                className="avatar-group-item shadow">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src={avatar4}
                                                                                                        alt=""
                                                                                                        className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="avatar-group-item shadow">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src={avatar5}
                                                                                                        alt=""
                                                                                                        className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="avatar-group-item shadow">
                                                                                                <div className="avatar-xs">
                                                                                                    <div
                                                                                                        className="avatar-title rounded-circle bg-light text-primary">
                                                                                                        A
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="avatar-group-item shadow">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src={avatar2}
                                                                                                        alt=""
                                                                                                        className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </CardBody>
                                                                    </Card>
                                                                </SwiperSlide>

                                                                <SwiperSlide>
                                                                    <Card className="profile-project-card shadow-none profile-project-danger mb-0">
                                                                        <CardBody className="p-4">
                                                                            <div className="d-flex">
                                                                                <div
                                                                                    className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5 className="fs-14 text-truncate mb-1">
                                                                                        <Link to="#" className="text-body">Client - John</Link></h5>
                                                                                    <p className="text-muted text-truncate mb-0">
                                                                                        Last Update : <span
                                                                                            className="fw-semibold text-body">1
                                                                                            hr Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div
                                                                                        className="badge bg-success-subtle text-success fs-10">
                                                                                        Completed</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div
                                                                                        className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5
                                                                                                className="fs-12 text-muted mb-0">
                                                                                                Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div
                                                                                                className="avatar-group-item shadow">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src={avatar2}
                                                                                                        alt=""
                                                                                                        className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="avatar-group-item shadow">
                                                                                                <div className="avatar-xs">
                                                                                                    <div
                                                                                                        className="avatar-title rounded-circle bg-light text-primary">
                                                                                                        C
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </CardBody>
                                                                    </Card>
                                                                </SwiperSlide>
                                                                <SwiperSlide>
                                                                    <Card
                                                                        className="profile-project-card shadow-none profile-project-info mb-0">
                                                                        <CardBody className="p-4">
                                                                            <div className="d-flex">
                                                                                <div
                                                                                    className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5
                                                                                        className="fs-14 text-truncate mb-1">
                                                                                        <Link to="#" className="text-body">Brand logo Design</Link></h5>
                                                                                    <p className="text-muted text-truncate mb-0">
                                                                                        Last Update : <span
                                                                                            className="fw-semibold text-body">2
                                                                                            hr Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div
                                                                                        className="badge bg-warning-subtle text-warning fs-10">
                                                                                        Inprogress</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div
                                                                                        className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5
                                                                                                className="fs-12 text-muted mb-0">
                                                                                                Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div
                                                                                                className="avatar-group-item shadow">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src={avatar5}
                                                                                                        alt=""
                                                                                                        className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </CardBody>
                                                                    </Card>
                                                                </SwiperSlide>
                                                                <SwiperSlide>
                                                                    <Card
                                                                        className="profile-project-card shadow-none profile-project-danger mb-0">
                                                                        <CardBody className="p-4">
                                                                            <div className="d-flex">
                                                                                <div
                                                                                    className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5
                                                                                        className="fs-14 text-truncate mb-1">
                                                                                        <Link to="#"
                                                                                            className="text-body">Project
                                                                                            update</Link></h5>
                                                                                    <p
                                                                                        className="text-muted text-truncate mb-0">
                                                                                        Last Update : <span
                                                                                            className="fw-semibold text-body">4
                                                                                            hr Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div
                                                                                        className="badge bg-success-subtle text-success fs-10">
                                                                                        Completed</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div
                                                                                        className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5
                                                                                                className="fs-12 text-muted mb-0">
                                                                                                Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div
                                                                                                className="avatar-group-item shadow">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src={avatar4}
                                                                                                        alt=""
                                                                                                        className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="avatar-group-item shadow">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src={avatar5}
                                                                                                        alt=""
                                                                                                        className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </CardBody>

                                                                    </Card>

                                                                </SwiperSlide>

                                                                <SwiperSlide>
                                                                    <Card className="profile-project-card shadow-none profile-project-warning mb-0">
                                                                        <CardBody className="p-4">
                                                                            <div className="d-flex">
                                                                                <div className="flex-grow-1 text-muted overflow-hidden">
                                                                                    <h5 className="fs-14 text-truncate mb-1">
                                                                                        <Link to="#" className="text-body">Chat App</Link></h5>
                                                                                    <p
                                                                                        className="text-muted text-truncate mb-0">
                                                                                        Last Update : <span
                                                                                            className="fw-semibold text-body">1
                                                                                            hr Ago</span></p>
                                                                                </div>
                                                                                <div className="flex-shrink-0 ms-2">
                                                                                    <div
                                                                                        className="badge bg-warning-subtle text-warning fs-10">
                                                                                        Inprogress</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="d-flex mt-4">
                                                                                <div className="flex-grow-1">
                                                                                    <div
                                                                                        className="d-flex align-items-center gap-2">
                                                                                        <div>
                                                                                            <h5
                                                                                                className="fs-12 text-muted mb-0">
                                                                                                Members :</h5>
                                                                                        </div>
                                                                                        <div className="avatar-group">
                                                                                            <div
                                                                                                className="avatar-group-item shadow">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src={avatar4}
                                                                                                        alt=""
                                                                                                        className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="avatar-group-item shadow">
                                                                                                <div className="avatar-xs">
                                                                                                    <img src={avatar5}
                                                                                                        alt=""
                                                                                                        className="rounded-circle img-fluid" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="avatar-group-item shadow">
                                                                                                <div className="avatar-xs">
                                                                                                    <div
                                                                                                        className="avatar-title rounded-circle bg-light text-primary">
                                                                                                        A
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </CardBody>
                                                                    </Card>
                                                                </SwiperSlide>
                                                            </div>
                                                        </Swiper>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                  

                                     

                                    <TabPane tabId="4">
                                        <Card>
                                            <CardBody>
                                                <div className="d-flex align-items-center mb-4">
                                                    <h5 className="card-title flex-grow-1 mb-0">Documents</h5>
                                                    <div className="flex-shrink-0">
                                                        <Input className="form-control d-none" type="file" id="formFile" />
                                                        <Label htmlFor="formFile" className="btn btn-danger"><i className="ri-upload-2-fill me-1 align-bottom"></i> Upload
                                                            File</Label>
                                                    </div>
                                                </div>
                                                <Row>
                                                    <Col lg={12}>
                                                        <div className="table-responsive">
                                                            <Table className="table-borderless align-middle mb-0">
                                                                <thead className="table-light">
                                                                    <tr>
                                                                        <th scope="col">File Name</th>
                                                                        <th scope="col">Type</th>
                                                                        <th scope="col">Size</th>
                                                                        <th scope="col">Upload Date</th>
                                                                        <th scope="col">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {(document || []).map((item, key) => (
                                                                        <tr key={key}>
                                                                            <td>
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="avatar-sm">
                                                                                        <div
                                                                                            className={`avatar-title bg-${item.iconBackgroundClass}-subtle text-${item.iconBackgroundClass} rounded fs-20`}>
                                                                                            <i className={item.icon}></i>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="ms-3 flex-grow-1">
                                                                                        <h6 className="fs-15 mb-0"><Link to="#">{item.fileName}</Link>
                                                                                        </h6>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>{item.fileType}</td>
                                                                            <td>{item.fileSize}</td>
                                                                            <td>{item.updatedDate}</td>
                                                                            <td>
                                                                                <UncontrolledDropdown direction='start'>
                                                                                    <DropdownToggle tag="a" className="btn btn-light btn-icon" id="dropdownMenuLink15" role="button">
                                                                                        <i className="ri-equalizer-fill"></i>
                                                                                    </DropdownToggle>
                                                                                    <DropdownMenu>
                                                                                        <DropdownItem><i className="ri-eye-fill me-2 align-middle text-muted" />View</DropdownItem>
                                                                                        <DropdownItem><i className="ri-download-2-fill me-2 align-middle text-muted" />Download</DropdownItem>
                                                                                        <DropdownItem divider />
                                                                                        <DropdownItem><i className="ri-delete-bin-5-line me-2 align-middle text-muted" />Delete</DropdownItem>
                                                                                    </DropdownMenu>
                                                                                </UncontrolledDropdown>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                        <div className="text-center mt-3">
                                                            <Link to="#" className="text-success "><i
                                                                className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>
                                                                Load more </Link>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </TabPane>
                                </TabContent>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    );
};

export default SimplePage;