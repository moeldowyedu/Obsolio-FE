import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Card, Button, Badge, Input } from '../../components/common';
import { ENGINES } from '../../utils/constants';
import { Globe, CheckCircle } from 'lucide-react';

const WebEnginePage = () => {
  const engine = ENGINES.find((e) => e.id === 'web');
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResults({
        title: 'Sample Website Title',
        description: 'A comprehensive description of the website content',
        content: 'Extracted content from the webpage...',
        links: 45,
        images: 12,
        seoScore: 85,
        loadTime: '1.2s',
        metadata: {
          author: 'Website Author',
          keywords: ['AI', 'technology', 'innovation'],
          lastModified: '2024-02-15',
        },
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
            <Globe className="w-10 h-10" />
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
                Test Web Engine
              </h2>

              <div className="mb-6">
                <Input
                  label="Website URL"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  helperText="Enter a valid URL to scrape and analyze"
                />
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!url.trim() || analyzing}
                loading={analyzing}
                className="w-full mb-6"
              >
                {analyzing ? 'Analyzing...' : 'Analyze Website'}
              </Button>

              {/* Results */}
              {results && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-secondary-900">
                    Analysis Results
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div>
                      <p className="text-sm font-medium text-secondary-700 mb-1">
                        Page Title:
                      </p>
                      <p className="text-base font-semibold text-secondary-900">
                        {results.title}
                      </p>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Links</p>
                        <p className="text-lg font-semibold text-secondary-900">
                          {results.links}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Images</p>
                        <p className="text-lg font-semibold text-secondary-900">
                          {results.images}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">SEO Score</p>
                        <div className="flex items-center gap-1">
                          <p className="text-lg font-semibold text-green-600">
                            {results.seoScore}%
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Load Time</p>
                        <p className="text-lg font-semibold text-secondary-900">
                          {results.loadTime}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-secondary-700 mb-2">
                        Description:
                      </p>
                      <p className="text-sm text-secondary-600 bg-white p-3 rounded border">
                        {results.description}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-secondary-700 mb-2">
                        Metadata:
                      </p>
                      <div className="bg-white p-3 rounded border space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-secondary-600">Author:</span>
                          <span className="font-medium text-secondary-900">
                            {results.metadata.author}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-600">Last Modified:</span>
                          <span className="font-medium text-secondary-900">
                            {results.metadata.lastModified}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-secondary-700 mb-2">
                        Keywords:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {results.metadata.keywords.map((keyword, idx) => (
                          <Badge key={idx} variant="primary" size="sm">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-secondary-700 mb-2">
                        Extracted Content Preview:
                      </p>
                      <p className="text-sm text-secondary-600 bg-white p-3 rounded border">
                        {results.content}
                      </p>
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
                <li>• Price monitoring</li>
                <li>• Content aggregation</li>
                <li>• Competitor analysis</li>
                <li>• News monitoring</li>
                <li>• Lead generation</li>
              </ul>
            </Card>

            <Card padding="md" className="bg-gradient-to-br from-pink-50 to-pink-100">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Build with Web
              </h3>
              <p className="text-sm text-secondary-700 mb-4">
                Create a custom agent using the Web Engine
              </p>
              <Button
                onClick={() => (window.location.href = '/agents/create?engine=web')}
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

export default WebEnginePage;
