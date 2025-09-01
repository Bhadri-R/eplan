import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountUp from "react-countup";
import { Card, Row, CardBody, Col } from 'reactstrap';
import { RiBankLine, RiMoneyDollarCircleLine, RiBarChart2Line } from "react-icons/ri";
import { BASE_URL } from '../../utils/config'


const Widgets = () => {
    const API_URL = `${BASE_URL}/api/networth/networth/`;
    const [assets, setAssets] = useState(0);
    const [liabilities, setLiabilities] = useState(0);
    const [netWorth, setNetWorth] = useState(0);

    useEffect(() => {
        const fetchNetWorthData = async () => {
            try {
                const authUser = JSON.parse(sessionStorage.getItem("authUser"));
                if (!authUser || !authUser.accessToken) {
                    console.error("No authentication token found!");
                    return;
                }

                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${authUser.accessToken}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });

                console.log("API Response:", response);


                if (response && response.networth) {
                    const { total_assets, total_liabilities, net_worth } = response.networth;

                    // Convert currency strings to numbers
                    setAssets(parseFloat(total_assets.replace(/[^0-9.-]+/g, "")) || 0);
                    setLiabilities(parseFloat(total_liabilities.replace(/[^0-9.-]+/g, "")) || 0);
                    setNetWorth(parseFloat(net_worth.replace(/[^0-9.-]+/g, "")) || 0);
                }
            } catch (error) {
                console.error("Error fetching net worth data:", error);
            }
        };

        fetchNetWorthData();
    }, []);

    const financialWidgets = [
        {
            id: 1,
            cardColor: "success",
            label: "Total Assets",
            amount: assets,
            icon: <RiBankLine />,
            iconColor: "rgb(10, 179, 156)",
            bgColor: "rgb(10, 179, 156)",
        },
        {
            id: 2,
            cardColor: "danger",
            label: "Total Liabilities",
            amount: liabilities,
            icon: <RiMoneyDollarCircleLine />,
            iconColor: "rgb(255, 99, 132)",
            bgColor: "rgb(255, 99, 132)",
        },
        {
            id: 3,
            cardColor: "primary",
            label: "Net Worth",
            amount: netWorth,
            icon: <RiBarChart2Line />,
            iconColor: "rgb(64, 81, 137)",
            bgColor: "rgb(64, 81, 137)",
        }
    ];

    return (
        <React.Fragment>
            <Row>
                {financialWidgets.map((item, key) => (
                    <Col xl={4} md={6} key={key}>
                        <Card className="card-animate">
                            <CardBody>
                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1 overflow-hidden">
                                        <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                            {item.label}
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-end justify-content-between mt-4">
                                    <div>
                                        <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                            <span className="amount-value">
                                                <CountUp
                                                    start={0}
                                                    prefix="$"
                                                    separator=","
                                                    end={item.amount}
                                                    decimals={2}
                                                    duration={2}
                                                />
                                            </span>
                                        </h4>
                                    </div>
                                    <div className="avatar-sm flex-shrink-0">
                                        <span
                                            className="avatar-tile rounded fs-3"
                                            style={{
                                                alignItems: 'center',
                                                backgroundColor: `${item.bgColor.replace("rgb", "rgba").slice(0, -1)}, 0.1)`,
                                                color: '#fff',
                                                display: 'flex',
                                                fontWeight: '500',
                                                height: '100%',
                                                justifyContent: 'center',
                                                width: '100%',
                                            }}
                                        >
                                            <span style={{ color: item.iconColor }}>{item.icon}</span>
                                        </span>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    );
};

export default Widgets;
