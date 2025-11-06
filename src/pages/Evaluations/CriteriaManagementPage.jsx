import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import toast from 'react-hot-toast'

const CriteriaManagementPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('technology')
  const [isEditing, setIsEditing] = useState(false)
  const [showNewCriterionModal, setShowNewCriterionModal] = useState(false)

  const industries = [
    { id: 'technology', name: 'Technology', icon: 'computer', color: 'blue' },
    { id: 'law', name: 'Law & Legal', icon: 'gavel', color: 'purple' },
    { id: 'education', name: 'Education', icon: 'school', color: 'green' },
    { id: 'healthcare', name: 'Healthcare', icon: 'local_hospital', color: 'red' },
    { id: 'business', name: 'Business', icon: 'business_center', color: 'orange' },
    { id: 'creative', name: 'Creative Arts', icon: 'palette', color: 'pink' },
    { id: 'engineering', name: 'Engineering', icon: 'engineering', color: 'indigo' },
    { id: 'competitions', name: 'Competitions', icon: 'emoji_events', color: 'yellow' },
  ]

  const [criteriaData, setCriteriaData] = useState({
    technology: {
      name: 'Technology',
      description: 'Evaluation criteria for technology and software projects',
      criteria: [
        { id: 1, name: 'Code Quality', weight: 25, description: 'Clean, readable, and maintainable code', enabled: true },
        { id: 2, name: 'Documentation', weight: 20, description: 'Clear documentation and comments', enabled: true },
        { id: 3, name: 'Best Practices', weight: 25, description: 'Adherence to industry standards', enabled: true },
        { id: 4, name: 'Performance', weight: 15, description: 'Efficiency and optimization', enabled: true },
        { id: 5, name: 'Testing', weight: 15, description: 'Test coverage and quality', enabled: true },
      ],
      gradingScale: [
        { name: 'Excellent', range: '90-100', description: 'Exceptional quality, exceeds expectations' },
        { name: 'Good', range: '80-89', description: 'High quality, meets all requirements' },
        { name: 'Satisfactory', range: '70-79', description: 'Acceptable quality, meets most requirements' },
        { name: 'Needs Improvement', range: '60-69', description: 'Basic quality, requires improvements' },
        { name: 'Unsatisfactory', range: '0-59', description: 'Does not meet minimum requirements' },
      ]
    },
    education: {
      name: 'Education',
      description: 'Evaluation criteria for educational content and materials',
      criteria: [
        { id: 1, name: 'Content Quality', weight: 30, description: 'Accuracy and relevance of content', enabled: true },
        { id: 2, name: 'Pedagogical Approach', weight: 25, description: 'Teaching methodology and effectiveness', enabled: true },
        { id: 3, name: 'Engagement', weight: 20, description: 'Ability to engage and motivate learners', enabled: true },
        { id: 4, name: 'Assessment', weight: 15, description: 'Quality of learning assessments', enabled: true },
        { id: 5, name: 'Accessibility', weight: 10, description: 'Inclusive design and accessibility', enabled: true },
      ],
      gradingScale: [
        { name: 'Excellent', range: '90-100', description: 'Outstanding educational value' },
        { name: 'Good', range: '80-89', description: 'Strong educational content' },
        { name: 'Satisfactory', range: '70-79', description: 'Adequate educational quality' },
        { name: 'Needs Improvement', range: '60-69', description: 'Requires enhancement' },
        { name: 'Unsatisfactory', range: '0-59', description: 'Does not meet standards' },
      ]
    },
  })

  const currentIndustryData = criteriaData[selectedIndustry] || {
    name: industries.find(i => i.id === selectedIndustry)?.name || 'Industry',
    description: 'No criteria defined for this industry yet',
    criteria: [],
    gradingScale: []
  }

  const handleCriterionToggle = (id) => {
    setCriteriaData(prev => ({
      ...prev,
      [selectedIndustry]: {
        ...prev[selectedIndustry],
        criteria: prev[selectedIndustry].criteria.map(c =>
          c.id === id ? { ...c, enabled: !c.enabled } : c
        )
      }
    }))
    toast.success('Criterion status updated')
  }

  const handleWeightChange = (id, newWeight) => {
    setCriteriaData(prev => ({
      ...prev,
      [selectedIndustry]: {
        ...prev[selectedIndustry],
        criteria: prev[selectedIndustry].criteria.map(c =>
          c.id === id ? { ...c, weight: Number(newWeight) } : c
        )
      }
    }))
  }

  const handleDeleteCriterion = (id) => {
    if (window.confirm('Are you sure you want to delete this criterion?')) {
      setCriteriaData(prev => ({
        ...prev,
        [selectedIndustry]: {
          ...prev[selectedIndustry],
          criteria: prev[selectedIndustry].criteria.filter(c => c.id !== id)
        }
      }))
      toast.success('Criterion deleted')
    }
  }

  const handleSaveChanges = () => {
    setIsEditing(false)
    toast.success('Changes saved successfully')
  }

  const totalWeight = currentIndustryData.criteria
    .filter(c => c.enabled)
    .reduce((sum, c) => sum + c.weight, 0)

  const selectedIndustryInfo = industries.find(i => i.id === selectedIndustry)

  return (
    <MainLayout>
      <div className="py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 font-heading">Evaluation Criteria</h1>
            <p className="text-gray-600">Manage rubrics and scoring criteria for different industries</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="glass-btn-secondary rounded-xl px-6 py-3 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="glass-btn-primary rounded-xl px-6 py-3 font-semibold inline-flex items-center"
                >
                  <span className="material-icons mr-2">save</span>
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="glass-btn-primary rounded-xl px-6 py-3 font-semibold inline-flex items-center"
              >
                <span className="material-icons mr-2">edit</span>
                Edit Criteria
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Industry Selector Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Industries</h2>
              <div className="space-y-2">
                {industries.map((industry) => (
                  <button
                    key={industry.id}
                    onClick={() => setSelectedIndustry(industry.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                      selectedIndustry === industry.id
                        ? `bg-${industry.color}-100 text-${industry.color}-800 font-semibold`
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className={`material-icons text-sm mr-3 ${
                      selectedIndustry === industry.id ? `text-${industry.color}-600` : ''
                    }`}>
                      {industry.icon}
                    </span>
                    <span className="text-sm">{industry.name}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full glass-btn-secondary rounded-xl px-4 py-2 text-sm font-semibold flex items-center justify-center">
                  <span className="material-icons text-sm mr-2">add</span>
                  Add Industry
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Industry Info */}
            <div className="glass-card rounded-2xl p-6 bg-gradient-to-r from-primary-50 to-white">
              <div className="flex items-start space-x-4">
                <div className={`w-16 h-16 rounded-2xl bg-${selectedIndustryInfo?.color}-100 flex items-center justify-center`}>
                  <span className={`material-icons text-3xl text-${selectedIndustryInfo?.color}-600`}>
                    {selectedIndustryInfo?.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentIndustryData.name}</h2>
                  <p className="text-gray-600">{currentIndustryData.description}</p>
                </div>
              </div>
            </div>

            {/* Criteria List */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Evaluation Criteria</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Total Weight: <span className={`font-semibold ${totalWeight === 100 ? 'text-green-600' : 'text-red-600'}`}>
                      {totalWeight}%
                    </span>
                    {totalWeight !== 100 && (
                      <span className="ml-2 text-red-600">⚠️ Should equal 100%</span>
                    )}
                  </p>
                </div>
                {isEditing && (
                  <button
                    onClick={() => setShowNewCriterionModal(true)}
                    className="glass-btn-primary rounded-xl px-4 py-2 text-sm font-semibold flex items-center"
                  >
                    <span className="material-icons text-sm mr-2">add</span>
                    Add Criterion
                  </button>
                )}
              </div>

              {currentIndustryData.criteria.length === 0 ? (
                <div className="text-center py-12">
                  <span className="material-icons text-6xl text-gray-300 mb-4">tune</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No criteria defined</h3>
                  <p className="text-gray-600 mb-6">Add evaluation criteria for this industry</p>
                  <button
                    onClick={() => setShowNewCriterionModal(true)}
                    className="glass-btn-primary rounded-xl px-6 py-3 font-semibold"
                  >
                    Add First Criterion
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {currentIndustryData.criteria.map((criterion) => (
                    <div
                      key={criterion.id}
                      className={`glass-card rounded-xl p-5 transition-all ${
                        !criterion.enabled ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          {/* Enable/Disable Toggle */}
                          <button
                            onClick={() => handleCriterionToggle(criterion.id)}
                            disabled={!isEditing}
                            className={`mt-1 ${!isEditing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            <span className={`material-icons ${
                              criterion.enabled ? 'text-green-600' : 'text-gray-400'
                            }`}>
                              {criterion.enabled ? 'check_circle' : 'radio_button_unchecked'}
                            </span>
                          </button>

                          {/* Criterion Details */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-lg font-semibold text-gray-900">{criterion.name}</h4>
                              {isEditing ? (
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="number"
                                    value={criterion.weight}
                                    onChange={(e) => handleWeightChange(criterion.id, e.target.value)}
                                    className="glass-input w-20 px-3 py-1 text-center"
                                    min="0"
                                    max="100"
                                  />
                                  <span className="text-gray-600 font-medium">%</span>
                                </div>
                              ) : (
                                <span className="text-xl font-bold text-primary-600">{criterion.weight}%</span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{criterion.description}</p>

                            {/* Progress Bar */}
                            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all"
                                style={{ width: `${criterion.weight}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        {isEditing && (
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => handleDeleteCriterion(criterion.id)}
                              className="text-red-600 hover:text-red-700"
                              title="Delete"
                            >
                              <span className="material-icons text-sm">delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Grading Scale */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Grading Scale</h3>
              {currentIndustryData.gradingScale.length === 0 ? (
                <p className="text-center text-gray-600 py-8">No grading scale defined</p>
              ) : (
                <div className="space-y-3">
                  {currentIndustryData.gradingScale.map((grade, index) => (
                    <div
                      key={index}
                      className="glass-card rounded-xl p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${
                          index === 0 ? 'from-green-400 to-green-600' :
                          index === 1 ? 'from-blue-400 to-blue-600' :
                          index === 2 ? 'from-yellow-400 to-yellow-600' :
                          index === 3 ? 'from-orange-400 to-orange-600' :
                          'from-red-400 to-red-600'
                        } flex items-center justify-center`}>
                          <span className="text-white font-bold">{grade.range.split('-')[0]}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-semibold text-gray-900">{grade.name}</h4>
                            <span className="text-primary-600 font-semibold">{grade.range}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{grade.description}</p>
                        </div>
                      </div>
                      {isEditing && (
                        <button className="ml-4 text-gray-600 hover:text-gray-800">
                          <span className="material-icons text-sm">edit</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Usage Stats */}
            <div className="glass-card rounded-2xl p-6 bg-gradient-to-r from-blue-50 to-white">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="material-icons text-blue-600 mr-2">analytics</span>
                Usage Statistics
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">47</div>
                  <div className="text-sm text-gray-600 mt-1">Total Evaluations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">92%</div>
                  <div className="text-sm text-gray-600 mt-1">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">85</div>
                  <div className="text-sm text-gray-600 mt-1">Avg. Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default CriteriaManagementPage
