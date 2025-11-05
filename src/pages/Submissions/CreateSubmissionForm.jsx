import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import MainLayout from '../../components/layout/MainLayout'
import { industries, industryRubrics, additionalFieldConfigs } from '../../utils/industryConfig'
import toast from 'react-hot-toast'

const CreateSubmissionForm = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const selectedAgent = searchParams.get('agent')

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    title: '',
    description: '',
    industry: '',
    agent: selectedAgent || '',

    // Step 2: Industry-specific fields
    industryFields: {},

    // Step 3: Rubric & Grading
    useDefaultRubric: true,
    customCriteria: [],
    gradingScale: [],

    // Step 4: File Upload
    files: [],
  })

  const [industryConfig, setIndustryConfig] = useState(null)

  useEffect(() => {
    if (formData.industry) {
      const config = industryRubrics[formData.industry]
      setIndustryConfig(config)
      if (formData.useDefaultRubric && config) {
        setFormData(prev => ({
          ...prev,
          customCriteria: config.defaultCriteria,
          gradingScale: config.gradingScale,
        }))
      }
    }
  }, [formData.industry, formData.useDefaultRubric])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleIndustryFieldChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      industryFields: {
        ...prev.industryFields,
        [fieldName]: value,
      },
    }))
  }

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files)
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...uploadedFiles],
    }))
  }

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  const handleCriteriaChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      customCriteria: prev.customCriteria.map((criterion, i) =>
        i === index ? { ...criterion, [field]: value } : criterion
      ),
    }))
  }

  const addCriterion = () => {
    setFormData(prev => ({
      ...prev,
      customCriteria: [
        ...prev.customCriteria,
        { name: '', weight: 0, description: '' },
      ],
    }))
  }

  const removeCriterion = (index) => {
    setFormData(prev => ({
      ...prev,
      customCriteria: prev.customCriteria.filter((_, i) => i !== index),
    }))
  }

  const handleNextStep = () => {
    // Validate current step
    if (step === 1 && (!formData.title || !formData.industry || !formData.agent)) {
      toast.error('Please fill in all required fields')
      return
    }
    setStep(prev => prev + 1)
  }

  const handlePrevStep = () => {
    setStep(prev => prev - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate final step
    if (formData.files.length === 0) {
      toast.error('Please upload at least one file')
      return
    }

    // Here you would send to N8n webhook
    console.log('Submitting to N8n:', formData)
    toast.success('Submission created successfully!')
    navigate('/submissions')
  }

  const totalWeight = formData.customCriteria.reduce((sum, c) => sum + Number(c.weight || 0), 0)

  return (
    <MainLayout>
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {['Basic Info', 'Industry Details', 'Evaluation Criteria', 'Upload Files'].map((label, index) => (
                <div key={index} className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step > index + 1
                      ? 'bg-primary-500 text-white'
                      : step === index + 1
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step > index + 1 ? (
                      <span className="material-icons text-sm">check</span>
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    step >= index + 1 ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {label}
                  </span>
                  {index < 3 && (
                    <div className={`flex-1 h-1 mx-4 ${
                      step > index + 1 ? 'bg-primary-500' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Submission Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="glass-input w-full"
                    placeholder="Enter a descriptive title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="glass-input w-full"
                    rows="4"
                    placeholder="Provide additional context about your submission"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Industry / Field *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {industries.map((industry) => (
                      <div
                        key={industry.id}
                        onClick={() => setFormData(prev => ({ ...prev, industry: industry.id }))}
                        className={`glass-card rounded-xl p-4 cursor-pointer text-center transition-all ${
                          formData.industry === industry.id
                            ? 'ring-2 ring-primary-500 bg-primary-50'
                            : 'hover:shadow-lg'
                        }`}
                      >
                        <span className={`material-icons text-3xl mb-2 ${
                          formData.industry === industry.id ? 'text-primary-600' : 'text-gray-600'
                        }`}>
                          {industry.icon}
                        </span>
                        <p className="text-xs font-medium text-gray-800">{industry.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    AI Agent *
                  </label>
                  <select
                    name="agent"
                    value={formData.agent}
                    onChange={handleChange}
                    className="glass-input w-full"
                    required
                  >
                    <option value="">Select an AI Agent</option>
                    <option value="video-audio">Video & Audio Analysis</option>
                    <option value="document">Document Review</option>
                    <option value="code">Source Code Assessment</option>
                    <option value="custom">Custom Evaluation</option>
                    <option value="report">AI Report Generation</option>
                    <option value="consistent">Objective & Consistent</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Industry-Specific Fields */}
            {step === 2 && industryConfig && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Industry-Specific Details</h2>

                {industryConfig.additionalFields.map((fieldName) => {
                  const fieldConfig = additionalFieldConfigs[fieldName]
                  if (!fieldConfig) return null

                  return (
                    <div key={fieldName}>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        {fieldConfig.label} {fieldConfig.required && '*'}
                      </label>

                      {fieldConfig.type === 'select' ? (
                        <select
                          value={formData.industryFields[fieldName] || ''}
                          onChange={(e) => handleIndustryFieldChange(fieldName, e.target.value)}
                          className="glass-input w-full"
                          required={fieldConfig.required}
                        >
                          <option value="">Select an option</option>
                          {fieldConfig.options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : fieldConfig.type === 'textarea' ? (
                        <textarea
                          value={formData.industryFields[fieldName] || ''}
                          onChange={(e) => handleIndustryFieldChange(fieldName, e.target.value)}
                          className="glass-input w-full"
                          rows="4"
                          placeholder={fieldConfig.placeholder}
                          required={fieldConfig.required}
                        />
                      ) : fieldConfig.type === 'number' ? (
                        <input
                          type="number"
                          value={formData.industryFields[fieldName] || ''}
                          onChange={(e) => handleIndustryFieldChange(fieldName, e.target.value)}
                          className="glass-input w-full"
                          placeholder={fieldConfig.placeholder}
                          required={fieldConfig.required}
                        />
                      ) : (
                        <input
                          type="text"
                          value={formData.industryFields[fieldName] || ''}
                          onChange={(e) => handleIndustryFieldChange(fieldName, e.target.value)}
                          className="glass-input w-full"
                          placeholder={fieldConfig.placeholder}
                          required={fieldConfig.required}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {/* Step 3: Rubric & Grading */}
            {step === 3 && industryConfig && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Evaluation Criteria</h2>

                <div className="glass-card rounded-xl p-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="useDefaultRubric"
                      checked={formData.useDefaultRubric}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-800">
                      Use default rubric for {industries.find(i => i.id === formData.industry)?.name}
                    </span>
                  </label>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium text-gray-800">
                      Evaluation Criteria (Total Weight: {totalWeight}%)
                    </label>
                    {!formData.useDefaultRubric && (
                      <button
                        type="button"
                        onClick={addCriterion}
                        className="glass-btn-secondary rounded-lg px-4 py-2 text-sm"
                      >
                        <span className="material-icons text-sm mr-1">add</span>
                        Add Criterion
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {formData.customCriteria.map((criterion, index) => (
                      <div key={index} className="glass-card rounded-xl p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input
                            type="text"
                            value={criterion.name}
                            onChange={(e) => handleCriteriaChange(index, 'name', e.target.value)}
                            className="glass-input"
                            placeholder="Criterion name"
                            disabled={formData.useDefaultRubric}
                          />
                          <input
                            type="number"
                            value={criterion.weight}
                            onChange={(e) => handleCriteriaChange(index, 'weight', e.target.value)}
                            className="glass-input"
                            placeholder="Weight %"
                            min="0"
                            max="100"
                            disabled={formData.useDefaultRubric}
                          />
                          <input
                            type="text"
                            value={criterion.description}
                            onChange={(e) => handleCriteriaChange(index, 'description', e.target.value)}
                            className="glass-input"
                            placeholder="Description"
                            disabled={formData.useDefaultRubric}
                          />
                        </div>
                        {!formData.useDefaultRubric && formData.customCriteria.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCriterion(index)}
                            className="mt-2 text-red-600 hover:text-red-700 text-sm flex items-center"
                          >
                            <span className="material-icons text-sm mr-1">delete</span>
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {totalWeight !== 100 && (
                    <p className="text-red-600 text-sm mt-2">
                      ⚠️ Total weight should equal 100%
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-4">
                    Grading Scale
                  </label>
                  <div className="space-y-2">
                    {formData.gradingScale.map((grade, index) => (
                      <div key={index} className="glass-card rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="font-semibold text-gray-900">{grade.name}</span>
                          <span className="text-primary-600 font-medium">{grade.range}</span>
                        </div>
                        <span className="text-sm text-gray-600">{grade.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: File Upload */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Files</h2>

                <div className="dropzone">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    multiple
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="text-center">
                      <span className="material-icons text-6xl text-primary-600 mb-4">cloud_upload</span>
                      <p className="text-lg font-semibold text-gray-900 mb-2">
                        Drop files here or click to upload
                      </p>
                      <p className="text-sm text-gray-600">
                        Supports video, audio, documents, code files, and images
                      </p>
                    </div>
                  </label>
                </div>

                {formData.files.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 mb-3">Uploaded Files ({formData.files.length})</h3>
                    <div className="space-y-2">
                      {formData.files.map((file, index) => (
                        <div key={index} className="glass-card rounded-lg p-3 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="material-icons text-primary-600">insert_drive_file</span>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <span className="material-icons">delete</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="glass-btn-secondary rounded-xl px-6 py-3"
                >
                  <span className="material-icons mr-2">arrow_back</span>
                  Previous
                </button>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="glass-btn-primary rounded-xl px-6 py-3 ml-auto"
                >
                  Next
                  <span className="material-icons ml-2">arrow_forward</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="glass-btn-primary rounded-xl px-8 py-3 ml-auto glow"
                >
                  Submit for Evaluation
                  <span className="material-icons ml-2">send</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}

export default CreateSubmissionForm
