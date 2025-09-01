import React from 'react';
import CountUp from "react-countup";
import { Link } from 'react-router-dom';
import { Card, Row, CardBody, Col } from 'reactstrap';
import { RiBankLine, RiMoneyDollarCircleLine, RiBarChart2Line } from "react-icons/ri";

const Widgets = ({ assets, liabilities, netWorth }) => {


    const financialWidgets = [
        {
            id: 1,
            cardColor: "success",
            label: "Total Assets",
            badge: "ri-arrow-right-up-line",
            badgeClass: "success",
            percentage: "+12.50",
            amount: assets,
            link: "View details",
            icon: <RiBankLine />,
            iconColor: "rgb(10, 179, 156)",
            bgColor: "rgb(10, 179, 156)",
            decimals: 2,
            prefix: "$",
            separator: ","
        },
        {
            id: 2,
            cardColor: "danger",
            label: "Total Liabilities",
            badge: "ri-arrow-right-down-line",
            badgeClass: "danger",
            percentage: "-5.75",
            amount: liabilities,
            link: "View details",
            icon: <RiMoneyDollarCircleLine />,
            iconColor: "rgb(255, 99, 132)",
            bgColor: "rgb(255, 99, 132)",
            decimals: 2,
            prefix: "$",
            separator: ","
        },
        {
            id: 3,
            cardColor: "primary",
            label: "Net Worth",
            badge: "ri-arrow-right-up-line",
            badgeClass: "success",
            percentage: "+8.90",
            amount: netWorth,
            link: "View details",
            icon: <RiBarChart2Line />,
            iconColor: "rgb(64, 81, 137)",
            bgColor: "rgb(64, 81, 137)",
            decimals: 2,
            prefix: "$",
            separator: ","
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
                                        <p className="text-uppercase fw-medium text-muted text-truncate mb-0">{item.label}</p>
                                    </div>
                                    {/* <div className="flex-shrink-0">
                                        <h5 className={"fs-14 mb-0 text-" + item.badgeClass}>
                                            {item.badge ? <i className={"fs-13 align-middle " + item.badge}></i> : null} {item.percentage} %
                                        </h5>
                                    </div> */}
                                </div>
                                <div className="d-flex align-items-end justify-content-between mt-4">
                                    <div>
                                        <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                            <span className="amount-value">
                                                <CountUp
                                                    start={0}
                                                    prefix={item.prefix}
                                                    separator={item.separator}
                                                    end={item.amount}
                                                    decimals={item.decimals}
                                                    duration={4}
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