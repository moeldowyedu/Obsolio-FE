import { useState } from 'react';
import {
  Plus,
  Building,
  Users,
  Edit,
  Trash2,
  Search,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import FormModal from '../../components/common/FormModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const DepartmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDepts, setExpandedDepts] = useState({});

  // CRUD States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [parentDepartment, setParentDepartment] = useState(null);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editingParentId, setEditingParentId] = useState(null);
  const [deletingDepartment, setDeletingDepartment] = useState(null);
  const [deletingParentId, setDeletingParentId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    head: '',
    description: '',
  });

  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: 'Human Resources',
      description: 'Employee management and benefits',
      manager: 'Alice Johnson',
      employees: 15,
      agents: 3,
      children: [
        {
          id: 11,
          name: 'Recruitment',
          description: 'Talent acquisition and hiring',
          manager: 'Bob Smith',
          employees: 8,
          agents: 2,
        },
        {
          id: 12,
          name: 'Employee Relations',
          description: 'Employee support and engagement',
          manager: 'Carol White',
          employees: 7,
          agents: 1,
        },
      ],
    },
    {
      id: 2,
      name: 'Finance',
      description: 'Financial planning and accounting',
      manager: 'David Brown',
      employees: 20,
      agents: 5,
      children: [
        {
          id: 21,
          name: 'Accounting',
          description: 'Financial record keeping',
          manager: 'Emma Davis',
          employees: 10,
          agents: 3,
        },
        {
          id: 22,
          name: 'Payroll',
          description: 'Employee compensation processing',
          manager: 'Frank Miller',
          employees: 10,
          agents: 2,
        },
      ],
    },
    {
      id: 3,
      name: 'Engineering',
      description: 'Product development and infrastructure',
      manager: 'Grace Lee',
      employees: 50,
      agents: 8,
      children: [
        {
          id: 31,
          name: 'Backend Development',
          description: 'Server-side development',
          manager: 'Henry Wilson',
          employees: 25,
          agents: 4,
        },
        {
          id: 32,
          name: 'Frontend Development',
          description: 'Client-side development',
          manager: 'Ivy Chen',
          employees: 25,
          agents: 4,
        },
      ],
    },
    {
      id: 4,
      name: 'Marketing',
      description: 'Brand and product marketing',
      manager: 'Jack Taylor',
      employees: 18,
      agents: 4,
    },
  ]);

  const toggleDepartment = (deptId) => {
    setExpandedDepts((prev) => ({
      ...prev,
      [deptId]: !prev[deptId],
    }));
  };

  const matchesSearch = (dept) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      dept.name.toLowerCase().includes(searchLower) ||
      dept.description.toLowerCase().includes(searchLower) ||
      dept.manager.toLowerCase().includes(searchLower)
    );
  };

  const filteredDepartments = departments.filter((dept) => {
    if (matchesSearch(dept)) return true;
    if (dept.children) {
      return dept.children.some((child) => matchesSearch(child));
    }
    return false;
  });

  const getTotalCounts = () => {
    let totalEmployees = 0;
    let totalAgents = 0;
    let totalDepts = 0;

    departments.forEach((dept) => {
      totalDepts++;
      totalEmployees += dept.employees;
      totalAgents += dept.agents;
      if (dept.children) {
        totalDepts += dept.children.length;
        dept.children.forEach((child) => {
          totalEmployees += child.employees;
          totalAgents += child.agents;
        });
      }
    });

    return { totalEmployees, totalAgents, totalDepts };
  };

  const stats = getTotalCounts();

  // CRUD Handlers
  const handleCreateDepartment = (parentId = null) => {
    setFormData({ name: '', head: '', description: '' });
    setParentDepartment(parentId);
    setEditingDepartment(null);
    setIsCreateModalOpen(true);
  };

  const handleSubmitNewDepartment = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.head.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const newDepartment = {
      id: Date.now(), // Simple ID generation
      name: formData.name,
      description: formData.description,
      manager: formData.head,
      employees: 0,
      agents: 0,
      ...(parentDepartment ? {} : { children: [] }),
    };

    if (parentDepartment) {
      // Creating sub-department
      setDepartments((prev) =>
        prev.map((dept) => {
          if (dept.id === parentDepartment.id) {
            return {
              ...dept,
              children: [...(dept.children || []), newDepartment],
            };
          }
          return dept;
        })
      );
    } else {
      // Creating main department
      setDepartments((prev) => [...prev, newDepartment]);
    }

    setIsCreateModalOpen(false);
    setParentDepartment(null);
    setFormData({ name: '', head: '', description: '' });
  };

  const handleEditDepartment = (dept, parentId = null) => {
    setEditingDepartment(dept);
    setEditingParentId(parentId);
    setFormData({
      name: dept.name,
      head: dept.manager,
      description: dept.description,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateDepartment = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.head.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedData = {
      ...editingDepartment,
      name: formData.name,
      manager: formData.head,
      description: formData.description,
    };

    if (editingParentId) {
      // Updating sub-department
      setDepartments((prev) =>
        prev.map((dept) => {
          if (dept.id === editingParentId) {
            return {
              ...dept,
              children: dept.children.map((child) =>
                child.id === editingDepartment.id ? updatedData : child
              ),
            };
          }
          return dept;
        })
      );
    } else {
      // Updating main department
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === editingDepartment.id ? updatedData : dept
        )
      );
    }

    setIsEditModalOpen(false);
    setEditingDepartment(null);
    setEditingParentId(null);
    setFormData({ name: '', head: '', description: '' });
  };

  const handleDeleteDepartment = (dept, parentId = null) => {
    setDeletingDepartment(dept);
    setDeletingParentId(parentId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingParentId) {
      // Deleting sub-department
      setDepartments((prev) =>
        prev.map((dept) => {
          if (dept.id === deletingParentId) {
            return {
              ...dept,
              children: dept.children.filter(
                (child) => child.id !== deletingDepartment.id
              ),
            };
          }
          return dept;
        })
      );
    } else {
      // Deleting main department
      setDepartments((prev) =>
        prev.filter((dept) => dept.id !== deletingDepartment.id)
      );
    }

    setIsDeleteModalOpen(false);
    setDeletingDepartment(null);
    setDeletingParentId(null);
  };

  const renderDepartment = (dept, level = 0, parentId = null) => {
    const isExpanded = expandedDepts[dept.id];
    const hasChildren = dept.children && dept.children.length > 0;

    return (
      <div key={dept.id}>
        <Card className="hover:shadow-lg transition-shadow">
          <div className="space-y-4">
            {/* Header with Expand Button */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-secondary-900 truncate">
                    {dept.name}
                  </h3>
                  <p className="text-sm text-secondary-600 line-clamp-1">{dept.description}</p>
                </div>
              </div>
              {hasChildren && (
                <button
                  onClick={() => toggleDepartment(dept.id)}
                  className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors flex-shrink-0"
                  title={isExpanded ? "Collapse sub-departments" : "Expand sub-departments"}
                >
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>

            {/* Manager */}
            <div className="flex items-center gap-2 text-sm text-secondary-600">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{dept.manager}</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-200">
              <div>
                <div className="text-xs text-gray-500 mb-1">Employees</div>
                <div className="text-lg font-bold text-secondary-900">{dept.employees}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">AI Agents</div>
                <div className="text-lg font-bold text-secondary-900">{dept.agents}</div>
              </div>
              {hasChildren && (
                <div>
                  <div className="text-xs text-gray-500 mb-1">Sub-Depts</div>
                  <div className="text-lg font-bold text-secondary-900">{dept.children.length}</div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-3 border-t border-gray-200">
              {level === 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Plus className="w-4 h-4" />}
                  onClick={() => handleCreateDepartment(dept)}
                  className="flex-1"
                >
                  Add Sub
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Edit className="w-4 h-4" />}
                onClick={() => handleEditDepartment(dept, parentId)}
                className="flex-1"
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Trash2 className="w-4 h-4" />}
                className="text-red-600 hover:bg-red-50 border-red-200 flex-1"
                onClick={() => handleDeleteDepartment(dept, parentId)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>

        {/* Sub-departments */}
        {hasChildren && isExpanded && (
          <div className="mt-4 ml-6 pl-4 border-l-2 border-primary-200 space-y-4">
            {dept.children.map((child) => renderDepartment(child, level + 1, dept.id))}
          </div>
        )}
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Departments</h1>
            <p className="text-secondary-600 mt-1">
              Manage your organization's department structure
            </p>
          </div>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-5 h-5" />}
            onClick={() => handleCreateDepartment(null)}
          >
            Add Department
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-900">{stats.totalDepts}</div>
                <div className="text-sm text-blue-700">Total Departments</div>
              </div>
              <Building className="w-10 h-10 text-blue-500" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-900">{stats.totalEmployees}</div>
                <div className="text-sm text-green-700">Total Employees</div>
              </div>
              <Users className="w-10 h-10 text-green-500" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-900">{stats.totalAgents}</div>
                <div className="text-sm text-purple-700">AI Agents</div>
              </div>
              <Building className="w-10 h-10 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <Input
            placeholder="Search departments by name, description, or manager..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-5 h-5" />}
            fullWidth
          />
        </Card>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((dept) => renderDepartment(dept))}
        </div>

        {filteredDepartments.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                No Departments Found
              </h3>
              <p className="text-secondary-600">
                {searchTerm
                  ? 'Try adjusting your search'
                  : 'Get started by adding your first department'}
              </p>
            </div>
          </Card>
        )}

        {/* Create/Edit Department Modal */}
        <FormModal
          isOpen={isCreateModalOpen || isEditModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            setIsEditModalOpen(false);
            setEditingDepartment(null);
            setParentDepartment(null);
            setFormData({ name: '', head: '', description: '' });
          }}
          onSubmit={editingDepartment ? handleUpdateDepartment : handleSubmitNewDepartment}
          title={
            editingDepartment
              ? 'Edit Department'
              : parentDepartment
                ? 'Create Sub-Department'
                : 'Create Department'
          }
          submitText={editingDepartment ? 'Update' : 'Create'}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-secondary-900 mb-2">
                Department Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Human Resources"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary-900 mb-2">
                Head/Manager <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.head}
                onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                placeholder="e.g., John Doe"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary-900 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of this department's responsibilities"
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
            </div>

            {parentDepartment && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">
                      Creating Sub-Department
                    </p>
                    <p className="text-sm text-blue-700">
                      This will be created under:{' '}
                      <strong>{parentDepartment.name}</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </FormModal>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingDepartment(null);
            setDeletingParentId(null);
          }}
          onConfirm={handleConfirmDelete}
          title="Delete Department"
          message={
            deletingDepartment && deletingDepartment.children && deletingDepartment.children.length > 0 ? (
              <div className="space-y-3">
                <p>
                  Are you sure you want to delete{' '}
                  <strong>{deletingDepartment?.name}</strong>?
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-yellow-900 mb-1">
                        Warning: Has Sub-Departments
                      </p>
                      <p className="text-sm text-yellow-700">
                        This department has {deletingDepartment.children.length}{' '}
                        sub-department(s). Deleting it will remove all sub-departments as well.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              `Are you sure you want to delete ${deletingDepartment?.name}? This action cannot be undone.`
            )
          }
          confirmText="Delete"
          confirmVariant="danger"
        />
      </div>
    </MainLayout>
  );
};

export default DepartmentsPage;
