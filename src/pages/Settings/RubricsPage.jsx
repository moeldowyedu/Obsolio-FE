import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Copy, ClipboardList } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';

const RubricsPage = () => {
  const [rubrics, setRubrics] = useState([
    {
      id: '1',
      name: 'Code Quality Assessment',
      description: 'Comprehensive code review criteria for pull requests',
      criteria: [
        { name: 'Code Quality', weight: 30 },
        { name: 'Test Coverage', weight: 25 },
        { name: 'Documentation', weight: 20 },
        { name: 'Security', weight: 15 },
        { name: 'Performance', weight: 10 }
      ],
      usedBy: 12,
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
    },
    {
      id: '2',
      name: 'Document Compliance Check',
      description: 'Legal document review and compliance validation',
      criteria: [
        { name: 'Accuracy', weight: 35 },
        { name: 'Completeness', weight: 30 },
        { name: 'Legal Compliance', weight: 25 },
        { name: 'Format Quality', weight: 10 }
      ],
      usedBy: 8,
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12)
    },
    {
      id: '3',
      name: 'Customer Service Quality',
      description: 'Evaluate customer support interactions',
      criteria: [
        { name: 'Response Quality', weight: 40 },
        { name: 'Professionalism', weight: 25 },
        { name: 'Resolution Time', weight: 20 },
        { name: 'Customer Satisfaction', weight: 15 }
      ],
      usedBy: 25,
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);

  return (
    <MainLayout showSidebar={true}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <ClipboardList className="w-8 h-8 text-primary-600" />
                Evaluation Rubrics
              </h1>
              <p className="text-gray-600 mt-2">
                Define custom evaluation criteria and scoring systems for your AI agents
              </p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="glass-btn-primary rounded-xl px-6 py-3 font-semibold inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Rubric
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Total Rubrics</div>
            <div className="text-3xl font-bold text-gray-900">{rubrics.length}</div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Active Agents Using Rubrics</div>
            <div className="text-3xl font-bold text-gray-900">
              {rubrics.reduce((sum, r) => sum + r.usedBy, 0)}
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Avg Criteria per Rubric</div>
            <div className="text-3xl font-bold text-gray-900">
              {(rubrics.reduce((sum, r) => sum + r.criteria.length, 0) / rubrics.length).toFixed(1)}
            </div>
          </div>
        </div>

        {/* Rubrics List */}
        <div className="space-y-4">
          {rubrics.map((rubric) => (
            <div key={rubric.id} className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{rubric.name}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                      {rubric.usedBy} agents using
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{rubric.description}</p>

                  <div className="space-y-2">
                    {rubric.criteria.map((criterion, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">{criterion.name}</span>
                            <span className="text-sm font-bold text-primary-600">{criterion.weight}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                              style={{ width: `${criterion.weight}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-6">
                  <button className="glass-btn-secondary rounded-lg px-3 py-2 text-sm inline-flex items-center gap-2">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="glass-btn-secondary rounded-lg px-3 py-2 text-sm inline-flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="glass-btn-secondary rounded-lg px-3 py-2 text-sm inline-flex items-center gap-2 text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-200 pt-4 mt-4">
                <span>Last modified: {rubric.lastModified.toLocaleDateString()}</span>
                <span>•</span>
                <span>Total weight: 100%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-8 glass-card rounded-2xl p-6 bg-gradient-to-r from-primary-50 to-purple-50">
          <h4 className="font-bold text-gray-900 mb-2">💡 How Rubrics Work</h4>
          <p className="text-gray-700 text-sm">
            Rubrics define the evaluation criteria and their weights that AI agents use to score submissions.
            Each criterion is scored individually, then combined using the weighted average to produce the final score.
            Agents can be configured to use different rubrics for different types of evaluations.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default RubricsPage;
