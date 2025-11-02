import { X } from "lucide-react";

const SettingsModal = ({ unit, onChangeUnit, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Temperature Unit */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            Temperature Unit
          </h3>
          <div className="flex gap-4">
            <button
              onClick={() => onChangeUnit("celsius")}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                unit === "celsius"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Celsius (°C)
            </button>
            <button
              onClick={() => onChangeUnit("fahrenheit")}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                unit === "fahrenheit"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Fahrenheit (°F)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
