import { useState } from 'react';
import { Plus, Edit, Trash2, Copy, ClipboardList, X, Save, Search, Filter, Eye } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import { ENGINES, INDUSTRIES } from '../../utils/constants';

const RubricsPage = () => {
  // Pre-made rubrics for Precision AI Engines
  const engineRubrics = ENGINES.map((engine, index) => ({
    id: `engine-${engine.id}`,
    name: `${engine.name} Evaluation`,
    description: `Standard evaluation criteria for ${engine.name} outputs`,
    type: 'engine',
    category: engine.category,
    engineId: engine.id,
    criteria: getEngineCriteria(engine.id),
    usedBy: Math.floor(Math.random() * 20) + 5,
    isPreMade: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * (index + 1))
  }));

  // Pre-made rubrics for Industries
  const industryRubrics = [
    {
      id: 'finance-compliance',
      name: 'Financial Compliance Review',
      description: 'Evaluate financial documents for accuracy, compliance, and risk assessment',
      type: 'industry',
      category: 'Finance',
      industryId: 'finance',
      criteria: [
        { name: 'Accuracy', weight: 30, description: 'Data accuracy and calculation correctness' },
        { name: 'Regulatory Compliance', weight: 25, description: 'Adherence to financial regulations' },
        { name: 'Risk Assessment', weight: 20, description: 'Identification of financial risks' },
        { name: 'Completeness', weight: 15, description: 'All required information present' },
        { name: 'Audit Trail', weight: 10, description: 'Proper documentation and tracking' }
      ],
      usedBy: 18,
      isPreMade: true,
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
    },
    {
      id: 'healthcare-hipaa',
      name: 'Healthcare HIPAA Compliance',
      description: 'Evaluate healthcare documents for HIPAA compliance and medical accuracy',
      type: 'industry',
      category: 'Healthcare',
      industryId: 'healthcare',
      criteria: [
        { name: 'Patient Privacy', weight: 35, description: 'HIPAA compliance and data protection' },
        { name: 'Medical Accuracy', weight: 30, description: 'Correctness of medical information' },
        { name: 'Documentation Quality', weight: 20, description: 'Proper medical documentation' },
        { name: 'Security Standards', weight: 15, description: 'Data security measures' }
      ],
      usedBy: 24,
      isPreMade: true,
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
    },
    {
      id: 'legal-contract',
      name: 'Legal Contract Analysis',
      description: 'Comprehensive legal document review for risks and compliance',
      type: 'industry',
      category: 'Legal',
      industryId: 'legal',
      criteria: [
        { name: 'Legal Compliance', weight: 30, description: 'Adherence to laws and regulations' },
        { name: 'Risk Identification', weight: 25, description: 'Identify unfavorable terms and risks' },
        { name: 'Clarity & Precision', weight: 20, description: 'Clear and unambiguous language' },
        { name: 'Completeness', weight: 15, description: 'All necessary clauses present' },
        { name: 'Format Quality', weight: 10, description: 'Professional formatting' }
      ],
      usedBy: 16,
      isPreMade: true,
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10)
    },
    {
      id: 'hr-resume',
      name: 'HR Resume Screening',
      description: 'Evaluate candidate resumes for job requirements and qualifications',
      type: 'industry',
      category: 'HR & Recruitment',
      industryId: 'hr',
      criteria: [
        { name: 'Skills Match', weight: 35, description: 'Match with job requirements' },
        { name: 'Experience Relevance', weight: 30, description: 'Relevant work experience' },
        { name: 'Education', weight: 15, description: 'Educational qualifications' },
        { name: 'Cultural Fit', weight: 12, description: 'Company culture alignment' },
        { name: 'Presentation', weight: 8, description: 'Resume quality and professionalism' }
      ],
      usedBy: 32,
      isPreMade: true,
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)
    },
    {
      id: 'customer-service',
      name: 'Customer Service Quality',
      description: 'Evaluate customer support interactions for quality and satisfaction',
      type: 'industry',
      category: 'Customer Service',
      industryId: 'customer-service',
      criteria: [
        { name: 'Response Quality', weight: 40, description: 'Accuracy and helpfulness of response' },
        { name: 'Professionalism', weight: 25, description: 'Professional tone and demeanor' },
        { name: 'Resolution Time', weight: 20, description: 'Speed of issue resolution' },
        { name: 'Customer Satisfaction', weight: 15, description: 'Overall customer satisfaction' }
      ],
      usedBy: 28,
      isPreMade: true,
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4)
    },
    {
      id: 'retail-product',
      name: 'Retail Product Quality',
      description: 'Evaluate product listings and descriptions for e-commerce',
      type: 'industry',
      category: 'Retail',
      industryId: 'retail',
      criteria: [
        { name: 'Description Accuracy', weight: 30, description: 'Accurate product information' },
        { name: 'SEO Optimization', weight: 25, description: 'Search engine optimization' },
        { name: 'Image Quality', weight: 20, description: 'Product image quality' },
        { name: 'Categorization', weight: 15, description: 'Proper product categorization' },
        { name: 'Pricing Accuracy', weight: 10, description: 'Correct pricing information' }
      ],
      usedBy: 21,
      isPreMade: true,
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6)
    }
  ];

  const [rubrics, setRubrics] = useState([...engineRubrics, ...industryRubrics]);
  const [selectedRubric, setSelectedRubric] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'create', 'edit'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'engine', 'industry', 'custom'

  // Form state for creating/editing rubrics
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'custom',
    category: '',
    criteria: [{ name: '', weight: 0, description: '' }]
  });

  // Helper function to get engine-specific criteria
  function getEngineCriteria(engineId) {
    const criteriaMap = {
      vision: [
        { name: 'Object Detection Accuracy', weight: 30, description: 'Precision of detected objects' },
        { name: 'Image Quality', weight: 25, description: 'Quality and clarity of processed images' },
        { name: 'OCR Accuracy', weight: 20, description: 'Text recognition accuracy' },
        { name: 'Processing Speed', weight: 15, description: 'Speed of image analysis' },
        { name: 'Classification Confidence', weight: 10, description: 'Confidence scores reliability' }
      ],
      audio: [
        { name: 'Transcription Accuracy', weight: 35, description: 'Accuracy of speech-to-text' },
        { name: 'Speaker Identification', weight: 25, description: 'Accuracy of speaker detection' },
        { name: 'Noise Handling', weight: 20, description: 'Performance with background noise' },
        { name: 'Language Support', weight: 12, description: 'Multi-language capability' },
        { name: 'Processing Speed', weight: 8, description: 'Real-time processing capability' }
      ],
      text: [
        { name: 'Sentiment Accuracy', weight: 30, description: 'Accuracy of sentiment analysis' },
        { name: 'Entity Extraction', weight: 25, description: 'Precision of entity detection' },
        { name: 'Contextual Understanding', weight: 20, description: 'Understanding of context' },
        { name: 'Language Quality', weight: 15, description: 'Grammar and fluency' },
        { name: 'Summarization Quality', weight: 10, description: 'Quality of text summaries' }
      ],
      code: [
        { name: 'Code Quality', weight: 30, description: 'Overall code quality and cleanliness' },
        { name: 'Bug Detection', weight: 25, description: 'Accuracy of bug identification' },
        { name: 'Security Analysis', weight: 20, description: 'Security vulnerability detection' },
        { name: 'Performance Optimization', weight: 15, description: 'Code optimization suggestions' },
        { name: 'Documentation', weight: 10, description: 'Code documentation quality' }
      ],
      document: [
        { name: 'Text Extraction Quality', weight: 30, description: 'Accuracy of extracted text' },
        { name: 'Metadata Accuracy', weight: 25, description: 'Correctness of metadata extraction' },
        { name: 'Table Detection', weight: 20, description: 'Accuracy of table structure detection' },
        { name: 'Format Preservation', weight: 15, description: 'Preservation of document formatting' },
        { name: 'Multi-page Handling', weight: 10, description: 'Multi-page document processing' }
      ],
      data: [
        { name: 'Data Validation', weight: 30, description: 'Accuracy of data validation' },
        { name: 'Schema Detection', weight: 25, description: 'Correctness of schema identification' },
        { name: 'Transformation Quality', weight: 20, description: 'Quality of data transformations' },
        { name: 'Error Handling', weight: 15, description: 'Handling of data errors' },
        { name: 'Performance', weight: 10, description: 'Processing speed and efficiency' }
      ],
      web: [
        { name: 'Content Extraction', weight: 30, description: 'Accuracy of content extraction' },
        { name: 'Scraping Reliability', weight: 25, description: 'Reliability of web scraping' },
        { name: 'Data Freshness', weight: 20, description: 'Timeliness of scraped data' },
        { name: 'Error Handling', weight: 15, description: 'Handling of website changes' },
        { name: 'Performance', weight: 10, description: 'Speed and efficiency' }
      ]
    };
    return criteriaMap[engineId] || [];
  }

  const openModal = (mode, rubric = null) => {
    setModalMode(mode);
    if (mode === 'create') {
      setFormData({
        name: '',
        description: '',
        type: 'custom',
        category: '',
        criteria: [{ name: '', weight: 0, description: '' }]
      });
    } else if (mode === 'edit' && rubric) {
      setFormData({
        name: rubric.name,
        description: rubric.description,
        type: rubric.type,
        category: rubric.category,
        criteria: [...rubric.criteria]
      });
      setSelectedRubric(rubric);
    } else if (mode === 'view' && rubric) {
      setSelectedRubric(rubric);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRubric(null);
    setModalMode('view');
  };

  const handleDelete = (rubricId) => {
    if (window.confirm('Are you sure you want to delete this rubric?')) {
      setRubrics(rubrics.filter(r => r.id !== rubricId));
      closeModal();
    }
  };

  const handleDuplicate = (rubric) => {
    const newRubric = {
      ...rubric,
      id: `custom-${Date.now()}`,
      name: `${rubric.name} (Copy)`,
      type: 'custom',
      isPreMade: false,
      usedBy: 0,
      lastModified: new Date()
    };
    setRubrics([newRubric, ...rubrics]);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      const newRubric = {
        id: `custom-${Date.now()}`,
        ...formData,
        usedBy: 0,
        isPreMade: false,
        lastModified: new Date()
      };
      setRubrics([newRubric, ...rubrics]);
    } else if (modalMode === 'edit') {
      setRubrics(rubrics.map(r =>
        r.id === selectedRubric.id
          ? { ...r, ...formData, lastModified: new Date() }
          : r
      ));
    }
    closeModal();
  };

  const addCriterion = () => {
    setFormData({
      ...formData,
      criteria: [...formData.criteria, { name: '', weight: 0, description: '' }]
    });
  };

  const removeCriterion = (index) => {
    setFormData({
      ...formData,
      criteria: formData.criteria.filter((_, i) => i !== index)
    });
  };

  const updateCriterion = (index, field, value) => {
    const newCriteria = [...formData.criteria];
    newCriteria[index] = { ...newCriteria[index], [field]: value };
    setFormData({ ...formData, criteria: newCriteria });
  };

  // Filter rubrics
  const filteredRubrics = rubrics.filter(rubric => {
    const matchesSearch = rubric.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rubric.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || rubric.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTotalWeight = () => {
    return formData.criteria.reduce((sum, c) => sum + (parseFloat(c.weight) || 0), 0);
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 flex items-center gap-3">
              <ClipboardList className="w-8 h-8 text-primary-600" />
              Evaluation Rubrics
            </h1>
            <p className="text-secondary-600 mt-2">
              Pre-made and custom evaluation criteria for your AI agents (Tenant-specific)
            </p>
          </div>
          <button
            onClick={() => openModal('create')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center gap-2 font-semibold"
          >
            <Plus className="w-5 h-5" />
            Create Custom Rubric
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="text-sm font-medium text-secondary-600 mb-2">Total Rubrics</div>
            <div className="text-3xl font-bold text-secondary-900">{rubrics.length}</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="text-sm font-medium text-secondary-600 mb-2">Engine Rubrics</div>
            <div className="text-3xl font-bold text-primary-600">
              {rubrics.filter(r => r.type === 'engine').length}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="text-sm font-medium text-secondary-600 mb-2">Industry Rubrics</div>
            <div className="text-3xl font-bold text-secondary-600">
              {rubrics.filter(r => r.type === 'industry').length}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="text-sm font-medium text-secondary-600 mb-2">Active Agents</div>
            <div className="text-3xl font-bold text-secondary-900">
              {rubrics.reduce((sum, r) => sum + r.usedBy, 0)}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search rubrics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-secondary-600" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="engine">Engine Rubrics</option>
                <option value="industry">Industry Rubrics</option>
                <option value="custom">Custom Rubrics</option>
              </select>
            </div>
          </div>
        </div>

        {/* Rubrics Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">
                    Rubric Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">
                    Criteria
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">
                    Used By
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">
                    Last Modified
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRubrics.map((rubric) => (
                  <tr key={rubric.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openModal('view', rubric)}
                        className="text-left hover:text-primary-600 transition-colors"
                      >
                        <div className="font-semibold text-secondary-900">{rubric.name}</div>
                        <div className="text-sm text-secondary-600 mt-1">{rubric.description}</div>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        rubric.type === 'engine'
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : rubric.type === 'industry'
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        {rubric.type === 'engine' ? '⚙️ Engine' : rubric.type === 'industry' ? '🏢 Industry' : '✏️ Custom'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-secondary-900">{rubric.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-secondary-900">{rubric.criteria.length}</span>
                      <span className="text-sm text-secondary-600"> criteria</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                        {rubric.usedBy} agents
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-secondary-600">
                        {rubric.lastModified.toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal('view', rubric)}
                          className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicate(rubric)}
                          className="p-2 text-secondary-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Duplicate"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        {!rubric.isPreMade && (
                          <>
                            <button
                              onClick={() => openModal('edit', rubric)}
                              className="p-2 text-secondary-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(rubric.id)}
                              className="p-2 text-secondary-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-6 border border-primary-200">
          <h4 className="font-bold text-secondary-900 mb-2 flex items-center gap-2">
            <span>💡</span> About Evaluation Rubrics
          </h4>
          <p className="text-secondary-700 text-sm mb-3">
            Rubrics define the evaluation criteria and their weights that AI agents use to score submissions.
            Each criterion is scored individually, then combined using the weighted average to produce the final score.
          </p>
          <ul className="text-sm text-secondary-700 space-y-1">
            <li>• <strong>Engine Rubrics:</strong> Pre-configured for each Precision AI Engine</li>
            <li>• <strong>Industry Rubrics:</strong> Tailored for specific industries and use cases</li>
            <li>• <strong>Custom Rubrics:</strong> Create your own evaluation criteria</li>
            <li>• <strong>Tenant-Specific:</strong> All rubrics are private to your organization</li>
          </ul>
        </div>
      </div>

      {/* Modal for View/Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-primary-50 to-purple-50">
              <h2 className="text-2xl font-bold text-secondary-900">
                {modalMode === 'view' && 'View Rubric'}
                {modalMode === 'create' && 'Create Custom Rubric'}
                {modalMode === 'edit' && 'Edit Rubric'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-secondary-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {modalMode === 'view' && selectedRubric ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-secondary-900 mb-2">{selectedRubric.name}</h3>
                    <p className="text-secondary-600">{selectedRubric.description}</p>
                    <div className="flex gap-2 mt-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedRubric.type === 'engine'
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : selectedRubric.type === 'industry'
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        {selectedRubric.type}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-secondary-700 border border-gray-200">
                        {selectedRubric.category}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary-900 mb-3">Evaluation Criteria</h4>
                    <div className="space-y-3">
                      {selectedRubric.criteria.map((criterion, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-secondary-900">{criterion.name}</span>
                            <span className="text-lg font-bold text-primary-600">{criterion.weight}%</span>
                          </div>
                          {criterion.description && (
                            <p className="text-sm text-secondary-600">{criterion.description}</p>
                          )}
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all"
                              style={{ width: `${criterion.weight}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-secondary-600">
                      <p>Used by <strong>{selectedRubric.usedBy}</strong> agents</p>
                      <p>Last modified: {selectedRubric.lastModified.toLocaleDateString()}</p>
                    </div>
                    <div className="text-sm font-semibold text-secondary-900">
                      Total Weight: 100%
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Rubric Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="e.g., Custom Quality Assessment"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="Describe what this rubric evaluates..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Category *
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="e.g., Quality Assurance, Compliance, etc."
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-secondary-700">
                        Criteria * (Total: {getTotalWeight()}%)
                      </label>
                      <button
                        onClick={addCriterion}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Add Criterion
                      </button>
                    </div>

                    {getTotalWeight() !== 100 && formData.criteria.length > 0 && (
                      <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                        ⚠️ Total weight must equal 100% (currently {getTotalWeight()}%)
                      </div>
                    )}

                    <div className="space-y-3">
                      {formData.criteria.map((criterion, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-start gap-3">
                            <div className="flex-1 space-y-3">
                              <input
                                type="text"
                                value={criterion.name}
                                onChange={(e) => updateCriterion(index, 'name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                                placeholder="Criterion name"
                              />
                              <input
                                type="text"
                                value={criterion.description}
                                onChange={(e) => updateCriterion(index, 'description', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                                placeholder="Description (optional)"
                              />
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  value={criterion.weight}
                                  onChange={(e) => updateCriterion(index, 'weight', parseFloat(e.target.value) || 0)}
                                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                                  placeholder="Weight"
                                  min="0"
                                  max="100"
                                />
                                <span className="text-sm font-medium text-secondary-700">%</span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeCriterion(index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <div>
                {modalMode === 'view' && selectedRubric && !selectedRubric.isPreMade && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setModalMode('edit')}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors inline-flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Rubric
                    </button>
                    <button
                      onClick={() => handleDelete(selectedRubric.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors inline-flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 text-secondary-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {modalMode === 'view' ? 'Close' : 'Cancel'}
                </button>
                {(modalMode === 'create' || modalMode === 'edit') && (
                  <button
                    onClick={handleSave}
                    disabled={!formData.name || !formData.description || getTotalWeight() !== 100}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    {modalMode === 'create' ? 'Create Rubric' : 'Save Changes'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default RubricsPage;
