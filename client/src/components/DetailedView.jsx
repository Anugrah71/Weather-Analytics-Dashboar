import {
  X,
  ArrowLeft,
  Sunrise,
  Sunset,
  Droplets,
  Wind,
  Gauge,
  Eye,
  Clock,
  Calendar,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";
import { getTemperatureTrends } from "../utils/WeatherFormate";

const convertTemp = (temp, unit) =>
  unit === "fahrenheit" ? (temp * 9) / 5 + 32 : temp;

const DetailedView = ({ city, onClose, forecastdays }) => {
  const { cities, forecast, unit } = useSelector((state) => state.weather);
  const cityData = cities.find((c) => c.name === city)?.data;
  const icon = cityData?.current?.condition?.icon;
  const condition = cityData?.current?.condition?.text;

  if (!cityData) {
    console.log("Waiting for city data:", city);
  }

  const current = cityData.current;

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
            <ArrowLeft
              size={24}
              className="mr-4 cursor-pointer"
              onClick={onClose}
            />
            <h2 className="text-3xl font-bold text-gray-800">{city}</h2>
          </div>

        
          {/*  7-Day Forecast */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Calendar size={20} className="mr-2" />
              7-Day Forecast
            </h3>

            <div className="grid grid-cols-7 gap-2">
              { forecastdays?.forecastday?.map((day, idx) => (
                <div
                  key={idx}
                  className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg"
                >
                  <div className="text-sm font-semibold text-gray-700 mb-2">
                    {day.date}
                  </div>
                  <img
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                    className="w-10 h-10 mx-auto"
                  />
                  <div className="mt-2 text-xs">
                    <div className="font-bold">{day.day.maxtemp_c}°</div>
                    <div className="text-gray-600">{day.day.mintemp_c}°</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/*  Temperature Trends */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-black flex items-center">
              <TrendingUp size={20} className="mr-2" />
              Temperature Trends
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={getTemperatureTrends(forecastdays)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="temp_max" fill="#f59e0b" name="Max Temp" />
                <Bar dataKey="temp_min" fill="#3b82f6" name="Min Temp" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedView;
