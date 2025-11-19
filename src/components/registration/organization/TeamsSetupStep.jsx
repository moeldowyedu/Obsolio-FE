import { useState } from 'react';
import { Users, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import Input from '../../common/Input/Input';
import Textarea from '../../common/Input/Textarea';
import Button from '../../common/Button/Button';
import { useRegistrationWizardStore } from '../../../store/registrationWizardStore';

const TeamsSetupStep = ({ onNext, onBack }) => {
  const { organizationData, addTeam, updateTeam, removeTeam } = useRegistrationWizardStore();

  const teams = organizationData.teams;

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    lead: '',
    purpose: '',
    members: '',
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const validateTeamForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Team name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTeam = () => {
    if (validateTeamForm()) {
      addTeam(formData);
      resetForm();
      setIsAdding(false);
    }
  };

  const handleUpdateTeam = () => {
    if (validateTeamForm()) {
      updateTeam(editingId, formData);
      resetForm();
      setEditingId(null);
    }
  };

  const handleEditTeam = (team) => {
    setFormData({
      name: team.name,
      lead: team.lead || '',
      purpose: team.purpose || '',
      members: team.members || '',
    });
    setEditingId(team.id);
    setIsAdding(false);
  };

  const handleRemoveTeam = (id) => {
    removeTeam(id);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      lead: '',
      purpose: '',
      members: '',
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
        <h2 className="text-3xl font-bold text-secondary-900 mb-2">Teams Setup</h2>
        <p className="text-secondary-600">
          Create cross-functional teams that bring together members from different departments.
          <span className="block text-sm text-gray-500 mt-1">
            This step is optional - skip if you don't use team-based collaboration
          </span>
        </p>
      </div>

      {/* Existing Teams List */}
      {teams.length > 0 && (
        <div className="mb-6 space-y-3">
          <h3 className="text-lg font-semibold text-secondary-900 mb-3">Your Teams ({teams.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {teams.map((team) => (
              <div
                key={team.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900">{team.name}</h4>
                      {team.lead && (
                        <p className="text-xs text-secondary-600">Lead: {team.lead}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => handleEditTeam(team)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveTeam(team.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {team.purpose && (
                  <p className="text-sm text-secondary-600 mb-2">{team.purpose}</p>
                )}
                {team.members && (
                  <div className="flex flex-wrap gap-1">
                    {team.members.split(',').map((member, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-gray-100 text-secondary-700 text-xs rounded"
                      >
                        {member.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Team Form */}
      {(isAdding || editingId) && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            {editingId ? 'Edit Team' : 'Add New Team'}
          </h3>
          <div className="space-y-4">
            <Input
              label="Team Name"
              type="text"
              placeholder="Product Launch Team"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={errors.name}
              required
              fullWidth
            />

            <Input
              label="Team Lead"
              type="text"
              placeholder="Jane Smith"
              value={formData.lead}
              onChange={(e) => handleChange('lead', e.target.value)}
              helperText="Optional - who leads this team"
              fullWidth
            />

            <Textarea
              label="Purpose"
              placeholder="Describe the team's purpose and objectives..."
              value={formData.purpose}
              onChange={(e) => handleChange('purpose', e.target.value)}
              rows={3}
              helperText="Optional - what does this team do?"
              fullWidth
            />

            <Textarea
              label="Team Members"
              placeholder="Enter member names separated by commas (e.g., John Doe, Jane Smith, Bob Johnson)"
              value={formData.members}
              onChange={(e) => handleChange('members', e.target.value)}
              rows={3}
              helperText="Optional - you can add members later"
              fullWidth
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="primary"
                onClick={editingId ? handleUpdateTeam : handleAddTeam}
                leftIcon={<Check className="w-4 h-4" />}
              >
                {editingId ? 'Update Team' : 'Add Team'}
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

      {/* Add Team Button */}
      {!isAdding && !editingId && (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-secondary-600 hover:border-primary-600 hover:text-primary-600 transition-colors flex items-center justify-center gap-2 mb-6"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Team</span>
        </button>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 mb-6">
        <div className="flex-shrink-0">
          <Users className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h4 className="font-medium text-blue-900 mb-1">Cross-Functional Teams</h4>
          <p className="text-sm text-blue-700">
            Teams are groups of people from different departments working together on shared goals.
            Unlike departments which are permanent organizational units, teams are often temporary
            and project-focused. This is optional and can be configured later if needed.
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
            {teams.length === 0 && (
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

export default TeamsSetupStep;
