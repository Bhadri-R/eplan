import React, { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import AssestsAllocationGraph from "./AssestsAllocationGraph";
import RuleofHundresAssetsAllocation from "./AssestsAllocationGraph";


import EplanGraph from "./EplanGraph";
import "./style.css";
import { BASE_URL } from '../../../utils/config'

const EnterPriseUserPie = () => {
    const [chartSize, setChartSize] = useState({ width: "100%", height: "400px" });

    useEffect(() => {
        // Function to update chart size based on screen width
        const updateChartSize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setChartSize({ width: "100%", height: "300px" }); // Mobile view
            } else if (width < 1024) {
                setChartSize({ width: "100%", height: "350px" }); // Tablet view
            } else {
                setChartSize({ width: "100%", height: "400px" }); // Desktop view
            }
        };

        updateChartSize(); // Call on mount
        window.addEventListener("resize", updateChartSize); // Listen to resize

        return () => window.removeEventListener("resize", updateChartSize);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            document.querySelectorAll('g[stroke*="gradient-id-249"]').forEach((el) => {
                el.style.display = "none";
            });
        }, 100);
    }, []);

    useEffect(() => {
        /* Apply Theme */
        am4core.useTheme(am4themes_animated);

        /* 📊 Rule of 100 Chart */
        let chart100 = am4core.create("chart100div", am4charts.PieChart3D);
        chart100.hiddenState.properties.opacity = 0;
        chart100.legend = new am4charts.Legend();
        chart100.data = [
            { category: "Protected", value: 5, color: am4core.color("#FFD700") }, // Yellow
            { category: "Wall Street", value: 92, color: am4core.color("#FF0000") }, // Red
            { category: "Bank", value: 4, color: am4core.color("#008000") }, // Green
        ];

        let series100 = chart100.series.push(new am4charts.PieSeries3D());
        series100.dataFields.value = "value";
        series100.dataFields.category = "category";
        series100.slices.template.propertyFields.fill = "color";
        series100.labels.template.text = "{category} {value}%";

        /* Add Labels */
        series100.labels.template.wrap = true;
        series100.labels.template.maxWidth = 100;
        series100.labels.template.fontSize = 14;
        series100.labels.template.fill = am4core.color("#000");

        return () => chart100.dispose();
    }, []);

    return (

        <>
            <Row>
                <Col xl={12}>
                    <Card>
                        <CardHeader className="align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Current Asset Allocation</h4>
                        </CardHeader>
                        <CardBody className="d-flex justify-content-center align-items-center">
                            <div id="chart100div" style={chartSize}></div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl={12}>
                    <Card>
                        <CardHeader className="align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Current Asset Allocation</h4>
                        </CardHeader>
                        <CardBody>
                            <AssestsAllocationGraph />
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={12}>
                    <Card>
                        <CardHeader className="align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Rule of 100 Assest Allocation</h4>

                        </CardHeader>
                        <CardBody>
                            <RuleofHundresAssetsAllocation />
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={12}>
                    <Card>
                        <CardHeader className="align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">My ePlan Assest Allocation</h4>

                        </CardHeader>
                        <CardBody>
                            <EplanGraph />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </>

    );
};

export default EnterPriseUserPie;
