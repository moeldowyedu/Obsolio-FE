import { useState } from 'react';
import { Briefcase, Plus, Trash2, Edit2, Check, X, Sparkles } from 'lucide-react';
import Input from '../../common/Input/Input';
import Select from '../../common/Input/Select';
import Textarea from '../../common/Input/Textarea';
import Button from '../../common/Button/Button';
import { useRegistrationWizardStore } from '../../../store/registrationWizardStore';

const DepartmentsSetupStep = ({ onNext, onBack }) => {
  const {
    organizationData,
    addDepartment,
    updateDepartment,
    removeDepartment,
    loadDepartmentTemplate,
  } = useRegistrationWizardStore();

  const departments = organizationData.departments;
  const branches = organizationData.branches;

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showTemplates, setShowTemplates] = useState(departments.length === 0);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    head: '',
    branchId: '',
    budgetAllocation: '',
  });
  const [errors, setErrors] = useState({});

  const templates = [
    {
      id: 'corporate',
      name: 'Corporate',
      description: 'Standard corporate structure',
      icon: '🏢',
      departments: ['HR', 'Finance', 'Legal', 'IT', 'Operations'],
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      description: 'Healthcare organization',
      icon: '🏥',
      departments: ['Administration', 'Nursing', 'Radiology', 'Pharmacy'],
    },
    {
      id: 'legal',
      name: 'Legal Firm',
      description: 'Law firm structure',
      icon: '⚖️',
      departments: ['Litigation', 'Corporate', 'IP', 'Compliance'],
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      description: 'Manufacturing company',
      icon: '🏭',
      departments: ['Production', 'QC', 'Supply Chain', 'R&D'],
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (departments.length === 0) {
      setErrors({ general: 'Please add at least one department or select a template' });
      return;
    }
    onNext();
  };

  const validateDepartmentForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Department name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddDepartment = () => {
    if (validateDepartmentForm()) {
      addDepartment(formData);
      resetForm();
      setIsAdding(false);
      setShowTemplates(false);
    }
  };

  const handleUpdateDepartment = () => {
    if (validateDepartmentForm()) {
      updateDepartment(editingId, formData);
      resetForm();
      setEditingId(null);
    }
  };

  const handleEditDepartment = (department) => {
    setFormData({
      name: department.name,
      description: department.description || '',
      head: department.head || '',
      branchId: department.branchId || '',
      budgetAllocation: department.budgetAllocation || '',
    });
    setEditingId(department.id);
    setIsAdding(false);
    setShowTemplates(false);
  };

  const handleRemoveDepartment = (id) => {
    removeDepartment(id);
    if (departments.length === 1) {
      setShowTemplates(true);
    }
  };

  const handleLoadTemplate = (templateId) => {
    loadDepartmentTemplate(templateId);
    setShowTemplates(false);
    setErrors({});
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      head: '',
      branchId: '',
      budgetAllocation: '',
    });
    setErrors({});
  };

  const handleCancel = () => {
    resetForm();
    setIsAdding(false);
    setEditingId(null);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-secondary-900 mb-2">Departments Structure</h2>
        <p className="text-secondary-600">
          Set up your organization's departments. Choose a template or create custom departments.
          <span className="block text-sm font-medium text-primary-600 mt-1">Required - At least one department</span>
        </p>
      </div>

      {/* Templates Section */}
      {showTemplates && departments.length === 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-secondary-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Quick Start Templates
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleLoadTemplate(template.id)}
                className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-600 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{template.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-secondary-900 mb-1">{template.name}</h4>
                    <p className="text-sm text-secondary-600 mb-2">{template.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {template.departments.map((dept, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-gray-100 text-secondary-700 text-xs rounded"
                        >
                          {dept}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setShowTemplates(false);
                setIsAdding(true);
              }}
              className="text-primary-600 hover:text-primary-600 text-sm font-medium"
            >
              Or create custom departments
            </button>
          </div>
        </div>
      )}

      {/* Existing Departments List */}
      {departments.length > 0 && (
        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-secondary-900">
              Your Departments ({departments.length})
            </h3>
            {!showTemplates && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowTemplates(true)}
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Use Template
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {departments.map((department) => (
              <div
                key={department.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary-600" />
                    <h4 className="font-semibold text-secondary-900">{department.name}</h4>
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => handleEditDepartment(department)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveDepartment(department.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {department.description && (
                  <p className="text-sm text-secondary-600 mb-2">{department.description}</p>
                )}
                <div className="space-y-1 text-xs text-gray-500">
                  {department.head && <p>Head: {department.head}</p>}
                  {department.branchId && branches.find((b) => b.id === parseInt(department.branchId)) && (
                    <p>
                      Branch: {branches.find((b) => b.id === parseInt(department.branchId)).name}
                    </p>
                  )}
                  {department.budgetAllocation && <p>Budget: ${department.budgetAllocation}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Department Form */}
      {(isAdding || editingId) && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            {editingId ? 'Edit Department' : 'Add New Department'}
          </h3>
          <div className="space-y-4">
            <Input
              label="Department Name"
              type="text"
              placeholder="Human Resources"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={errors.name}
              required
              fullWidth
            />

            <Textarea
              label="Description"
              placeholder="Briefly describe the department's responsibilities..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              helperText="Optional"
              fullWidth
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Department Head"
                type="text"
                placeholder="Jane Smith"
                value={formData.head}
                onChange={(e) => handleChange('head', e.target.value)}
                helperText="Optional"
                fullWidth
              />

              {branches.length > 0 && (
                <Select
                  label="Parent Branch"
                  value={formData.branchId}
                  onChange={(e) => handleChange('branchId', e.target.value)}
                  options={[
                    { value: '', label: 'No specific branch' },
                    ...branches.map((b) => ({ value: b.id, label: b.name })),
                  ]}
                  helperText="Optional - assign to a branch"
                  fullWidth
                />
              )}

              <Input
                label="Budget Allocation"
                type="number"
                placeholder="100000"
                value={formData.budgetAllocation}
                onChange={(e) => handleChange('budgetAllocation', e.target.value)}
                helperText="Optional - annual budget in USD"
                fullWidth
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="primary"
                onClick={editingId ? handleUpdateDepartment : handleAddDepartment}
                leftIcon={<Check className="w-4 h-4" />}
              >
                {editingId ? 'Update Department' : 'Add Department'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                leftIcon={<X className="w-4 h-4" />}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Department Button */}
      {!isAdding && !editingId && !showTemplates && (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-secondary-600 hover:border-primary-600 hover:text-primary-600 transition-colors flex items-center justify-center gap-2 mb-6"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Another Department</span>
        </button>
      )}

      {/* Error Message */}
      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{errors.general}</p>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 mb-6">
        <div className="flex-shrink-0">
          <Briefcase className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h4 className="font-medium text-blue-900 mb-1">Department Structure</h4>
          <p className="text-sm text-blue-700">
            Departments help organize your workforce and define clear responsibilities. You can
            assign departments to specific branches and set budget allocations for better resource
            management.
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between gap-4 pt-4">
          <Button variant="outline" size="lg" onClick={onBack} type="button">
            Back
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="min-w-[200px]"
            disabled={departments.length === 0}
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentsSetupStep;
