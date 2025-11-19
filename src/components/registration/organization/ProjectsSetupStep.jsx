import { useState } from 'react';
import { FolderKanban, Plus, Trash2, Edit2, Check, X, Calendar } from 'lucide-react';
import Input from '../../common/Input/Input';
import Select from '../../common/Input/Select';
import Button from '../../common/Button/Button';
import { useRegistrationWizardStore } from '../../../store/registrationWizardStore';

const ProjectsSetupStep = ({ onNext, onBack }) => {
  const { organizationData, addProject, updateProject, removeProject } =
    useRegistrationWizardStore();

  const projects = organizationData.projects;
  const departments = organizationData.departments;

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    manager: '',
    departmentId: '',
    startDate: '',
    endDate: '',
    budget: '',
    status: 'planning',
  });
  const [errors, setErrors] = useState({});

  const projectStatuses = [
    { value: 'planning', label: 'Planning' },
    { value: 'active', label: 'Active' },
    { value: 'on-hold', label: 'On Hold' },
    { value: 'completed', label: 'Completed' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const validateProjectForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Project name is required';
    }

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProject = () => {
    if (validateProjectForm()) {
      addProject(formData);
      resetForm();
      setIsAdding(false);
    }
  };

  const handleUpdateProject = () => {
    if (validateProjectForm()) {
      updateProject(editingId, formData);
      resetForm();
      setEditingId(null);
    }
  };

  const handleEditProject = (project) => {
    setFormData({
      name: project.name,
      manager: project.manager || '',
      departmentId: project.departmentId || '',
      startDate: project.startDate || '',
      endDate: project.endDate || '',
      budget: project.budget || '',
      status: project.status || 'planning',
    });
    setEditingId(project.id);
    setIsAdding(false);
  };

  const handleRemoveProject = (id) => {
    removeProject(id);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      manager: '',
      departmentId: '',
      startDate: '',
      endDate: '',
      budget: '',
      status: 'planning',
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

  const getStatusBadgeColor = (status) => {
    const colors = {
      planning: 'bg-yellow-100 text-yellow-700',
      active: 'bg-green-100 text-green-700',
      'on-hold': 'bg-gray-100 text-gray-700',
      completed: 'bg-blue-100 text-blue-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-secondary-900 mb-2">Projects Setup</h2>
        <p className="text-secondary-600">
          Add projects your organization is working on. Track timelines, budgets, and assignments.
          <span className="block text-sm text-gray-500 mt-1">
            This step is optional - skip if you don't use project-based work
          </span>
        </p>
      </div>

      {/* Existing Projects List */}
      {projects.length > 0 && (
        <div className="mb-6 space-y-3">
          <h3 className="text-lg font-semibold text-secondary-900 mb-3">
            Your Projects ({projects.length})
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FolderKanban className="w-5 h-5 text-primary-600" />
                      <h4 className="font-semibold text-secondary-900">{project.name}</h4>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded ${getStatusBadgeColor(
                          project.status
                        )}`}
                      >
                        {projectStatuses.find((s) => s.value === project.status)?.label ||
                          project.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-secondary-600">
                      {project.manager && <p>Manager: {project.manager}</p>}
                      {project.departmentId &&
                        departments.find((d) => d.id === parseInt(project.departmentId)) && (
                          <p>
                            Department:{' '}
                            {departments.find((d) => d.id === parseInt(project.departmentId)).name}
                          </p>
                        )}
                      {project.startDate && (
                        <p className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          Start: {new Date(project.startDate).toLocaleDateString()}
                        </p>
                      )}
                      {project.endDate && (
                        <p className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          End: {new Date(project.endDate).toLocaleDateString()}
                        </p>
                      )}
                      {project.budget && <p>Budget: ${Number(project.budget).toLocaleString()}</p>}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditProject(project)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(project.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Project Form */}
      {(isAdding || editingId) && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            {editingId ? 'Edit Project' : 'Add New Project'}
          </h3>
          <div className="space-y-4">
            <Input
              label="Project Name"
              type="text"
              placeholder="Q4 Marketing Campaign"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={errors.name}
              required
              fullWidth
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Project Manager"
                type="text"
                placeholder="John Doe"
                value={formData.manager}
                onChange={(e) => handleChange('manager', e.target.value)}
                helperText="Optional"
                fullWidth
              />

              {departments.length > 0 && (
                <Select
                  label="Assigned Department"
                  value={formData.departmentId}
                  onChange={(e) => handleChange('departmentId', e.target.value)}
                  options={[
                    { value: '', label: 'No specific department' },
                    ...departments.map((d) => ({ value: d.id, label: d.name })),
                  ]}
                  helperText="Optional"
                  fullWidth
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                helperText="Optional"
                fullWidth
              />

              <Input
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                error={errors.endDate}
                helperText="Optional"
                fullWidth
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Budget (USD)"
                type="number"
                placeholder="50000"
                value={formData.budget}
                onChange={(e) => handleChange('budget', e.target.value)}
                helperText="Optional - project budget"
                fullWidth
              />

              <Select
                label="Status"
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                options={projectStatuses}
                required
                fullWidth
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="primary"
                onClick={editingId ? handleUpdateProject : handleAddProject}
                leftIcon={<Check className="w-4 h-4" />}
              >
                {editingId ? 'Update Project' : 'Add Project'}
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

      {/* Add Project Button */}
      {!isAdding && !editingId && (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-secondary-600 hover:border-primary-600 hover:text-primary-600 transition-colors flex items-center justify-center gap-2 mb-6"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Project</span>
        </button>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 mb-6">
        <div className="flex-shrink-0">
          <FolderKanban className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h4 className="font-medium text-blue-900 mb-1">Project Management</h4>
          <p className="text-sm text-blue-700">
            Projects help you organize work that has a defined timeline and deliverables. You can
            track budgets, assign managers, and link projects to specific departments. This is
            optional and can be skipped if your work isn't project-based.
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between gap-4 pt-4">
          <Button variant="outline" size="lg" onClick={onBack} type="button">
            Back
          </Button>
          <div className="flex gap-3">
            {projects.length === 0 && (
              <Button variant="ghost" size="lg" onClick={onNext} type="button">
                Skip this step
              </Button>
            )}
            <Button type="submit" variant="primary" size="lg" className="min-w-[200px]">
              Continue
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectsSetupStep;
