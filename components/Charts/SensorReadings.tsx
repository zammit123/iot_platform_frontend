"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Paper, Typography, Box } from "@mui/material";

// Generate sample IoT data for the last 30 days
const generateIoTData = () => {
  const categories = [];
  const temperatureData = [];
  const humidityData = [];
  const pressureData = [];

  const now = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const dateStr = date.toISOString().split("T")[0];
    categories.push(dateStr);

    // Generate realistic IoT sensor readings with some variation
    const baseTemp = 22 + Math.sin(i * 0.2) * 5 + (Math.random() - 0.5) * 3;
    const baseHumidity =
      45 + Math.sin(i * 0.15) * 15 + (Math.random() - 0.5) * 8;
    const basePressure =
      1013 + Math.sin(i * 0.1) * 20 + (Math.random() - 0.5) * 10;

    temperatureData.push(Math.round(baseTemp * 10) / 10);
    humidityData.push(Math.round(baseHumidity * 10) / 10);
    pressureData.push(Math.round(basePressure * 10) / 10);
  }

  return { categories, temperatureData, humidityData, pressureData };
};

export default function SensorReadings() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  const { categories, temperatureData, humidityData, pressureData } =
    generateIoTData();

  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize chart
    chartInstance.current = echarts.init(chartRef.current);

    const option = {
      title: {
        text: "Sensor Readings - Last 30 Days",
        left: "center",
        textStyle: {
          color: "#0f172a",
          fontSize: 18,
          fontWeight: 600,
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["Temperature (°C)", "Humidity (%)", "Pressure (hPa)"],
        top: 40,
        textStyle: {
          color: "#475569",
        },
      },
      toolbox: {
        feature: {
          saveAsImage: {
            title: "Save as Image",
          },
          dataZoom: {
            title: {
              zoom: "Zoom",
              back: "Reset Zoom",
            },
          },
        },
        right: 20,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "15%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: categories,
          axisLabel: {
            color: "#64748b",
            formatter: (value: string) =>
              new Date(value).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              }),
          },
          axisLine: {
            lineStyle: {
              color: "#e2e8f0",
            },
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "Temperature (°C) / Humidity (%)",
          position: "left",
          offset: 40,
          axisLabel: {
            margin: 70,
          },
          axisLine: {
            lineStyle: {
              color: "#e2e8f0",
            },
          },
          splitLine: {
            lineStyle: {
              color: "#f1f5f9",
            },
          },
        },
        {
          type: "value",
          name: "Pressure (hPa)",
          position: "right",
          axisLabel: {
            color: "#64748b",
          },
          axisLine: {
            lineStyle: {
              color: "#e2e8f0",
            },
          },
        },
      ],
      series: [
        {
          name: "Temperature (°C)",
          type: "line",
          smooth: true,
          yAxisIndex: 0,
          data: temperatureData,
          itemStyle: {
            color: "#ef4444",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(239, 68, 68, 0.3)" },
                { offset: 1, color: "rgba(239, 68, 68, 0.05)" },
              ],
            },
          },
        },
        {
          name: "Humidity (%)",
          type: "line",
          smooth: true,
          yAxisIndex: 0,
          data: humidityData,
          itemStyle: {
            color: "#0ea5e9",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(14, 165, 233, 0.3)" },
                { offset: 1, color: "rgba(14, 165, 233, 0.05)" },
              ],
            },
          },
        },
        {
          name: "Pressure (hPa)",
          type: "line",
          smooth: true,
          yAxisIndex: 1,
          data: pressureData,
          itemStyle: {
            color: "#10b981",
          },
          lineStyle: {
            type: "dashed",
          },
        },
      ],
    };

    chartInstance.current.setOption(option);

    // Handle resize
    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, [categories, temperatureData, humidityData, pressureData]);

  // TODO - Future task to add a resize observer and redraw the graph when the window size changes

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <div ref={chartRef} style={{ height: "500px", width: "100%" }} />

      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Data collected from 15 active sensors across the network
        </Typography>
      </Box>
    </Paper>
  );
}
