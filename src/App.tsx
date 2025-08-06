import TemperatureDisplay from './components/monitoring/TemperatureDisplay';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Sydra - ECAM 3D Printer Control
        </h1>
        <p className="text-gray-600">
          Custom interface for Duet board integration
        </p>
      </header>

      {/* Temperature Monitoring Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Temperature Monitoring
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TemperatureDisplay 
            label="Nozzle Temperature"
            targetTemp={200}
          />
          <TemperatureDisplay 
            label="Bed Temperature"
            targetTemp={60}
          />
          <TemperatureDisplay 
            label="Chamber Temperature"
            targetTemp={0}
          />
        </div>
      </section>

      {/* Status Section */}
      <section className="mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Printer Status
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Connected</span>
            </div>
            <div className="text-sm text-gray-500">
              Ready for commands
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;