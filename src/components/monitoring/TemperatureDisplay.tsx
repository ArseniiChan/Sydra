import { useState, useEffect } from 'react';

interface TemperatureDisplayProps {
  label: string;
  targetTemp?: number;
}

const TemperatureDisplay = ({ label, targetTemp = 0 }: TemperatureDisplayProps) => {
  const [currentTemp, setCurrentTemp] = useState(22.5);
  const [isHeating, setIsHeating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTemp(prev => {
        const random = Math.random() * 2 - 1;
        return Math.max(0, prev + random);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsHeating(targetTemp > 0 && currentTemp < targetTemp - 2);
  }, [currentTemp, targetTemp]);

  const getStatusColor = () => {
    if (isHeating) return 'text-orange-500';
    if (targetTemp > 0 && Math.abs(currentTemp - targetTemp) < 2) return 'text-green-500';
    return 'text-gray-700';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            isHeating ? 'bg-orange-500 animate-pulse' : 'bg-gray-300'
          }`} />
          <span className="text-sm text-gray-500">
            {isHeating ? 'Heating' : 'Stable'}
          </span>
        </div>
      </div>

      <div className="text-center mb-4">
        <div className={`text-4xl font-mono font-bold ${getStatusColor()}`}>
          {currentTemp.toFixed(1)}°C
        </div>
        {targetTemp > 0 && (
          <div className="text-sm text-gray-500 mt-1">
            Target: {targetTemp}°C
          </div>
        )}
      </div>

      {targetTemp > 0 && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Progress</span>
            <span>{Math.min(100, Math.round((currentTemp / targetTemp) * 100))}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                isHeating ? 'bg-orange-500' : 'bg-green-500'
              }`}
              style={{ 
                width: `${Math.min(100, (currentTemp / targetTemp) * 100)}%` 
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TemperatureDisplay;

