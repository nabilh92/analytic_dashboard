import React from "react";
import { Wifi, WifiOff } from "lucide-react";

const ConnectionStatus = ({ isConnected }) => {
  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 ${
        isConnected ? "bg-green-500" : "bg-red-500"
      } text-white transition-all duration-300`}
    >
      {isConnected ? (
        <>
          <Wifi className="w-4 h-4" />
          <span className="text-sm font-medium">Live</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4" />
          <span className="text-sm font-medium">Disconnected</span>
        </>
      )}
    </div>
  );
};

export default ConnectionStatus;
