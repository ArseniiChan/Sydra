import { useState, useEffect } from 'react';
import { Thermometer, AlertTriangle, CheckCircle } from 'lucide-react';

interface TemperatureDisplayProps {
  label: string;
  targetTemp?: number;
  maxSafeTemp?: number;
}

const TemperatureDisplay = ({ 
  label, 
  targetTemp = 0, 
  maxSafeTemp = 300 
}: TemperatureDisplayProps) => {
  const [currentTemp, setCurrentTemp] = useState(22.5);
  const [isHeating, setIsHeating] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate temperature updates with safety checks
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTemp(prev => {
        const random = Math.random() * 2 - 1; // Random between -1 and 1
        let newTemp = Math.max(0, prev + random);
        
        // Safety check - temperature too high
        if (newTemp > maxSafeTemp) {
          setError(`Temperature exceeds safe limit (${maxSafeTemp}°C)!`);
          newTemp = maxSafeTemp;
        } else if (error && newTemp < maxSafeTemp - 10) {
          setError(null); // Clear error when temperature is safe
        }
        
        // Simulate occasional connection issues
        if (Math.random() < 0.01) { // 1% chance
          setIsConnected(false);
          setTimeout(() => setIsConnected(true), 2000);
        }
        
        return newTemp;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [maxSafeTemp, error]);

  // Check if heating
  useEffect(() => {
    setIsHeating(targetTemp > 0 && currentTemp < targetTemp - 2);
  }, [currentTemp, targetTemp]);

  const getStatusColor = () => {
    if (error) return 'text-red-600';
    if (!isConnected) return 'text-gray-400';
    if (isHeating) return 'text-orange-500';
    if (targetTemp > 0 && Math.abs(currentTemp - targetTemp) < 2) return 'text-green-600';
    return 'text-gray-700';
  };

  const getStatusText = () => {
    if (error) return 'Error';
    if (!isConnected) return 'Disconnected';
    if (isHeating) return 'Heating';
    if (targetTemp > 0 && Math.abs(currentTemp - targetTemp) < 2) return 'At Target';
    return 'Stable';
  };

  const getStatusIcon = () => {
    if (error) return <AlertTriangle className="w-4 h-4 text-red-500" />;
    if (!isConnected) return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    if (isHeating) return <Thermometer className="w-4 h-4 text-orange-500 heating-pulse" />;
    if (targetTemp > 0 && Math.abs(currentTemp - targetTemp) < 2) 
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    return <Thermometer className="w-4 h-4 text-gray-500" />;
  };

  const progressPercentage = targetTemp > 0 ? Math.min(100, (currentTemp / targetTemp) * 100) : 0;

  return (
    <div className={`
      bg-white rounded-xl shadow-lg border border-gray-100 p-6 
      hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1
      ${error ? 'ring-2 ring-red-500 ring-opacity-20' : ''}
    `}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-gray-600" />
          {label}
        </h3>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`text-sm font-medium ${
            error ? 'text-red-600' : 
            !isConnected ? 'text-gray-400' : 
            isHeating ? 'text-orange-600' : 
            'text-gray-600'
          }`}>
            {getStatusText()}
          </span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Temperature Display */}
      <div className="text-center mb-4">
        <div className={`text-5xl font-mono font-bold ${getStatusColor()} mb-2`}>
          {isConnected ? `${currentTemp.toFixed(1)}°C` : '--.-°C'}
        </div>
        {targetTemp > 0 && (
          <div className="text-sm text-gray-500">
            Target: <span className="font-semibold">{targetTemp}°C</span>
          </div>
        )}
      </div>

      {/* Progress Bar (if heating) */}
      {targetTemp > 0 && isConnected && (
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span className="font-medium">Progress</span>
            <span className="font-semibold">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                error ? 'bg-red-500' : 
                isHeating ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 
                'bg-gradient-to-r from-green-400 to-green-600'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          {/* Temperature range indicator */}
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0°C</span>
            <span>{targetTemp}°C</span>
          </div>
        </div>
      )}

      {/* Connection Status */}
      {!isConnected && (
        <div className="mt-4 p-2 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            Attempting to reconnect...
          </p>
        </div>
      )}
    </div>
  );
};

export default TemperatureDisplay;