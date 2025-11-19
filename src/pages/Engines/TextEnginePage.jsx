import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Card, Button, Badge, Textarea } from '../../components/common';
import { ENGINES } from '../../utils/constants';
import { Type, CheckCircle } from 'lucide-react';

const TextEnginePage = () => {
  const engine = ENGINES.find((e) => e.id === 'text');
  const [inputText, setInputText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResults({
        sentiment: 'Positive',
        sentimentScore: 0.87,
        entities: ['Aasim AI', 'Precision Engine', 'Machine Learning'],
        summary: 'This text discusses AI and machine learning technologies.',
        language: 'English',
        keywords: ['AI', 'technology', 'innovation', 'precision'],
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
            <Type className="w-10 h-10" />
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
                Test Text Engine
              </h2>

              <div className="mb-6">
                <Textarea
                  label="Input Text"
                  placeholder="Enter or paste text to analyze..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={8}
                  helperText="Enter text for sentiment analysis, entity extraction, and summarization"
                />
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!inputText.trim() || analyzing}
                loading={analyzing}
                className="w-full mb-6"
              >
                {analyzing ? 'Analyzing...' : 'Analyze Text'}
              </Button>

              {/* Results */}
              {results && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-secondary-900">
                    Analysis Results
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-secondary-700 mb-2">
                          Sentiment
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="success" size="md">
                            {results.sentiment}
                          </Badge>
                          <span className="text-sm text-secondary-600">
                            ({(results.sentimentScore * 100).toFixed(0)}%)
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-700 mb-2">
                          Language
                        </p>
                        <p className="text-sm font-semibold text-secondary-900">
                          {results.language}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-secondary-700 mb-2">
                        Extracted Entities:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {results.entities.map((entity, idx) => (
                          <Badge key={idx} variant="primary" size="sm">
                            {entity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-secondary-700 mb-2">
                        Keywords:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {results.keywords.map((keyword, idx) => (
                          <Badge key={idx} variant="default" size="sm">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-secondary-700 mb-2">
                        Summary:
                      </p>
                      <p className="text-sm text-secondary-600 bg-white p-3 rounded border">
                        {results.summary}
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
                <li>• Customer feedback analysis</li>
                <li>• Content summarization</li>
                <li>• Email classification</li>
                <li>• Social media monitoring</li>
                <li>• Document translation</li>
              </ul>
            </Card>

            <Card padding="md" className="bg-gradient-to-br from-cyan-50 to-cyan-100">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Build with Text
              </h3>
              <p className="text-sm text-secondary-700 mb-4">
                Create a custom agent using the Text Engine
              </p>
              <Button
                onClick={() => (window.location.href = '/agents/create?engine=text')}
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

export default TextEnginePage;
