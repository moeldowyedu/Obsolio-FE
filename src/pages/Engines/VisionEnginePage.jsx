import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Card, Button, Badge } from '../../components/common';
import { ENGINES } from '../../utils/constants';
import { Eye, Upload, Image, CheckCircle, Video, FileText, AlertCircle } from 'lucide-react';
import engineService from '../../services/engineService';
import toast from 'react-hot-toast';

const VisionEnginePage = () => {
  const engine = ENGINES.find((e) => e.id === 'vision');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState(null); // 'image' or 'video'
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Determine file type
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');

      if (!isImage && !isVideo) {
        toast.error('Please upload an image or video file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
        setFileType(isImage ? 'image' : 'video');
        setResults(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please upload a file first');
      return;
    }

    setAnalyzing(true);
    setError(null);

    try {
      // Call real backend API
      const response = await engineService.vision.analyzeImage(selectedFile, {
        detect_objects: true,
        extract_text: true,
        classify: true,
      });

      // Transform backend response to expected format
      setResults({
        objects: response.data?.objects || response.objects || [],
        text: response.data?.text || response.text || 'No text detected',
        confidence: response.data?.confidence || response.confidence || 0,
        labels: response.data?.labels || response.labels || [],
        faces: response.data?.faces || response.faces || [],
        colors: response.data?.dominant_colors || response.dominant_colors || [],
      });

      toast.success('Analysis completed successfully!');
    } catch (err) {
      console.error('Vision analysis error:', err);
      setError(err.response?.data?.message || 'Failed to analyze file. Please try again.');
      toast.error('Analysis failed');
    } finally {
      setAnalyzing(false);
    }
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
                    Upload Image or Video
                  </span>
                  <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-400 transition-colors cursor-pointer">
                    <div className="space-y-1 text-center">
                      {selectedFile ? (
                        <div>
                          {fileType === 'image' ? (
                            <img
                              src={selectedFile}
                              alt="Preview"
                              className="mx-auto h-48 w-auto rounded-lg"
                            />
                          ) : (
                            <video
                              src={selectedFile}
                              controls
                              className="mx-auto h-48 w-auto rounded-lg"
                            />
                          )}
                          <p className="mt-2 text-sm text-secondary-600">
                            {fileType === 'image' ? 'Image' : 'Video'} uploaded
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-center gap-4 mb-3">
                            <Image className="h-12 w-12 text-gray-400" />
                            <Video className="h-12 w-12 text-gray-400" />
                          </div>
                          <div className="flex text-sm text-secondary-600">
                            <span className="text-primary-600 hover:text-primary-600 font-medium">
                              Upload a file
                            </span>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            Images: PNG, JPG, GIF, WebP<br/>
                            Videos: MP4, WebM, AVI up to 50MB
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                    />
                  </div>
                </label>
              </div>

              {/* Analyze Button */}
              <Button
                onClick={handleAnalyze}
                disabled={!selectedFile || analyzing}
                loading={analyzing}
                className="w-full mb-6"
              >
                {analyzing ? 'Analyzing...' : `Analyze ${fileType === 'video' ? 'Video' : 'Image'}`}
              </Button>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Analysis Failed</p>
                    <p className="text-sm text-red-600 mt-1">{error}</p>
                  </div>
                </div>
              )}

              {/* Results */}
              {results && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-secondary-900">
                    Analysis Results
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-secondary-900">
                        Confidence: {(results.confidence * 100).toFixed(1)}%
                      </span>
                    </div>

                    <div className="space-y-4">
                      {/* Detected Objects */}
                      {results.objects && results.objects.length > 0 && (
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
                      )}

                      {/* OCR Text */}
                      {results.text && results.text !== 'No text detected' && (
                        <div>
                          <p className="text-sm font-medium text-secondary-700 mb-2 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            OCR Text:
                          </p>
                          <p className="text-sm text-secondary-600 bg-white p-3 rounded border">
                            {results.text}
                          </p>
                        </div>
                      )}

                      {/* Labels */}
                      {results.labels && results.labels.length > 0 && (
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
                      )}

                      {/* Face Detection */}
                      {results.faces && results.faces.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-secondary-700 mb-2">
                            Faces Detected: {results.faces.length}
                          </p>
                          <div className="bg-white p-3 rounded border">
                            <ul className="text-sm text-secondary-600 space-y-1">
                              {results.faces.map((face, idx) => (
                                <li key={idx}>
                                  Face {idx + 1}: {face.emotion || 'N/A'}
                                  {face.age && ` (Age: ~${face.age})`}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Dominant Colors */}
                      {results.colors && results.colors.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-secondary-700 mb-2">
                            Dominant Colors:
                          </p>
                          <div className="flex gap-2">
                            {results.colors.map((color, idx) => (
                              <div
                                key={idx}
                                className="w-12 h-12 rounded-lg border-2 border-white shadow-sm"
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                      )}
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
                <li>• Product image/video analysis</li>
                <li>• Face detection and emotion analysis</li>
                <li>• Quality control inspection</li>
                <li>• Medical image analysis</li>
                <li>• Video content moderation</li>
                <li>• Object tracking in videos</li>
                <li>• Brand/logo detection</li>
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
