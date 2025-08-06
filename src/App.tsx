import TemperatureDisplay from './components/monitoring/TemperatureDisplay';
import { Settings, Wifi, Power } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-medium sydra-font bg-gradient-to-r from-lime-700 to-green-700 bg-clip-text text-transparent tracking-wide">
                Sydra
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                ECAM 3D Printer Control Interface
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-lime-50 border border-lime-200 rounded-full">
                <Wifi className="w-4 h-4 text-lime-600" />
                <span className="text-sm font-medium text-lime-700">Connected</span>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors shadow-sm">
              <Power className="w-4 h-4 mr-2" />
              Emergency Stop
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Home All Axes
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Preheat PLA
            </button>
          </div>
        </div>

        {/* Temperature Monitoring Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Temperature Monitoring
            </h2>
            <div className="text-sm text-gray-500">
              Updates every second
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <TemperatureDisplay 
              label="Hotend"
              targetTemp={200}
              maxSafeTemp={280}
            />
            <TemperatureDisplay 
              label="Heated Bed"
              targetTemp={60}
              maxSafeTemp={120}
            />
            <TemperatureDisplay 
              label="Chamber"
              targetTemp={0}
              maxSafeTemp={80}
            />
          </div>
        </section>

        {/* System Status */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            System Status
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Printer Status */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-lime-500 rounded-full animate-pulse"></div>
                Printer Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">State:</span>
                  <span className="font-semibold text-lime-600">Operational</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Firmware:</span>
                  <span className="font-mono text-sm text-gray-800">RepRapFirmware 3.4.6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Uptime:</span>
                  <span className="font-mono text-sm text-gray-800">2h 34m 15s</span>
                </div>
              </div>
            </div>

            {/* Connection Info */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Connection Info
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Board:</span>
                  <span className="font-semibold text-gray-800">Duet 3 MB6HC</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">IP Address:</span>
                  <span className="font-mono text-sm text-gray-800">192.168.1.100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Response Time:</span>
                  <span className="font-mono text-sm text-lime-600">12ms</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;