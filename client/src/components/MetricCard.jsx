import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const MetricCard = ({ title, value, change, icon: Icon, trend }) => {
  const isPositive = trend === "up";

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
        </div>
        <div
          className={`p-3 rounded-full ${
            isPositive ? "bg-green-100" : "bg-blue-100"
          }`}
        >
          <Icon
            className={`w-6 h-6 ${
              isPositive ? "text-green-600" : "text-blue-600"
            }`}
          />
        </div>
      </div>

      {change && (
        <div className="flex items-center mt-4">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className=" w-4 h-4 text-red-500 mr-1" />
          )}
          <span
            className={`text-sm font-medium ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {change}%
          </span>
          <span className="text-gray-500 text-sm ml-2"> vs last week</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
