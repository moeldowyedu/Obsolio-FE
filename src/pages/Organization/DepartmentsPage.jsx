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
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';

const DepartmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDepts, setExpandedDepts] = useState({});

  const [departments] = useState([
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

  const renderDepartment = (dept, level = 0) => {
    const isExpanded = expandedDepts[dept.id];
    const hasChildren = dept.children && dept.children.length > 0;

    return (
      <div key={dept.id}>
        <Card
          className={`hover:shadow-md transition-shadow ${level > 0 ? 'ml-8' : ''}`}
          style={{ marginLeft: level > 0 ? `${level * 2}rem` : '0' }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              {hasChildren && (
                <button
                  onClick={() => toggleDepartment(dept.id)}
                  className="mt-1 text-gray-400 hover:text-secondary-600"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>
              )}
              {!hasChildren && <div className="w-5" />}

              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building className="w-6 h-6 text-primary-600" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                  {dept.name}
                </h3>
                <p className="text-sm text-secondary-600 mb-2">{dept.description}</p>
                <p className="text-sm text-secondary-600 mb-3">
                  <Users className="w-4 h-4 inline mr-1" />
                  Manager: {dept.manager}
                </p>
                <div className="flex gap-6">
                  <div>
                    <span className="text-xs text-gray-500">Employees</span>
                    <p className="font-semibold text-secondary-900">{dept.employees}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">AI Agents</span>
                    <p className="font-semibold text-secondary-900">{dept.agents}</p>
                  </div>
                  {hasChildren && (
                    <div>
                      <span className="text-xs text-gray-500">Sub-departments</span>
                      <p className="font-semibold text-secondary-900">{dept.children.length}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" leftIcon={<Edit className="w-4 h-4" />}>
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Trash2 className="w-4 h-4" />}
                className="text-red-600 hover:bg-red-50 border-red-200"
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>

        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-2">
            {dept.children.map((child) => renderDepartment(child, level + 1))}
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
        <Button variant="primary" leftIcon={<Plus className="w-5 h-5" />}>
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

      {/* Departments Tree */}
      <div className="space-y-4">
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
      </div>
    </MainLayout>
  );
};

export default DepartmentsPage;
