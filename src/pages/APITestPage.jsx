import { useState } from 'react';
import {
  checkAPIHealth,
  getAPIBaseURL,
  runAPIDiagnostics,
  testEndpoint,
} from '../utils/apiHealthCheck';

/**
 * API Test Page
 *
 * A utility page for testing backend API connectivity
 */
const APITestPage = () => {
  const [healthStatus, setHealthStatus] = useState(null);
  const [diagnostics, setDiagnostics] = useState(null);
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customEndpoint, setCustomEndpoint] = useState('/health');
  const [customMethod, setCustomMethod] = useState('GET');

  const handleHealthCheck = async () => {
    setLoading(true);
    setHealthStatus(null);
    try {
      const result = await checkAPIHealth();
      setHealthStatus(result);
    } catch (error) {
      setHealthStatus({
        success: false,
        status: 'error',
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRunDiagnostics = async () => {
    setLoading(true);
    setDiagnostics(null);
    try {
      const result = await runAPIDiagnostics();
      setDiagnostics(result);
    } catch (error) {
      setDiagnostics({
        error: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTestEndpoint = async () => {
    setLoading(true);
    setTestResult(null);
    try {
      const result = await testEndpoint(customEndpoint, customMethod);
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        error: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-secondary-800 mb-2">
            🔌 API Connection Test
          </h1>
          <p className="text-secondary-600 mb-8">
            Test and verify backend API connectivity
          </p>

          {/* API Configuration */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-900 mb-3">
              📡 Current Configuration
            </h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="font-medium text-blue-800 w-32">Base URL:</span>
                <code className="bg-white px-3 py-1 rounded text-sm font-mono text-blue-600">
                  {getAPIBaseURL()}
                </code>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-blue-800 w-32">Environment:</span>
                <code className="bg-white px-3 py-1 rounded text-sm font-mono text-blue-600">
                  {import.meta.env.MODE}
                </code>
              </div>
            </div>
          </div>

          {/* Health Check Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-secondary-800 mb-4">
              1. Health Check
            </h2>
            <button
              onClick={handleHealthCheck}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {loading ? 'Checking...' : 'Run Health Check'}
            </button>

            {healthStatus && (
              <div
                className={`mt-4 p-6 rounded-lg border-2 ${
                  healthStatus.success
                    ? 'bg-green-50 border-green-300'
                    : 'bg-red-50 border-red-300'
                }`}
              >
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">
                    {healthStatus.success ? '✅' : '❌'}
                  </span>
                  <h3 className="text-lg font-semibold">
                    {healthStatus.success ? 'API is healthy!' : 'Connection failed'}
                  </h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Status:</strong> {healthStatus.status}
                  </p>
                  <p>
                    <strong>Message:</strong> {healthStatus.message}
                  </p>
                  <p>
                    <strong>Response Time:</strong> {healthStatus.responseTime}ms
                  </p>
                  {healthStatus.data && (
                    <pre className="mt-3 bg-white p-3 rounded overflow-auto text-xs">
                      {JSON.stringify(healthStatus.data, null, 2)}
                    </pre>
                  )}
                  {healthStatus.error && (
                    <pre className="mt-3 bg-red-100 p-3 rounded overflow-auto text-xs text-red-800">
                      {JSON.stringify(healthStatus.error, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Full Diagnostics */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-secondary-800 mb-4">
              2. Full Diagnostics
            </h2>
            <button
              onClick={handleRunDiagnostics}
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {loading ? 'Running...' : 'Run Full Diagnostics'}
            </button>

            {diagnostics && (
              <div className="mt-4 p-6 bg-gray-50 border border-gray-300 rounded-lg">
                <pre className="overflow-auto text-xs font-mono">
                  {JSON.stringify(diagnostics, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Custom Endpoint Test */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-secondary-800 mb-4">
              3. Test Custom Endpoint
            </h2>
            <div className="flex gap-4 mb-4">
              <select
                value={customMethod}
                onChange={(e) => setCustomMethod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
              <input
                type="text"
                value={customEndpoint}
                onChange={(e) => setCustomEndpoint(e.target.value)}
                placeholder="/api/endpoint"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={handleTestEndpoint}
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
              >
                {loading ? 'Testing...' : 'Test'}
              </button>
            </div>

            {testResult && (
              <div
                className={`mt-4 p-6 rounded-lg border-2 ${
                  testResult.success
                    ? 'bg-green-50 border-green-300'
                    : 'bg-red-50 border-red-300'
                }`}
              >
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">
                    {testResult.success ? '✅' : '❌'}
                  </span>
                  <h3 className="text-lg font-semibold">
                    {testResult.success ? 'Success!' : 'Failed'}
                  </h3>
                </div>
                <div className="space-y-2 text-sm">
                  {testResult.statusCode && (
                    <p>
                      <strong>Status Code:</strong> {testResult.statusCode}
                    </p>
                  )}
                  <pre className="mt-3 bg-white p-3 rounded overflow-auto text-xs">
                    {JSON.stringify(
                      testResult.response || testResult.error,
                      null,
                      2
                    )}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Common Endpoints */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">
              💡 Common Endpoints to Test
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <code className="bg-white px-3 py-2 rounded">/health</code>
              <code className="bg-white px-3 py-2 rounded">/agents</code>
              <code className="bg-white px-3 py-2 rounded">/workflows</code>
              <code className="bg-white px-3 py-2 rounded">/engines</code>
              <code className="bg-white px-3 py-2 rounded">/marketplace/agents</code>
              <code className="bg-white px-3 py-2 rounded">/billing/plans</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APITestPage;
