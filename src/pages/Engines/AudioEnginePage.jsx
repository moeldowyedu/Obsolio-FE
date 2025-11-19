import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Card, Button, Badge } from '../../components/common';
import { ENGINES } from '../../utils/constants';
import { Mic, Upload, CheckCircle } from 'lucide-react';

const AudioEnginePage = () => {
  const engine = ENGINES.find((e) => e.id === 'audio');
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedAudio(URL.createObjectURL(file));
      setResults(null);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResults({
        transcription: 'This is a sample transcription of the audio file. The Precision Audio Engine can accurately transcribe speech to text.',
        speakers: 2,
        sentiment: 'Positive',
        confidence: 0.91,
        language: 'English',
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
            <Mic className="w-10 h-10" />
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
                Test Audio Engine
              </h2>

              {/* Upload Area */}
              <div className="mb-6">
                <label className="block mb-2">
                  <span className="text-sm font-medium text-secondary-700">
                    Upload Audio File
                  </span>
                  <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-400 transition-colors cursor-pointer">
                    <div className="space-y-1 text-center">
                      {selectedAudio ? (
                        <audio controls src={selectedAudio} className="mx-auto" />
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
                            MP3, WAV, OGG up to 50MB
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="audio/*"
                      onChange={handleAudioUpload}
                    />
                  </div>
                </label>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!selectedAudio || analyzing}
                loading={analyzing}
                className="w-full mb-6"
              >
                {analyzing ? 'Analyzing...' : 'Analyze Audio'}
              </Button>

              {/* Results */}
              {results && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-secondary-900">
                    Analysis Results
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-secondary-900">
                        Confidence: {(results.confidence * 100).toFixed(1)}%
                      </span>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-secondary-700 mb-2">
                        Transcription:
                      </p>
                      <p className="text-sm text-secondary-600 bg-white p-3 rounded border">
                        {results.transcription}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Speakers</p>
                        <p className="text-lg font-semibold text-secondary-900">
                          {results.speakers}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Sentiment</p>
                        <Badge variant="success" size="sm">
                          {results.sentiment}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Language</p>
                        <p className="text-sm font-medium text-secondary-900">
                          {results.language}
                        </p>
                      </div>
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
                <li>• Meeting transcription</li>
                <li>• Podcast analysis</li>
                <li>• Customer call monitoring</li>
                <li>• Voice assistant integration</li>
                <li>• Audio content moderation</li>
              </ul>
            </Card>

            <Card padding="md" className="bg-gradient-to-br from-purple-50 to-purple-100">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Build with Audio
              </h3>
              <p className="text-sm text-secondary-700 mb-4">
                Create a custom agent using the Audio Engine
              </p>
              <Button
                onClick={() => (window.location.href = '/agents/create?engine=audio')}
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

export default AudioEnginePage;
