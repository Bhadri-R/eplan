import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import AssestsAllocationGraph from './AssestsAllocationGraph'
import EplanGraph from './EplanGraph'
import './style.css'
import { BASE_URL } from '../../utils/config'
const Charts = () => {


    useEffect(() => {
        setTimeout(() => {
            document.querySelectorAll('g[stroke*="gradient-id-249"]').forEach((el) => {
                el.style.display = "none"; // Hide the element
            });
        }, 100); // Delay ensures the element is rendered before hiding
    }, []);

    useEffect(() => {
        setTimeout(() => {
            document.querySelectorAll('g[stroke*="gradient-id-249"]').forEach((el) => {
                el.style.display = "none"; // Hide the element
            });
        }, 100); // Delay ensures the element is rendered before hiding
    }, []);

    useEffect(() => {
        /* Apply Theme */
        am4core.useTheme(am4themes_animated);

        /* 📊 Rule of 100 Chart */
        let chart100 = am4core.create("chart100div", am4charts.PieChart3D);
        chart100.hiddenState.properties.opacity = 0;
        chart100.legend = new am4charts.Legend();
        chart100.data = [
            { category: "Wall Street", value: 92, color: am4core.color("#FF0000") }, // Red
            { category: "Protected", value: 5, color: am4core.color("#FFD700") },  // Yellow
            { category: "Bank", value: 4, color: am4core.color("#008000") }        // Green
        ];
        let series100 = chart100.series.push(new am4charts.PieSeries3D());
        series100.dataFields.value = "value";
        series100.dataFields.category = "category";
        series100.slices.template.propertyFields.fill = "color";
        series100.labels.template.text = "{category}: {value}%";

        return () => chart100.dispose();
    }, []);

    return (

        <>
            <Row>
                <Col md={6}>
                    <Card  >
                        <CardHeader className="align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Current Asset Allocation</h4>

                        </CardHeader>
                        <CardBody className="d-flex justify-content-center align-items-center">
                            <div id="chart100div" style={{ width: "100%", height: "500px", padding: "30px" }}></div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <CardHeader className="align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Rule of 100 Assest Allocation</h4>

                        </CardHeader>
                        <CardBody>
                            <AssestsAllocationGraph />
                        </CardBody>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <CardHeader className="align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Rule of 100 Assest Allocation</h4>

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

export default Charts;
