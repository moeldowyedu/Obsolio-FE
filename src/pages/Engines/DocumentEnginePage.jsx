import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Card, Button, Badge } from '../../components/common';
import { ENGINES } from '../../utils/constants';
import { FileText, Upload, CheckCircle } from 'lucide-react';

const DocumentEnginePage = () => {
  const engine = ENGINES.find((e) => e.id === 'document');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleDocUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedDoc(file.name);
      setResults(null);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResults({
        pageCount: 12,
        extractedText: 'This is a sample of extracted text from the document...',
        metadata: {
          author: 'John Doe',
          created: '2024-01-15',
          modified: '2024-02-20',
          title: 'Quarterly Report',
        },
        tables: 3,
        images: 5,
        fileSize: '2.4 MB',
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
            <FileText className="w-10 h-10" />
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
                Test Document Engine
              </h2>

              {/* Upload Area */}
              <div className="mb-6">
                <label className="block mb-2">
                  <span className="text-sm font-medium text-secondary-700">
                    Upload Document
                  </span>
                  <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-400 transition-colors cursor-pointer">
                    <div className="space-y-1 text-center">
                      {selectedDoc ? (
                        <div className="flex flex-col items-center gap-2">
                          <FileText className="h-12 w-12 text-primary-600" />
                          <p className="text-sm font-medium text-secondary-900">
                            {selectedDoc}
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
                            PDF, DOCX, DOC up to 20MB
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleDocUpload}
                    />
                  </div>
                </label>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!selectedDoc || analyzing}
                loading={analyzing}
                className="w-full mb-6"
              >
                {analyzing ? 'Analyzing...' : 'Analyze Document'}
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
                        <p className="text-xs text-gray-500 mb-1">Pages</p>
                        <p className="text-lg font-semibold text-secondary-900">
                          {results.pageCount}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Tables</p>
                        <p className="text-lg font-semibold text-secondary-900">
                          {results.tables}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Images</p>
                        <p className="text-lg font-semibold text-secondary-900">
                          {results.images}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">File Size</p>
                        <p className="text-sm font-semibold text-secondary-900">
                          {results.fileSize}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-secondary-700 mb-2">
                        Document Metadata:
                      </p>
                      <div className="bg-white p-3 rounded border space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-secondary-600">Title:</span>
                          <span className="font-medium text-secondary-900">
                            {results.metadata.title}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-600">Author:</span>
                          <span className="font-medium text-secondary-900">
                            {results.metadata.author}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-600">Created:</span>
                          <span className="font-medium text-secondary-900">
                            {results.metadata.created}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-600">Modified:</span>
                          <span className="font-medium text-secondary-900">
                            {results.metadata.modified}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-secondary-700 mb-2">
                        Extracted Text Preview:
                      </p>
                      <p className="text-sm text-secondary-600 bg-white p-3 rounded border">
                        {results.extractedText}
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
                <li>• Invoice processing</li>
                <li>• Contract analysis</li>
                <li>• Resume parsing</li>
                <li>• Report generation</li>
                <li>• Form data extraction</li>
              </ul>
            </Card>

            <Card padding="md" className="bg-gradient-to-br from-orange-50 to-orange-100">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Build with Document
              </h3>
              <p className="text-sm text-secondary-700 mb-4">
                Create a custom agent using the Document Engine
              </p>
              <Button
                onClick={() => (window.location.href = '/agents/create?engine=document')}
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

export default DocumentEnginePage;
