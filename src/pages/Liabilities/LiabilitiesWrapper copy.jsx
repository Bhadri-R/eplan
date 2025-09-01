import React, { useState, useEffect } from 'react';
import { Row,Col , Container } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import CreateLiabilities from './CreateLiabilities';
import LiabilitiesTable from './LiabilitiesTable';
import { BASE_URL } from '../../utils/config';

const LiabilitiesWrapper = () => {
    const [liabilities, setLiabilities] = useState([]); // State to store liabilities data

    // Function to fetch liabilities data
    const fetchLiabilities = async () => {
        try {
            const authUser = JSON.parse(sessionStorage.getItem("authUser"));
            if (!authUser || !authUser.accessToken) {
                console.error("No authentication token found!");
                return;
            }

            const response = await axios.get(`${BASE_URL}/api/liability/liability/`, {
                headers: {
                    Authorization: `Bearer ${authUser.accessToken}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            console.log("Fetched liabilities:", response.data.data);

            // Data is directly in response, not response.data
            if (response) {
                setLiabilities(response);
            } else {
                setLiabilities([]);
            }
        } catch (error) {
            console.error("Error fetching liabilities:", error);
            toast.error(
                error.response?.message ||
                error.message 

            );
        }
    };

    // Fetch liabilities on initial load
    useEffect(() => {
        fetchLiabilities();
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col>
                            <CreateLiabilities fetchLiabilitiesData={fetchLiabilities} />
                            <LiabilitiesTable liabilities={liabilities} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default LiabilitiesWrapper;