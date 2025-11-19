import { useState } from 'react';
import Card from '../common/Card/Card';
import Button from '../common/Button/Button';

const QuickTestPanel = ({ engineId, inputType = 'text' }) => {
  const [testInput, setTestInput] = useState('');
  const [selectedRubric, setSelectedRubric] = useState('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const rubrics = [
    { id: 'standard', name: 'Standard Quality Assessment' },
    { id: 'compliance', name: 'Compliance Check' },
    { id: 'advanced', name: 'Advanced Evaluation' },
  ];

  const handleRunTest = async () => {
    setIsProcessing(true);
    setResult(null);

    // Simulate processing
    setTimeout(() => {
      setResult({
        score: Math.floor(Math.random() * 30) + 70,
        processingTime: (Math.random() * 3 + 1).toFixed(2),
        criteria: [
          { name: 'Quality', score: 92, maxScore: 100 },
          { name: 'Accuracy', score: 88, maxScore: 100 },
          { name: 'Completeness', score: 95, maxScore: 100 },
          { name: 'Compliance', score: 90, maxScore: 100 },
        ]
      });
      setIsProcessing(false);
    }, 2000);
  };

  const renderInput = () => {
    switch (inputType) {
      case 'image-upload':
      case 'video-upload':
      case 'audio-upload':
      case 'file-upload':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
            <div className="text-4xl mb-3">📁</div>
            <p className="text-secondary-700 font-medium mb-1">
              Drop your file here or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports common file formats
            </p>
          </div>
        );
      case 'url':
        return (
          <input
            type="url"
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder="Enter URL to analyze..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        );
      default:
        return (
          <textarea
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder="Enter your test input here..."
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
        );
    }
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-bold font-heading text-secondary-900">
          Quick Test Panel
        </h2>
        <p className="text-sm text-secondary-600 mt-1">
          Test the engine with sample data
        </p>
      </div>

      <div className="space-y-4">
        {/* Rubric Selection */}
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Select Rubric
          </label>
          <select
            value={selectedRubric}
            onChange={(e) => setSelectedRubric(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {rubrics.map((rubric) => (
              <option key={rubric.id} value={rubric.id}>
                {rubric.name}
              </option>
            ))}
          </select>
        </div>

        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Test Input
          </label>
          {renderInput()}
        </div>

        {/* Run Button */}
        <Button
          onClick={handleRunTest}
          disabled={isProcessing || (!testInput && inputType === 'text')}
          loading={isProcessing}
          className="w-full"
        >
          {isProcessing ? 'Processing...' : 'Run Test'}
        </Button>

        {/* Results */}
        {result && (
          <div className="mt-6 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-100">
            <h3 className="font-semibold text-secondary-900 mb-4">Test Results</h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-secondary-600 mb-1">Overall Score</p>
                <p className="text-3xl font-bold text-secondary-900">{result.score}%</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-secondary-600 mb-1">Processing Time</p>
                <p className="text-3xl font-bold text-secondary-900">{result.processingTime}s</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="text-sm font-semibold text-secondary-900 mb-3">Criteria Scores</h4>
              <div className="space-y-2">
                {result.criteria.map((criterion, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-secondary-700">{criterion.name}</span>
                      <span className="font-medium">{criterion.score}/{criterion.maxScore}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${(criterion.score / criterion.maxScore) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default QuickTestPanel;
