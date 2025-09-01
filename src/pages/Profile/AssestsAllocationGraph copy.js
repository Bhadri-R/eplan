import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import './style.css'
const AssestsAllocationGraph = () => {

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

        /* New Data Set */
        chart.data = [
            { category: "Wall Street", value: 35, color: am4core.color("#FF0000") }, 
            { category: "Protected", value: 62, color: am4core.color("#008000") },   
            { category: "Bank", value: 3, color: am4core.color("#FFD700") }       

        ];

        /* Create Pie Series */
        let series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = "value";
        series.dataFields.category = "category";
        series.slices.template.propertyFields.fill = "color";  

        /* Add Labels */
        series.labels.template.text = "{category}: {value}%";
        series.labels.template.fill = am4core.color("#00000");  

        /* Smooth Animation */
        series.hiddenState.properties.endAngle = -90;

        return () => {
            chart.dispose(); // Cleanup to avoid memory leaks
        };
    }, []);

    return <div id="assestsChartDiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default AssestsAllocationGraph;
