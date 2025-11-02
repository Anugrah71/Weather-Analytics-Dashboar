import { X, Sunrise, Sunset, Droplets, Wind, Gauge, Eye } from "lucide-react";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import HourlyForcast from "./Charts/HourlyForcast";
import Forecast from "./Forcast";
import TempTrendChart from "./Charts/TembTrendChart";
import WindTrendChart from "./Charts/WindTrendChart";
// import { getTemperatureTrends } from "../utils/WeatherFormate";

const convertTemp = (temp, unit) =>
  unit === "fahrenheit" ? (temp * 9) / 5 + 32 : temp;

const DetailedView = ({ city, onClose, forecastdays, current }) => {
  const { unit } = useSelector((state) => state.weather);

  const icon = current?.condition?.icon;
  console.log("current ", current);
  const condition = current?.condition?.text;

  if (!forecastdays?.forecastday || !current) {
    console.log("Missing forecast or current data for:", city);
    return <div className="p-6 text-center text-gray-600">Loading data...</div>;
  }
  console.log("DetailedView forecastdays:", forecastdays);

  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchPastWeek = async () => {
      const days = [];
      for (let i = 1; i <= 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const iso = date.toISOString().split("T")[0];
        const res = await fetch(`/api/weather/history?q=${city}&date=${iso}`);
        const data = await res.json();
        if (data?.forecast?.forecastday?.[0]) {
          const dayData = data.forecast.forecastday[0].day;
          days.push({
            date: iso,
            max: dayData.maxtemp_c,
            min: dayData.mintemp_c,
          });
        }
      }
      setHistoryData(days.reverse());
    };
    fetchPastWeek();
  }, [city]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-2xl max-w-6xl w-full p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <X size={24} />
          </button>
          <div className="flex items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{city}</h2>
          </div>

          <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center text-black">
              Current Weather
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={icon} alt={condition} className="w-12 h-12" />
                <div className="ml-6">
                  <div className="text-6xl font-bold text-gray-800">
                    {convertTemp(current.temp_c, unit).toFixed(1)}°
                    {unit === "celsius" ? "C" : "F"}
                  </div>
                  <div className="text-xl text-gray-600">
                    {current.condition.text}
                  </div>
                  <div className="text-gray-500">
                    Feels like {convertTemp(current.feelslike_c, unit)}°
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 text-black gap-6">
                <div className="text-center">
                  <Sunrise className="mx-auto mb-2 text-orange-500" />
                  <div className="text-sm text-gray-600">sunrise </div>
                  <div className="font-semibold">
                    {forecastdays.forecastday[0].astro.sunrise}
                  </div>
                </div>
                <div className="text-center">
                  <Sunset className="mx-auto mb-2 text-orange-600" />
                  <div className="text-sm text-gray-600">Sunset</div>
                  <div className="font-semibold">
                    {forecastdays.forecastday[0].astro.sunset}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 text-black gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <Droplets className="mx-auto mb-2 text-blue-500" />
                <div className="text-sm text-gray-600">Humidity</div>
                <div className="font-semibold">{current?.humidity}%</div>
              </div>
              <div className="text-center">
                <Wind className="mx-auto mb-2 text-gray-500" />
                <div className="text-sm text-gray-600">Wind</div>
                <div className="font-semibold">{current.wind_kph} km/h</div>
              </div>
              <div className="text-center">
                <Gauge className="mx-auto mb-2 text-purple-500" />
                <div className="text-sm text-gray-600">Pressure</div>
                <div className="font-semibold">{current.pressure_mb} hPa</div>
              </div>
              <div className="text-center">
                <Eye className="mx-auto mb-2 text-teal-500" />
                <div className="text-sm text-gray-600">Visibility</div>
                <div className="font-semibold">{current.vis_km} km</div>
              </div>
            </div>
          </div>
          {/*  7-Day Forecast */}
          <Forecast forecastdays={forecastdays} unit={unit} />

          <HourlyForcast forecastdays={forecastdays} unit={unit} />
          {/*  WindTrendChart  */}
          <WindTrendChart forecastdays={forecastdays} unit={unit} />

          {/*  Temperature Trends */}

          <TempTrendChart historyData={historyData} unit={unit} />
        </div>
      </div>
    </div>
  );
};

export default DetailedView;
