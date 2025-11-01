import React from "react";

const CityCard = ({ city, temp, condition, icon }) => {
  return (
    <>
      <div className="bg-gray-800 p-4 rounded-2xl shadow-md hover:scale-105 transition">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{city}</h2>
          <img src={icon} alt={condition} className="w-10 h-10" />
        </div>
        <p className="text-lg mt-2">{temp}°C</p>
        <p className="text-sm text-gray-400">{condition}</p>
      </div>
    </>
  );
};

export default CityCard;
