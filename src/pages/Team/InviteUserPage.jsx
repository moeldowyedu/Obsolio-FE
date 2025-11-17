import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Shield,
  Building,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Select from '../../components/common/Input/Select';
import Card from '../../components/common/Card/Card';
import { useUserManagementStore } from '../../store/userManagementStore';

const InviteUserPage = () => {
  const navigate = useNavigate();
  const { roles, invitationForm, updateInvitationForm, sendInvitation } =
    useUserManagementStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Mock data for departments, branches, projects, teams
  const departments = [
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'operations', label: 'Operations' },
    { value: 'customer-service', label: 'Customer Service' },
  ];

  const branches = [
    { value: 'hq', label: 'Headquarters' },
    { value: 'west-coast', label: 'West Coast Office' },
    { value: 'european-hub', label: 'European Hub' },
  ];

  const projects = [
    { value: 'project-1', label: 'Customer Portal Redesign' },
    { value: 'project-2', label: 'HR Automation Initiative' },
    { value: 'project-3', label: 'Financial Reporting Dashboard' },
    { value: 'project-4', label: 'Marketing Campaign Automation' },
  ];

  const teams = [
    { value: 'team-1', label: 'Frontend Development' },
    { value: 'team-2', label: 'Backend Development' },
    { value: 'team-3', label: 'Recruitment Team' },
    { value: 'team-4', label: 'Financial Analysis' },
    { value: 'team-5', label: 'Content Marketing' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!invitationForm.email || !invitationForm.role) {
      setError('Email and role are required');
      return;
    }

    if (invitationForm.accessScope === 'department' && !invitationForm.departmentId) {
      setError('Please select a department for department-scoped access');
      return;
    }

    if (invitationForm.accessScope === 'branch' && !invitationForm.branchId) {
      setError('Please select a branch for branch-scoped access');
      return;
    }

    setIsSubmitting(true);
    try {
      await sendInvitation();
      setSuccess(true);
      setTimeout(() => {
        navigate('/team-users/all');
      }, 2000);
    } catch (err) {
      setError('Failed to send invitation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedRole = roles[invitationForm.role];

  if (success) {
    return (
      <div className="p-6">
        <Card className="max-w-2xl mx-auto">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Invitation Sent!</h2>
            <p className="text-gray-600 mb-6">
              An invitation email has been sent to {invitationForm.email}
            </p>
            <Button variant="primary" onClick={() => navigate('/team-users/all')}>
              Back to Users
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate('/team-users/all')}
        >
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invite User</h1>
          <p className="text-gray-600 mt-1">
            Send an invitation to join your organization
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Basic Information */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="user@company.com"
                value={invitationForm.email}
                onChange={(e) => updateInvitationForm({ email: e.target.value })}
                leftIcon={<Mail className="w-5 h-5" />}
                required
                fullWidth
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personal Message (Optional)
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="3"
                placeholder="Add a personal welcome message..."
                value={invitationForm.message || ''}
                onChange={(e) => updateInvitationForm({ message: e.target.value })}
              />
            </div>
          </div>
        </Card>

        {/* Role & Permissions */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary-500" />
            Role & Permissions
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              <Select
                value={invitationForm.role}
                onChange={(e) => updateInvitationForm({ role: e.target.value })}
                options={[
                  { value: '', label: 'Select a role...' },
                  ...Object.keys(roles).map((key) => ({
                    value: key,
                    label: roles[key].name,
                  })),
                ]}
                required
                fullWidth
              />
              {selectedRole && (
                <p className="mt-2 text-sm text-gray-600">{selectedRole.description}</p>
              )}
            </div>

            {selectedRole && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Default Permissions for {selectedRole.name}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(selectedRole.defaultPermissions).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2 text-sm">
                      <CheckCircle
                        className={`w-4 h-4 ${value ? 'text-green-600' : 'text-gray-300'}`}
                      />
                      <span className={value ? 'text-gray-900' : 'text-gray-400'}>
                        {key
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/^./, (str) => str.toUpperCase())
                          .replace('can ', '')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Scope <span className="text-red-500">*</span>
              </label>
              <Select
                value={invitationForm.accessScope}
                onChange={(e) => updateInvitationForm({ accessScope: e.target.value })}
                options={[
                  { value: 'private', label: 'Private (Own work only)' },
                  { value: 'department', label: 'Department (All department resources)' },
                  { value: 'project', label: 'Project (Specific projects)' },
                  { value: 'branch', label: 'Branch (All branch resources)' },
                  { value: 'organization', label: 'Organization-wide (All resources)' },
                ]}
                required
                fullWidth
              />
            </div>
          </div>
        </Card>

        {/* Organizational Assignment */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Building className="w-5 h-5 text-primary-500" />
            Organizational Assignment
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Branch {invitationForm.accessScope === 'branch' && <span className="text-red-500">*</span>}
              </label>
              <Select
                value={invitationForm.branchId || ''}
                onChange={(e) => updateInvitationForm({ branchId: e.target.value })}
                options={[
                  { value: '', label: 'Select a branch...' },
                  ...branches,
                ]}
                required={invitationForm.accessScope === 'branch'}
                fullWidth
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department {invitationForm.accessScope === 'department' && <span className="text-red-500">*</span>}
              </label>
              <Select
                value={invitationForm.departmentId || ''}
                onChange={(e) => updateInvitationForm({ departmentId: e.target.value })}
                options={[
                  { value: '', label: 'Select a department...' },
                  ...departments,
                ]}
                required={invitationForm.accessScope === 'department'}
                fullWidth
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Projects (Optional)
              </label>
              <Select
                value=""
                onChange={(e) => {
                  const currentProjects = invitationForm.projectIds || [];
                  if (!currentProjects.includes(e.target.value)) {
                    updateInvitationForm({
                      projectIds: [...currentProjects, e.target.value],
                    });
                  }
                }}
                options={[
                  { value: '', label: 'Add project...' },
                  ...projects.filter(
                    (p) => !(invitationForm.projectIds || []).includes(p.value)
                  ),
                ]}
                fullWidth
              />
              {invitationForm.projectIds && invitationForm.projectIds.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {invitationForm.projectIds.map((projectId) => {
                    const project = projects.find((p) => p.value === projectId);
                    return (
                      <span
                        key={projectId}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {project?.label}
                        <button
                          type="button"
                          onClick={() => {
                            updateInvitationForm({
                              projectIds: invitationForm.projectIds.filter(
                                (id) => id !== projectId
                              ),
                            });
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teams (Optional)
              </label>
              <Select
                value=""
                onChange={(e) => {
                  const currentTeams = invitationForm.teamIds || [];
                  if (!currentTeams.includes(e.target.value)) {
                    updateInvitationForm({
                      teamIds: [...currentTeams, e.target.value],
                    });
                  }
                }}
                options={[
                  { value: '', label: 'Add team...' },
                  ...teams.filter((t) => !(invitationForm.teamIds || []).includes(t.value)),
                ]}
                fullWidth
              />
              {invitationForm.teamIds && invitationForm.teamIds.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {invitationForm.teamIds.map((teamId) => {
                    const team = teams.find((t) => t.value === teamId);
                    return (
                      <span
                        key={teamId}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                      >
                        {team?.label}
                        <button
                          type="button"
                          onClick={() => {
                            updateInvitationForm({
                              teamIds: invitationForm.teamIds.filter((id) => id !== teamId),
                            });
                          }}
                          className="text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Submit Buttons */}
        <div className="flex gap-3">
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={isSubmitting}
            leftIcon={<Mail className="w-5 h-5" />}
          >
            Send Invitation
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/team-users/all')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InviteUserPage;
