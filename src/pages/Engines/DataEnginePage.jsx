import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Card, Button, Badge } from '../../components/common';
import { ENGINES } from '../../utils/constants';
import { Database, Upload, CheckCircle } from 'lucide-react';

const DataEnginePage = () => {
  const engine = ENGINES.find((e) => e.id === 'data');
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file.name);
      setResults(null);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResults({
        rowCount: 1523,
        columnCount: 12,
        schema: {
          name: 'string',
          email: 'string',
          age: 'number',
          salary: 'number',
          department: 'string',
        },
        dataQuality: 92,
        missingValues: 34,
        duplicates: 8,
        insights: [
          'Average age is 34.5 years',
          'Most common department is Engineering (45%)',
          'Salary range: $45,000 - $150,000',
        ],
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="py-6 space-y-8">
        {/* Header */}
        <div className="flex items-start gap-6">
          <div
            className="w-20 h-20 rounded-xl flex items-center justify-center text-white shadow-lg"
            style={{ backgroundColor: engine.color }}
          >
            <Database className="w-10 h-10" />
          </div>
          <div className="flex-1">
            <Badge variant="primary" size="sm" className="mb-2">
              {engine.category}
            </Badge>
            <h1 className="text-4xl font-heading font-bold text-secondary-900 mb-2">
              {engine.name}
            </h1>
            <p className="text-lg text-secondary-600">{engine.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Test Panel */}
          <div className="lg:col-span-2">
            <Card padding="md">
              <h2 className="text-2xl font-heading font-bold text-secondary-900 mb-4">
                Test Data Engine
              </h2>

              {/* Upload Area */}
              <div className="mb-6">
                <label className="block mb-2">
                  <span className="text-sm font-medium text-secondary-700">
                    Upload Data File
                  </span>
                  <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-400 transition-colors cursor-pointer">
                    <div className="space-y-1 text-center">
                      {selectedFile ? (
                        <div className="flex flex-col items-center gap-2">
                          <Database className="h-12 w-12 text-primary-600" />
                          <p className="text-sm font-medium text-secondary-900">
                            {selectedFile}
                          </p>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-secondary-600">
                            <span className="text-primary-600 hover:text-primary-600 font-medium">
                              Upload a file
                            </span>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            CSV, XLSX, XLS up to 50MB
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                    />
                  </div>
                </label>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!selectedFile || analyzing}
                loading={analyzing}
                className="w-full mb-6"
              >
                {analyzing ? 'Analyzing...' : 'Analyze Data'}
              </Button>

              {/* Results */}
              {results && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-secondary-900">
                    Analysis Results
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Rows</p>
                        <p className="text-lg font-semibold text-secondary-900">
                          {results.rowCount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Columns</p>
                        <p className="text-lg font-semibold text-secondary-900">
                          {results.columnCount}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Quality</p>
                        <div className="flex items-center gap-1">
                          <p className="text-lg font-semibold text-green-600">
                            {results.dataQuality}%
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Issues</p>
                        <p className="text-lg font-semibold text-secondary-900">
                          {results.missingValues + results.duplicates}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-secondary-700 mb-2">
                        Detected Schema:
                      </p>
                      <div className="bg-white p-3 rounded border">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 text-secondary-700">Column</th>
                              <th className="text-left py-2 text-secondary-700">Type</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(results.schema).map(([key, type], idx) => (
                              <tr key={idx} className="border-b last:border-0">
                                <td className="py-2 text-secondary-900 font-medium">{key}</td>
                                <td className="py-2">
                                  <Badge variant="default" size="sm">
                                    {type}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-secondary-700 mb-2">
                        Data Quality Issues:
                      </p>
                      <div className="space-y-2">
                        <div className="bg-white p-3 rounded border flex items-center justify-between">
                          <span className="text-sm text-secondary-700">Missing Values</span>
                          <Badge variant="warning" size="sm">
                            {results.missingValues}
                          </Badge>
                        </div>
                        <div className="bg-white p-3 rounded border flex items-center justify-between">
                          <span className="text-sm text-secondary-700">Duplicate Rows</span>
                          <Badge variant="warning" size="sm">
                            {results.duplicates}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-secondary-700 mb-2">
                        Key Insights:
                      </p>
                      <ul className="space-y-2">
                        {results.insights.map((insight, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-secondary-600 bg-white p-3 rounded border flex items-start gap-2"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card padding="md">
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                Capabilities
              </h3>
              <ul className="space-y-2">
                {engine.capabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-secondary-700">{cap}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card padding="md">
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                Common Use Cases
              </h3>
              <ul className="space-y-2 text-sm text-secondary-700">
                <li>• Data validation and cleansing</li>
                <li>• Automated reporting</li>
                <li>• Business intelligence</li>
                <li>• Sales data analysis</li>
                <li>• Inventory management</li>
              </ul>
            </Card>

            <Card padding="md" className="bg-gradient-to-br from-green-50 to-green-100">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Build with Data
              </h3>
              <p className="text-sm text-secondary-700 mb-4">
                Create a custom agent using the Data Engine
              </p>
              <Button
                onClick={() => (window.location.href = '/agents/create?engine=data')}
                variant="primary"
                className="w-full"
              >
                Create Agent
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DataEnginePage;
