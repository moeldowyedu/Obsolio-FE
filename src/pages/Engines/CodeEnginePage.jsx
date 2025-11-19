import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Card, Button, Badge, Textarea } from '../../components/common';
import { ENGINES } from '../../utils/constants';
import { Code, CheckCircle, AlertCircle } from 'lucide-react';

const CodeEnginePage = () => {
  const engine = ENGINES.find((e) => e.id === 'code');
  const [code, setCode] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResults({
        syntaxValid: true,
        bugs: [
          { line: 3, severity: 'warning', message: 'Unused variable "temp"' },
          { line: 7, severity: 'error', message: 'Missing semicolon' },
        ],
        optimizations: [
          'Consider using const instead of let for immutable variables',
          'Function could be simplified using array methods',
        ],
        complexity: 'Low',
        maintainability: 85,
        language: 'JavaScript',
      });
      setAnalyzing(false);
    }, 1500);
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
            <Code className="w-10 h-10" />
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
                Test Code Engine
              </h2>

              <div className="mb-6">
                <Textarea
                  label="Source Code"
                  placeholder="Paste your code here for analysis..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  rows={12}
                  className="font-mono text-sm"
                  helperText="Supports JavaScript, Python, Java, Go, and more"
                />
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!code.trim() || analyzing}
                loading={analyzing}
                className="w-full mb-6"
              >
                {analyzing ? 'Analyzing...' : 'Analyze Code'}
              </Button>

              {/* Results */}
              {results && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-secondary-900">
                    Analysis Results
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Syntax</p>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-secondary-900">
                            Valid
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Complexity</p>
                        <Badge variant="success" size="sm">
                          {results.complexity}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Maintainability
                        </p>
                        <p className="text-lg font-semibold text-secondary-900">
                          {results.maintainability}%
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-secondary-700 mb-2">
                        Issues Found ({results.bugs.length}):
                      </p>
                      <div className="space-y-2">
                        {results.bugs.map((bug, idx) => (
                          <div
                            key={idx}
                            className="bg-white p-3 rounded border flex items-start gap-2"
                          >
                            <AlertCircle
                              className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                bug.severity === 'error'
                                  ? 'text-red-500'
                                  : 'text-yellow-500'
                              }`}
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-secondary-900">
                                Line {bug.line}
                              </p>
                              <p className="text-sm text-secondary-600">
                                {bug.message}
                              </p>
                            </div>
                            <Badge
                              variant={
                                bug.severity === 'error' ? 'danger' : 'warning'
                              }
                              size="sm"
                            >
                              {bug.severity}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-secondary-700 mb-2">
                        Optimization Suggestions:
                      </p>
                      <ul className="space-y-2">
                        {results.optimizations.map((opt, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-secondary-600 bg-white p-3 rounded border flex items-start gap-2"
                          >
                            <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span>{opt}</span>
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
                <li>• Code review automation</li>
                <li>• Bug detection</li>
                <li>• Performance optimization</li>
                <li>• Documentation generation</li>
                <li>• Security vulnerability scanning</li>
              </ul>
            </Card>

            <Card padding="md" className="bg-gradient-to-br from-teal-50 to-teal-100">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Build with Code
              </h3>
              <p className="text-sm text-secondary-700 mb-4">
                Create a custom agent using the Code Engine
              </p>
              <Button
                onClick={() => (window.location.href = '/agents/create?engine=code')}
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

export default CodeEnginePage;
