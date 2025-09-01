import React, { useState, useEffect } from "react";
import { Col, Row } from 'reactstrap';
import Flatpickr from "react-flatpickr";

const Greeting = (props) => {


    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');


    useEffect(() => {
        const userData = sessionStorage.getItem("authUser");
        if (userData) {
            const user = JSON.parse(userData);
            setUserName(user.name);
            setUserRole(user.role);

        }
    }, []);






    return (
        <React.Fragment>
            <Row className="mb-3 pb-1">
                <Col xs={12}>
                    <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                        <div className="flex-grow-1">
                            <h3 className="fs-20 mb-1">Hi {userName}</h3>

                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Greeting;