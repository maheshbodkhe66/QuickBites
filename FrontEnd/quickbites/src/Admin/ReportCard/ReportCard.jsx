import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const AvgCard = ({ title, icon, value, isGrow, growValue }) => {
  return (
    <div className="p-5 px-6 flex justify-between bg-white shadow-md rounded-md">
      <div>
        <p className="pb-2 text-gray-600">{title}</p>
        <p className="font-semibold text-gray-800 text-xl">{value}</p>
        <div className={`flex items-center space-x-2 mt-2 ${isGrow ? "text-green-600" : "text-red-500"}`}>
          <p className="text-sm">{growValue}%</p>
          {isGrow ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
        </div>
      </div>
      <div className="text-gray-500">{icon}</div>
    </div>
  );
};

export default AvgCard;
