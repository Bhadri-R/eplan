import React, { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import "./style.css";

const AssestsAllocationGraph = () => {
    const [chartSize, setChartSize] = useState({ width: "100%", height: "500px" });

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
            document.querySelectorAll('g[stroke*="gradient-id-159"]').forEach((el) => {
                el.style.display = "none";
            });
        }, 1000);
    }, []);

    useEffect(() => {
        am4core.useTheme(am4themes_animated);

        let chart = am4core.create("assestsChartDiv", am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0; // Fade-in effect
        chart.legend = new am4charts.Legend(); // Add legend
        chart.responsive.enabled = true; // Enable AmCharts responsiveness

        /* New Data Set */
        chart.data = [
            { category: "Wall Street", value: 35, color: am4core.color("#FF0000") },
            { category: "Protected", value: 62, color: am4core.color("#008000") },
            { category: "Bank", value: 3, color: am4core.color("#FFD700") },
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

    return <div id="assestsChartDiv" style={chartSize}></div>;
};

export default AssestsAllocationGraph;
