import { useState } from 'react';
import { MapPin, Plus, Trash2, Edit2, Building2, Check, X } from 'lucide-react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { useRegistrationWizardStore } from '../../../store/registrationWizardStore';

const BranchesSetupStep = ({ onNext, onBack }) => {
  const { organizationData, addBranch, updateBranch, removeBranch } = useRegistrationWizardStore();
  const branches = organizationData.branches;

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    city: '',
    country: '',
    branchCode: '',
    manager: '',
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const validateBranchForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Branch name is required';
    }

    if (!formData.location) {
      newErrors.location = 'Location is required';
    }

    if (!formData.city) {
      newErrors.city = 'City is required';
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddBranch = () => {
    if (validateBranchForm()) {
      addBranch(formData);
      resetForm();
      setIsAdding(false);
    }
  };

  const handleUpdateBranch = () => {
    if (validateBranchForm()) {
      updateBranch(editingId, formData);
      resetForm();
      setEditingId(null);
    }
  };

  const handleEditBranch = (branch) => {
    setFormData({
      name: branch.name,
      location: branch.location,
      city: branch.city,
      country: branch.country,
      branchCode: branch.branchCode || '',
      manager: branch.manager || '',
    });
    setEditingId(branch.id);
    setIsAdding(false);
  };

  const handleRemoveBranch = (id) => {
    removeBranch(id);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      city: '',
      country: '',
      branchCode: '',
      manager: '',
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
        <h2 className="text-3xl font-bold text-secondary-900 mb-2">Branches Setup</h2>
        <p className="text-secondary-600">
          Add multiple branches if your organization operates in different locations.
          <span className="block text-sm text-gray-500 mt-1">This step is optional - skip if you have a single location.</span>
        </p>
      </div>

      {/* Existing Branches List */}
      {branches.length > 0 && (
        <div className="mb-6 space-y-3">
          <h3 className="text-lg font-semibold text-secondary-900 mb-3">Your Branches ({branches.length})</h3>
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-5 h-5 text-primary-600" />
                    <h4 className="font-semibold text-secondary-900">{branch.name}</h4>
                    {branch.branchCode && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                        {branch.branchCode}
                      </span>
                    )}
                  </div>
                  <div className="flex items-start gap-1 text-sm text-secondary-600 mb-1">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{branch.location}, {branch.city}, {branch.country}</span>
                  </div>
                  {branch.manager && (
                    <p className="text-sm text-secondary-600">Manager: {branch.manager}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditBranch(branch)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveBranch(branch.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Branch Form */}
      {(isAdding || editingId) && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            {editingId ? 'Edit Branch' : 'Add New Branch'}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Branch Name"
                type="text"
                placeholder="New York Office"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={errors.name}
                required
                fullWidth
              />

              <Input
                label="Branch Code"
                type="text"
                placeholder="NYC-001"
                value={formData.branchCode}
                onChange={(e) => handleChange('branchCode', e.target.value)}
                helperText="Optional identifier"
                fullWidth
              />
            </div>

            <Input
              label="Address"
              type="text"
              placeholder="123 Main Street, Suite 400"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              leftIcon={<MapPin className="w-5 h-5" />}
              error={errors.location}
              required
              fullWidth
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="City"
                type="text"
                placeholder="New York"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                error={errors.city}
                required
                fullWidth
              />

              <Input
                label="Country"
                type="text"
                placeholder="United States"
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                error={errors.country}
                required
                fullWidth
              />
            </div>

            <Input
              label="Branch Manager"
              type="text"
              placeholder="John Doe"
              value={formData.manager}
              onChange={(e) => handleChange('manager', e.target.value)}
              helperText="Optional"
              fullWidth
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="primary"
                onClick={editingId ? handleUpdateBranch : handleAddBranch}
                leftIcon={<Check className="w-4 h-4" />}
              >
                {editingId ? 'Update Branch' : 'Add Branch'}
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

      {/* Add Branch Button */}
      {!isAdding && !editingId && (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-secondary-600 hover:border-primary-600 hover:text-primary-600 transition-colors flex items-center justify-center gap-2 mb-6"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Branch</span>
        </button>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 mb-6">
        <div className="flex-shrink-0">
          <MapPin className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h4 className="font-medium text-blue-900 mb-1">Multi-location Organizations</h4>
          <p className="text-sm text-blue-700">
            If your organization operates from multiple locations, add them here. Each branch can
            have its own departments, teams, and managers. You can skip this step if you operate
            from a single location.
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
            {branches.length === 0 && (
              <Button
                variant="ghost"
                size="lg"
                onClick={onNext}
                type="button"
              >
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

export default BranchesSetupStep;
