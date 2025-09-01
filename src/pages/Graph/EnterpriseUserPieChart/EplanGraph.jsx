import React, { useEffect, useState, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";

const EplanGraph = () => {
  const [chartSize, setChartSize] = useState({
    width: "100%",
    height: "500px",
  });
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null);
  const chartId = `EplanChartDiv-${Math.random().toString(36).substring(2, 9)}`;

  // ✅ Fetch Data from API
  const fetchChartData = async () => {
    try {
      const authUser = JSON.parse(sessionStorage.getItem("authUser"));
      if (!authUser || !authUser.accessToken) {
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/graph/chart/`, {
        headers: {
          Authorization: `Bearer ${authUser.accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      console.log("Full API Response:", response);

      // ✅ Show message directly from response.message
      if (response.message) {
        // toast.success(response.message);
      }

      // ✅ Ensure correct mapping of data
      if (response.current_asset_allocation) {
        const {
          "My-ePlan Pension": MyEplanPension,
          Protected,
          Bank,
          "Wall Street": WallStreet,
        } = response.current_asset_allocation;

        const data = [
          {
            category: "My-ePlan Pension",
            value: MyEplanPension,
            color: am4core.color("#008000"),
          },
          {
            category: "Protected",
            value: Protected,
            color: am4core.color("#49cd49"),
          },
          { category: "Bank", value: Bank, color: am4core.color("#FFD700") },
          {
            category: "Wall Street",
            value: WallStreet,
            color: am4core.color("#FF0000"),
          },
        ];

        console.log("Mapped Data:", data);
        setChartData(data);
      } else {
        // toast.error(response.message);
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
    //   toast.error(error.message);
    }
  };

  // ✅ Create Chart
  const createChart = (data) => {
    if (chartRef.current) {
      chartRef.current.dispose();
      chartRef.current = null;
    }

    am4core.useTheme(am4themes_animated);

    const chart = am4core.create(chartId, am4charts.PieChart3D);
    chartRef.current = chart;

    chart.hiddenState.properties.opacity = 0;
    chart.legend = new am4charts.Legend();
    chart.responsive.enabled = true;

    chart.data = data;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "value";
    series.dataFields.category = "category";
    series.slices.template.propertyFields.fill = "color";

    series.labels.template.text = "{category}: {value}%";
    series.labels.template.fill = am4core.color("#000");
    series.labels.template.wrap = true;
    series.labels.template.maxWidth = 100;
    series.labels.template.fontSize = 14;

    series.hiddenState.properties.endAngle = -90;

    console.log("Chart created with ID:", chartId);
  };

  useEffect(() => {
    fetchChartData(); // ✅ Fetch data on component mount
  }, []);

  useEffect(() => {
    if (chartData.length > 0) {
      createChart(chartData);
    }
  }, [chartData]);

  // ✅ Update chart size on window resize
  useEffect(() => {
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

    updateChartSize();
    window.addEventListener("resize", updateChartSize);

    return () => {
      window.removeEventListener("resize", updateChartSize);
      if (chartRef.current) {
        chartRef.current.dispose(); // ✅ Dispose chart on component unmount
        chartRef.current = null;
      }
    };
  }, []);

  return <div id={chartId} style={chartSize}></div>;
};

export default EplanGraph;
