import { useState, useEffect } from 'react';
import EngineCard from '../../components/engines/EngineCard';
import Card from '../../components/common/Card/Card';
import { ENGINES } from '../../utils/constants';
import { formatNumber } from '../../utils/formatters';

const EnginesOverviewPage = () => {
  const [engines, setEngines] = useState(
    ENGINES.map(engine => ({
      ...engine,
      status: 'active',
      processedToday: Math.floor(Math.random() * 50000) + 5000,
      accuracy: (96 + Math.random() * 3).toFixed(1) + '%',
    }))
  );

  const totalProcessed = engines.reduce((sum, engine) => sum + (engine.processedToday || 0), 0);
  const avgAccuracy = (engines.reduce((sum, engine) => sum + parseFloat(engine.accuracy || 0), 0) / engines.length).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading text-gray-900">Precision AI Engines</h1>
        <p className="text-gray-600 mt-2">
          Enterprise-grade AI evaluation engines with custom rubric support
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Total Engines</p>
          <p className="text-3xl font-bold text-gray-900">{engines.length}</p>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Active Engines</p>
          <p className="text-3xl font-bold text-secondary-500">
            {engines.filter(e => e.status === 'active').length}
          </p>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Processed Today</p>
          <p className="text-3xl font-bold text-gray-900">{formatNumber(totalProcessed)}</p>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600 mb-1">Avg. Accuracy</p>
          <p className="text-3xl font-bold text-primary-500">{avgAccuracy}%</p>
        </Card>
      </div>

      {/* Engines Grid */}
      <div>
        <h2 className="text-xl font-semibold font-heading text-gray-900 mb-4">Available Engines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engines.map((engine) => (
            <EngineCard key={engine.id} engine={engine} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnginesOverviewPage;
