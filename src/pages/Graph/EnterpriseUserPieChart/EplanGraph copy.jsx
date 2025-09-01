import React, { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import "./style.css";
import { BASE_URL } from '../../../utils/config'

const EplanGraph = () => {
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
            document.querySelectorAll('g[stroke*="gradient-id-200"]').forEach((el) => {
                el.style.display = "none";
            });
        }, 1000);
    }, []);

    useEffect(() => {
        am4core.useTheme(am4themes_animated);

        let chart = am4core.create("EplanChartDiv", am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0; // Fade-in effect
        chart.legend = new am4charts.Legend(); // Add legend
        chart.responsive.enabled = true; // Enable AmCharts responsiveness

        chart.data = [
            { category: "Protected", value: 17, color: am4core.color("#49cd49") },  
            // { category: "Protected", value: 14, color: am4core.color("#FFD700") }, // Yellow
            { category: "Wall Street", value: 35, color: am4core.color("#FF0000") }, // Red
            { category: "Bank", value: 4, color: am4core.color("#FFD700") }, // Green
            { category: "My-eplan Pension", value: 45, color: am4core.color("#008000") }, // Green

        ];

        /* Create Pie Series */
        let series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = "value";
        series.dataFields.category = "category";
        series.slices.template.propertyFields.fill = "color";

        /* Add Labels */
        series.labels.template.text = "{category} {value}%";
        series.labels.template.fill = am4core.color("#000");
        series.labels.template.wrap = true;
        series.labels.template.maxWidth = 100;
        series.labels.template.fontSize = 14;

        /* Smooth Animation */
        series.hiddenState.properties.endAngle = -90;

        return () => {
            chart.dispose(); // Cleanup to avoid memory leaks
        };
    }, []);

    return <div id="EplanChartDiv" style={chartSize}></div>;
};

export default EplanGraph;
