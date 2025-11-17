import { useState } from 'react';
import { Briefcase, Building2, MapPin, FolderKanban, User, Clock } from 'lucide-react';
import Input from '../common/Input/Input';
import Select from '../common/Input/Select';
import Textarea from '../common/Input/Textarea';
import Button from '../common/Button/Button';
import { useAgentDeploymentStore } from '../../store/agentDeploymentStore';

const DefineJobDetailsStep = ({ onNext, onBack }) => {
  const { jobDetails, updateJobDetails } = useAgentDeploymentStore();
  const [errors, setErrors] = useState({});

  // Mock data - would come from organization/tenant store
  const branches = [
    { id: 1, name: 'New York HQ' },
    { id: 2, name: 'London Office' },
    { id: 3, name: 'Singapore Branch' },
  ];

  const departments = [
    { id: 1, name: 'Legal', branchId: 1 },
    { id: 2, name: 'HR', branchId: 1 },
    { id: 3, name: 'Finance', branchId: 2 },
    { id: 4, name: 'Operations', branchId: 3 },
  ];

  const projects = [
    { id: 1, name: 'Client XYZ Litigation', departmentId: 1 },
    { id: 2, name: 'Internal Compliance Audit', departmentId: 1 },
    { id: 3, name: 'Q4 Recruitment Drive', departmentId: 2 },
  ];

  const managers = [
    { id: 1, name: 'John Smith', department: 'Legal' },
    { id: 2, name: 'Jane Doe', department: 'HR' },
    { id: 3, name: 'Bob Johnson', department: 'Finance' },
  ];

  const employmentTypes = [
    { value: 'full-time', label: 'Full-Time (Regular Schedule)' },
    { value: 'part-time', label: 'Part-Time (Limited Frequency)' },
    { value: 'on-demand', label: 'On-Demand (Manual Trigger Only)' },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!jobDetails.jobTitle) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (!jobDetails.jobDescription) {
      newErrors.jobDescription = 'Job description is required';
    }

    if (!jobDetails.departmentId) {
      newErrors.departmentId = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleChange = (field, value) => {
    updateJobDetails({ [field]: value });
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Filter departments based on selected branch
  const filteredDepartments = jobDetails.branchId
    ? departments.filter((d) => d.branchId === parseInt(jobDetails.branchId))
    : departments;

  // Filter projects based on selected department
  const filteredProjects = jobDetails.departmentId
    ? projects.filter((p) => p.departmentId === parseInt(jobDetails.departmentId))
    : projects;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Define Job Details</h2>
        <p className="text-gray-600">
          Set up how this agent will function as a virtual employee in your organization
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Title */}
        <Input
          label="Job Title"
          type="text"
          placeholder="e.g., Document Processor, Invoice Analyzer"
          value={jobDetails.jobTitle}
          onChange={(e) => handleChange('jobTitle', e.target.value)}
          leftIcon={<Briefcase className="w-5 h-5" />}
          error={errors.jobTitle}
          helperText="What role does this agent perform?"
          required
          fullWidth
        />

        {/* Job Description */}
        <Textarea
          label="Job Description"
          placeholder="Describe what this agent does, its responsibilities, and expected outcomes..."
          value={jobDetails.jobDescription}
          onChange={(e) => handleChange('jobDescription', e.target.value)}
          rows={4}
          error={errors.jobDescription}
          helperText="Detailed description of the agent's duties and responsibilities"
          required
          fullWidth
        />

        {/* Assignment Section */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary-500" />
            Organizational Assignment
          </h3>

          <div className="space-y-4">
            {/* Branch */}
            <Select
              label="Branch"
              value={jobDetails.branchId || ''}
              onChange={(e) => handleChange('branchId', e.target.value)}
              options={[
                { value: '', label: 'Select a branch' },
                ...branches.map((b) => ({ value: b.id, label: b.name })),
              ]}
              helperText="Optional - assign to a specific branch"
              fullWidth
            />

            {/* Department */}
            <Select
              label="Department"
              value={jobDetails.departmentId || ''}
              onChange={(e) => handleChange('departmentId', e.target.value)}
              options={[
                { value: '', label: 'Select a department' },
                ...filteredDepartments.map((d) => ({ value: d.id, label: d.name })),
              ]}
              error={errors.departmentId}
              required
              fullWidth
            />

            {/* Project */}
            <Select
              label="Project"
              value={jobDetails.projectId || ''}
              onChange={(e) => handleChange('projectId', e.target.value)}
              options={[
                { value: '', label: 'No specific project' },
                ...filteredProjects.map((p) => ({ value: p.id, label: p.name })),
              ]}
              helperText="Optional - assign to a specific project"
              fullWidth
            />
          </div>
        </div>

        {/* Management Section */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary-500" />
            Management & Supervision
          </h3>

          <div className="space-y-4">
            {/* Reporting Manager */}
            <Select
              label="Reporting Manager"
              value={jobDetails.reportingManagerId || ''}
              onChange={(e) => handleChange('reportingManagerId', e.target.value)}
              options={[
                { value: '', label: 'No direct manager' },
                ...managers.map((m) => ({ value: m.id, label: `${m.name} (${m.department})` })),
              ]}
              helperText="Who oversees this agent's work?"
              fullWidth
            />

            {/* Employment Type */}
            <Select
              label="Employment Type"
              value={jobDetails.employmentType}
              onChange={(e) => handleChange('employmentType', e.target.value)}
              options={employmentTypes}
              helperText="Determines how the agent operates"
              required
              fullWidth
            />
          </div>
        </div>

        {/* Employment Type Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <div className="flex-shrink-0">
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Employment Type</h4>
            <p className="text-sm text-blue-700">
              {jobDetails.employmentType === 'full-time' && (
                'Full-Time agents run on regular schedules (daily, weekly, etc.) like a full-time employee.'
              )}
              {jobDetails.employmentType === 'part-time' && (
                'Part-Time agents run less frequently or during specific time windows.'
              )}
              {jobDetails.employmentType === 'on-demand' && (
                'On-Demand agents only run when manually triggered by authorized users.'
              )}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 pt-4">
          <Button variant="outline" size="lg" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" variant="primary" size="lg" className="min-w-[200px]">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DefineJobDetailsStep;
