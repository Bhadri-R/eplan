import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import './style.css'
import { BASE_URL } from '../../utils/config'

const EplanGraph = () => {

    useEffect(() => {
        setTimeout(() => {
            document.querySelectorAll('g[stroke*="gradient-id-159"]').forEach((el) => {
                el.style.display = "none"; // Hide the element
            });
        }, 1000); // Delay ensures the element is rendered before hiding
    }, []);

    useEffect(() => {
        /* Apply Theme */
        am4core.useTheme(am4themes_animated);

        /* Create Chart */
        let chart = am4core.create("assestsChartDiv", am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0; // Fade-in effect
        chart.legend = new am4charts.Legend(); // Add legend

        /* New Data Set */
        chart.data = [
            { category: "My Eplan Pension", value: 48, color: am4core.color("#32fffa") }, // Red
            { category: "Wall Street", value: 35, color: am4core.color("#FF0000") }, // Red
            { category: "Protected", value: 14, color: am4core.color("#008000") },  // Yellow
            { category: "Bank", value: 3, color: am4core.color("#FFD700") }        // Green

        ];

        /* Create Pie Series */
        let series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = "value";
        series.dataFields.category = "category";
        series.slices.template.propertyFields.fill = "color"; // Custom colors

        /* Add Labels */
        series.labels.template.text = "{category}: {value}%";
        series.labels.template.fill = am4core.color("#00000"); // White text

        /* Smooth Animation */
        series.hiddenState.properties.endAngle = -90;

        return () => {
            chart.dispose(); // Cleanup to avoid memory leaks
        };
    }, []);

    return <div id="assestsChartDiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default EplanGraph;
