import { useState } from 'react';
import {
  Plus,
  Building2,
  MapPin,
  Users,
  Edit,
  Trash2,
  Search,
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import FormModal from '../../components/common/FormModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const BranchesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [branches, setBranches] = useState([
    {
      id: 1,
      name: 'Headquarters',
      location: 'New York, NY',
      address: '123 Main Street, New York, NY 10001',
      departments: 8,
      employees: 245,
      status: 'active',
      manager: 'John Smith',
      established: '2020-01-15',
    },
    {
      id: 2,
      name: 'West Coast Office',
      location: 'San Francisco, CA',
      address: '456 Market Street, San Francisco, CA 94102',
      departments: 5,
      employees: 150,
      status: 'active',
      manager: 'Sarah Johnson',
      established: '2021-03-20',
    },
    {
      id: 3,
      name: 'European Hub',
      location: 'London, UK',
      address: '789 Oxford Street, London, W1D 2HG',
      departments: 6,
      employees: 180,
      status: 'active',
      manager: 'James Wilson',
      established: '2021-06-10',
    },
  ]);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [editingBranch, setEditingBranch] = useState(null);
  const [deletingBranch, setDeletingBranch] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    manager: '',
    status: 'active',
  });

  // CREATE: Open create modal
  const handleCreateBranch = () => {
    setFormData({
      name: '',
      location: '',
      manager: '',
      status: 'active',
    });
    setIsCreateModalOpen(true);
  };

  // CREATE: Submit new branch
  const handleSubmitNewBranch = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.location || !formData.manager) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newBranch = {
        id: Math.max(...branches.map(b => b.id), 0) + 1,
        name: formData.name,
        location: formData.location,
        address: formData.location, // In real app, this would be a separate field
        manager: formData.manager,
        employees: 0,
        status: formData.status,
        departments: 0,
        established: new Date().toISOString().split('T')[0],
      };

      setBranches([...branches, newBranch]);
      setIsCreateModalOpen(false);
      setFormData({
        name: '',
        location: '',
        manager: '',
        status: 'active',
      });
      setIsLoading(false);
    }, 500);
  };

  // EDIT: Open edit modal
  const handleEditBranch = (branch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      location: branch.location,
      manager: branch.manager,
      status: branch.status,
    });
    setIsEditModalOpen(true);
  };

  // EDIT: Update branch
  const handleUpdateBranch = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.location || !formData.manager) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setBranches(branches.map(branch =>
        branch.id === editingBranch.id
          ? {
            ...branch,
            name: formData.name,
            location: formData.location,
            address: formData.location, // In real app, this would be a separate field
            manager: formData.manager,
            status: formData.status,
          }
          : branch
      ));
      setIsEditModalOpen(false);
      setEditingBranch(null);
      setFormData({
        name: '',
        location: '',
        manager: '',
        status: 'active',
      });
      setIsLoading(false);
    }, 500);
  };

  // DELETE: Open delete confirmation
  const handleDeleteBranch = (branch) => {
    setDeletingBranch(branch);
    setIsDeleteModalOpen(true);
  };

  // DELETE: Confirm delete
  const handleConfirmDelete = async () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setBranches(branches.filter(branch => branch.id !== deletingBranch.id));
      setIsDeleteModalOpen(false);
      setDeletingBranch(null);
      setIsLoading(false);
    }, 500);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Branches</h1>
            <p className="text-secondary-600 mt-1">
              Manage your organization's branch locations
            </p>
          </div>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-5 h-5" />}
            onClick={handleCreateBranch}
            disabled={isLoading}
          >
            Add Branch
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-900">{branches.length}</div>
                <div className="text-sm text-blue-700">Total Branches</div>
              </div>
              <Building2 className="w-10 h-10 text-blue-500" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-900">
                  {branches.reduce((sum, b) => sum + b.employees, 0)}
                </div>
                <div className="text-sm text-green-700">Total Employees</div>
              </div>
              <Users className="w-10 h-10 text-green-500" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-900">
                  {branches.reduce((sum, b) => sum + b.departments, 0)}
                </div>
                <div className="text-sm text-purple-700">Total Departments</div>
              </div>
              <Building2 className="w-10 h-10 text-purple-500" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-900">
                  {branches.filter((b) => b.status === 'active').length}
                </div>
                <div className="text-sm text-orange-700">Active Branches</div>
              </div>
              <MapPin className="w-10 h-10 text-orange-500" />
            </div>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <Input
            placeholder="Search branches by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-5 h-5" />}
            fullWidth
          />
        </Card>

        {/* Branches List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.map((branch) => (
            <Card key={branch.id} className="hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900">
                        {branch.name}
                      </h3>
                      <Badge className="bg-green-100 text-green-700 text-xs mt-1">
                        {branch.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Location & Manager */}
                <div className="space-y-2 text-sm text-secondary-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{branch.manager}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Departments</div>
                    <div className="text-lg font-bold text-secondary-900">{branch.departments}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Employees</div>
                    <div className="text-lg font-bold text-secondary-900">{branch.employees}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Edit className="w-4 h-4" />}
                    onClick={() => handleEditBranch(branch)}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Trash2 className="w-4 h-4" />}
                    className="text-red-600 hover:bg-red-50 border-red-200 flex-1"
                    onClick={() => handleDeleteBranch(branch)}
                    disabled={isLoading}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredBranches.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                No Branches Found
              </h3>
              <p className="text-secondary-600">
                {searchTerm ? 'Try adjusting your search' : 'Get started by adding your first branch'}
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Create/Edit Branch Modal */}
      <FormModal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setIsEditModalOpen(false);
          setEditingBranch(null);
          setFormData({
            name: '',
            location: '',
            manager: '',
            status: 'active',
          });
        }}
        onSubmit={isEditModalOpen ? handleUpdateBranch : handleSubmitNewBranch}
        title={editingBranch ? 'Edit Branch' : 'Create Branch'}
        submitText={isLoading ? 'Saving...' : (editingBranch ? 'Update Branch' : 'Create Branch')}
        cancelText="Cancel"
        size="md"
        isLoading={isLoading}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Branch Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter branch name"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter location"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Manager <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="manager"
              value={formData.manager}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter manager name"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled={isLoading}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </FormModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingBranch(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Branch"
        message={
          deletingBranch ? (
            <div>
              <p className="mb-2">
                Are you sure you want to delete <strong>{deletingBranch.name}</strong>?
              </p>
              <p className="text-sm text-red-600">
                Warning: This action cannot be undone. All data associated with this branch will be permanently deleted.
              </p>
            </div>
          ) : null
        }
        confirmText={isLoading ? 'Deleting...' : 'Delete Branch'}
        cancelText="Cancel"
        variant="danger"
        isLoading={isLoading}
      />
    </MainLayout>
  );
};

export default BranchesPage;
