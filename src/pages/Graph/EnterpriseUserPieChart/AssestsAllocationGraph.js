import React, { useEffect, useState, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from '../../../utils/config';

const AssetsAllocationGraph = () => {
    const [chartSize, setChartSize] = useState({ width: "100%", height: "500px" });
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState([]);
    const chartRef = useRef(null);

    const fetchAssetAllocationData = async () => {
        setLoading(true);
        try {
            const authUser = JSON.parse(sessionStorage.getItem("authUser"));
            if (!authUser || !authUser.accessToken) {
                return;
            }

            const response = await axios.get(`${BASE_URL}/api/graph/asset-allocation/`, {
                headers: {
                    Authorization: `Bearer ${authUser.accessToken}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            console.log("Full API Response:", response);

            // ✅ Extract from response directly
            if (response.current_asset_allocation) {
                const { Protected, Bank, "Wall Street": WallStreet } = response.current_asset_allocation;

                const data = [
                    { category: "Protected", value: Protected, color: am4core.color("#008000") }, // Green
                    { category: "Bank", value: Bank, color: am4core.color("#FFD700") }, // Gold
                    { category: "Wall Street", value: WallStreet, color: am4core.color("#FF0000") }, // Red
                ];

                console.log("Mapped Data:", data);
                setChartData(data);
            } else {
            }
        } catch (error) {
            console.error("Error fetching asset data:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const updateChartSize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setChartSize({ width: "100%", height: "300px" });
            } else if (width < 1024) {
                setChartSize({ width: "100%", height: "350px" });
            } else {
                setChartSize({ width: "100%", height: "400px" });
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
    useEffect(() => {
        fetchAssetAllocationData();
    }, []);

    useEffect(() => {
        if (chartData.length > 0) {
            am4core.useTheme(am4themes_animated);

            if (chartRef.current) {
                chartRef.current.dispose();
            }

            const chart = am4core.create("assetsChartDiv", am4charts.PieChart3D);
            chartRef.current = chart;
            chart.hiddenState.properties.opacity = 0;
            chart.legend = new am4charts.Legend();
            chart.responsive.enabled = true;

            chart.data = chartData;

            let series = chart.series.push(new am4charts.PieSeries3D());
            series.dataFields.value = "value";
            series.dataFields.category = "category";
            series.slices.template.propertyFields.fill = "color";

            series.labels.template.text = "{category}: {value}%";
            series.labels.template.fontSize = 14;

            series.hiddenState.properties.endAngle = -90;

            return () => {
                if (chartRef.current) {
                    chartRef.current.dispose();
                }
            };
        }
    }, [chartData]);

    return (
        <>
            {loading ? (
                <div>Loading Asset Allocation Data...</div>
            ) : (
                <div id="assetsChartDiv" style={chartSize}></div>
            )}
        </>
    );
};

export default AssetsAllocationGraph;
