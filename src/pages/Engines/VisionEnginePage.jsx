import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Card, Button, Badge } from '../../components/common';
import { ENGINES } from '../../utils/constants';
import { Eye, Upload, Image, CheckCircle } from 'lucide-react';

const VisionEnginePage = () => {
  const engine = ENGINES.find((e) => e.id === 'vision');
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setResults({
        objects: ['Person', 'Laptop', 'Coffee Cup', 'Desk'],
        text: 'Sample OCR text extracted from image',
        confidence: 0.94,
        labels: ['Office', 'Workspace', 'Professional'],
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
            <Eye className="w-10 h-10" />
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
                Test Vision Engine
              </h2>

              {/* Upload Area */}
              <div className="mb-6">
                <label className="block mb-2">
                  <span className="text-sm font-medium text-secondary-700">
                    Upload Image
                  </span>
                  <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-400 transition-colors cursor-pointer">
                    <div className="space-y-1 text-center">
                      {selectedImage ? (
                        <img
                          src={selectedImage}
                          alt="Preview"
                          className="mx-auto h-48 w-auto rounded-lg"
                        />
                      ) : (
                        <>
                          <Image className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-secondary-600">
                            <span className="text-primary-600 hover:text-primary-600 font-medium">
                              Upload a file
                            </span>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                </label>
              </div>

              {/* Analyze Button */}
              <Button
                onClick={handleAnalyze}
                disabled={!selectedImage || analyzing}
                loading={analyzing}
                className="w-full mb-6"
              >
                {analyzing ? 'Analyzing...' : 'Analyze Image'}
              </Button>

              {/* Results */}
              {results && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-secondary-900">
                    Analysis Results
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-secondary-900">
                        Confidence: {(results.confidence * 100).toFixed(1)}%
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-secondary-700 mb-2">
                          Detected Objects:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {results.objects.map((obj, idx) => (
                            <Badge key={idx} variant="secondary" size="sm">
                              {obj}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-secondary-700 mb-2">
                          OCR Text:
                        </p>
                        <p className="text-sm text-secondary-600 bg-white p-3 rounded border">
                          {results.text}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-secondary-700 mb-2">
                          Labels:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {results.labels.map((label, idx) => (
                            <Badge key={idx} variant="default" size="sm">
                              {label}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Capabilities */}
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

            {/* Use Cases */}
            <Card padding="md">
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                Common Use Cases
              </h3>
              <ul className="space-y-2 text-sm text-secondary-700">
                <li>• Document scanning and OCR</li>
                <li>• Product image analysis</li>
                <li>• Face detection and recognition</li>
                <li>• Quality control inspection</li>
                <li>• Medical image analysis</li>
              </ul>
            </Card>

            {/* CTA */}
            <Card padding="md" className="bg-gradient-to-br from-primary-50 to-primary-100">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Build with Vision
              </h3>
              <p className="text-sm text-secondary-700 mb-4">
                Create a custom agent using the Vision Engine
              </p>
              <Button
                onClick={() => (window.location.href = '/agents/create?engine=vision')}
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

export default VisionEnginePage;
