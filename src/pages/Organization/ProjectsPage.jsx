import { useState } from 'react';
import {
  Plus,
  Folder,
  Users,
  Calendar,
  TrendingUp,
  Edit,
  Trash2,
  Search,
  Filter,
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Select from '../../components/common/Input/Select';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [projects] = useState([
    {
      id: 1,
      name: 'Customer Portal Redesign',
      description: 'Modernize the customer-facing portal with new UI/UX',
      status: 'in_progress',
      priority: 'high',
      department: 'Engineering',
      lead: 'Grace Lee',
      members: 12,
      agents: 3,
      startDate: '2025-01-15',
      endDate: '2025-04-30',
      progress: 65,
    },
    {
      id: 2,
      name: 'HR Automation Initiative',
      description: 'Automate recruitment and onboarding processes',
      status: 'in_progress',
      priority: 'high',
      department: 'Human Resources',
      lead: 'Alice Johnson',
      members: 8,
      agents: 5,
      startDate: '2025-02-01',
      endDate: '2025-05-15',
      progress: 45,
    },
    {
      id: 3,
      name: 'Financial Reporting Dashboard',
      description: 'Real-time financial analytics and reporting',
      status: 'planning',
      priority: 'medium',
      department: 'Finance',
      lead: 'David Brown',
      members: 6,
      agents: 2,
      startDate: '2025-03-01',
      endDate: '2025-06-30',
      progress: 15,
    },
    {
      id: 4,
      name: 'Marketing Campaign Automation',
      description: 'AI-powered marketing campaign management',
      status: 'completed',
      priority: 'medium',
      department: 'Marketing',
      lead: 'Jack Taylor',
      members: 10,
      agents: 4,
      startDate: '2024-10-01',
      endDate: '2025-01-15',
      progress: 100,
    },
    {
      id: 5,
      name: 'Data Migration Project',
      description: 'Migrate legacy systems to cloud infrastructure',
      status: 'on_hold',
      priority: 'low',
      department: 'Engineering',
      lead: 'Henry Wilson',
      members: 5,
      agents: 1,
      startDate: '2025-02-15',
      endDate: '2025-08-30',
      progress: 25,
    },
  ]);

  const getStatusColor = (status) => {
    const colors = {
      planning: 'bg-blue-100 text-blue-700 border-blue-300',
      in_progress: 'bg-green-100 text-green-700 border-green-300',
      on_hold: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      completed: 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return colors[status] || colors.planning;
  };

  const getStatusLabel = (status) => {
    const labels = {
      planning: 'Planning',
      in_progress: 'In Progress',
      on_hold: 'On Hold',
      completed: 'Completed',
    };
    return labels[status] || status;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-orange-100 text-orange-700',
      low: 'bg-blue-100 text-blue-700',
    };
    return colors[priority] || colors.medium;
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === 'in_progress').length,
    completed: projects.filter((p) => p.status === 'completed').length,
    onHold: projects.filter((p) => p.status === 'on_hold').length,
  };

  return (
    <MainLayout>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Projects</h1>
          <p className="text-secondary-600 mt-1">
            Manage projects across your organization
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-5 h-5" />}>
          Create Project
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
              <div className="text-sm text-blue-700">Total Projects</div>
            </div>
            <Folder className="w-10 h-10 text-blue-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-900">{stats.inProgress}</div>
              <div className="text-sm text-green-700">In Progress</div>
            </div>
            <TrendingUp className="w-10 h-10 text-green-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-900">{stats.completed}</div>
              <div className="text-sm text-purple-700">Completed</div>
            </div>
            <TrendingUp className="w-10 h-10 text-purple-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-900">{stats.onHold}</div>
              <div className="text-sm text-yellow-700">On Hold</div>
            </div>
            <TrendingUp className="w-10 h-10 text-yellow-500" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search projects by name, description, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
              fullWidth
            />
          </div>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'planning', label: 'Planning' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'on_hold', label: 'On Hold' },
              { value: 'completed', label: 'Completed' },
            ]}
            className="min-w-[180px]"
          />
        </div>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Folder className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                      {project.name}
                    </h3>
                    <p className="text-sm text-secondary-600">{project.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>

              {/* Status and Priority */}
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(project.status)}>
                  {getStatusLabel(project.status)}
                </Badge>
                <Badge className={getPriorityColor(project.priority)}>
                  {project.priority.toUpperCase()}
                </Badge>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-secondary-600">Progress</span>
                  <span className="font-semibold text-secondary-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Department</p>
                  <p className="text-sm font-medium text-secondary-900">{project.department}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Project Lead</p>
                  <p className="text-sm font-medium text-secondary-900">{project.lead}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Team Size</p>
                  <p className="text-sm font-medium text-secondary-900">
                    {project.members} members • {project.agents} AI agents
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Timeline</p>
                  <p className="text-sm font-medium text-secondary-900">
                    {new Date(project.startDate).toLocaleDateString()} -{' '}
                    {new Date(project.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              No Projects Found
            </h3>
            <p className="text-secondary-600">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Get started by creating your first project'}
            </p>
          </div>
        </Card>
      )}
      </div>
    </MainLayout>
  );
};

export default ProjectsPage;
