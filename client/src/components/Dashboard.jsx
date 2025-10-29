import React, { useState, useEffect } from "react";
import { DollarSign, Users, UserCheck, TrendingUp } from "lucide-react";
import socketService from "../services/socket";
import MetricCard from "./MetricCard";
import SalesChart from "./SalesChart";
import ConnectionStatus from "./ConnectionStatus";
import axios from "axios";

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Fetch initial data from REST API

    const fetchInitialData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/metrics");
        setMetrics(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setLoading(false);
      }
    };

    fetchInitialData();
    //connect to socket.io
    const socket = socketService.connect();
    //Listening for connection status
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socketService.on("metrics-update", (updatedMetrics) => {
      console.log("Received update", updatedMetrics);
      setMetrics(updatedMetrics);
    });

    return () => {
      socketService.off("metrics-update");
      socketService.disconnect();
    };
  }, []);

  if (!metrics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">
          {" "}
          Failed to load data
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <ConnectionStatus isConnected={isConnected} />

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Real-time business metrics and insights
        </p>
      </div>

      {/** Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Sales"
          value={`$${metrics.totalSales.toLocaleString()}`}
          change={12.5}
          icon={DollarSign}
          trend="up"
        />

        <MetricCard
          title="Total Sales"
          value={`$${metrics.totalSales.toLocaleString()}`}
          change={12.5}
          icon={DollarSign}
          trend="up"
        />

        <MetricCard
          title="Total Users"
          value={metrics.totalUsers}
          change={8.2}
          icon={Users}
          trend="up"
        />

        <MetricCard
          title="Active Users"
          value={metrics.activeUsers}
          icon={UserCheck}
          trend="up"
        />

        <MetricCard
          title="Revenue"
          value={`$${metrics.revenue.toLocaleString()}`}
          change={15.3}
          icon={TrendingUp}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <SalesChart data={metrics.salesData} />
      </div>

      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow">
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-green-500 animate-pulse" : "bg-gray-400"
            }`}
          ></div>
          <span className="text-sm text-gray-600">
            {isConnected ? "Real-time updates active" : "Reconnecting..."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
