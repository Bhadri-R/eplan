import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import CreateLiabilities from './CreateLiabilities';
import LiabilitiesTable from './LiabilitiesTable';
import { BASE_URL } from '../../utils/config';

const LiabilitiesWrapper = () => {
    const [liabilities, setLiabilities] = useState([]); // State to store liabilities data
    const [refreshKey, setRefreshKey] = useState(0); // State to trigger refresh
    const [loading, setLoading] = useState(false); // Add loading state

    // Function to fetch liabilities data
    const fetchLiabilities = async () => {
        setLoading(true); // Set loading to true when fetching starts
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

            console.log("Fetched liabilities:", response);

            // Data is in response.data.data
            if (response.data && Array.isArray(response.data)) {
                setLiabilities(response.data); // Set data from response.data.data
            } else {
                setLiabilities([]); // Set empty array if no data
            }
        } catch (error) {
            console.error("Error fetching liabilities:", error);
            toast.error(
                error.response?.message || error.message || "Error fetching liabilities."
            );
            setLiabilities([]); // Set empty array on error
        } finally {
            setLoading(false); // Set loading to false when fetching is done
        }
    };

    // Fetch liabilities on initial load and when refreshKey changes
    useEffect(() => {
        fetchLiabilities();
    }, [refreshKey]);

    // Function to trigger a refresh
    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col>
                            <CreateLiabilities fetchLiabilitiesData={handleRefresh} />
                            <LiabilitiesTable 
                                liabilities={liabilities} 
                                refreshLiability={refreshKey} 
                                loading={loading} // Pass loading state
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default LiabilitiesWrapper;