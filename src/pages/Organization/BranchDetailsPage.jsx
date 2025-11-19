import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  MapPin,
  Building2,
  Users,
  Bot,
  Calendar,
  TrendingUp,
  Phone,
  Mail,
} from 'lucide-react';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';

const BranchDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - would come from API
  const [branch] = useState({
    id: 1,
    name: 'Headquarters',
    location: 'New York, NY',
    address: '123 Main Street, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'hq@company.com',
    manager: 'John Smith',
    managerEmail: 'john.smith@company.com',
    managerPhone: '+1 (555) 987-6543',
    employees: 245,
    agents: 18,
    status: 'active',
    establishedDate: '2020-01-15',
    departments: [
      { id: 1, name: 'Human Resources', employees: 15, agents: 3 },
      { id: 2, name: 'Finance', employees: 20, agents: 5 },
      { id: 3, name: 'Engineering', employees: 50, agents: 8 },
      { id: 4, name: 'Marketing', employees: 18, agents: 4 },
      { id: 5, name: 'Operations', employees: 25, agents: 2 },
    ],
    projects: [
      { id: 1, name: 'Customer Portal Redesign', status: 'in_progress', progress: 65 },
      { id: 2, name: 'HR Automation Initiative', status: 'in_progress', progress: 45 },
      { id: 4, name: 'Marketing Campaign Automation', status: 'completed', progress: 100 },
    ],
    recentActivity: [
      { id: 1, action: 'New employee joined Engineering', timestamp: '2 hours ago' },
      { id: 2, action: 'Project milestone completed', timestamp: '5 hours ago' },
      { id: 3, action: 'New AI agent deployed', timestamp: '1 day ago' },
    ],
  });

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-700 border-green-300',
      inactive: 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return colors[status] || colors.active;
  };

  const getProjectStatusColor = (status) => {
    const colors = {
      in_progress: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      planning: 'bg-yellow-100 text-yellow-700',
    };
    return colors[status] || colors.planning;
  };

  return (
    <MainLayout>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate('/organization/branches')}
          >
            Back
          </Button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-secondary-900">{branch.name}</h1>
              <Badge className={getStatusColor(branch.status)}>
                {branch.status.toUpperCase()}
              </Badge>
            </div>
            <p className="text-secondary-600 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {branch.address}
            </p>
          </div>
        </div>
        <Button variant="primary" leftIcon={<Edit className="w-5 h-5" />}>
          Edit Branch
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-900">{branch.departments.length}</div>
              <div className="text-sm text-blue-700">Departments</div>
            </div>
            <Building2 className="w-10 h-10 text-blue-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-900">{branch.employees}</div>
              <div className="text-sm text-green-700">Employees</div>
            </div>
            <Users className="w-10 h-10 text-green-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-900">{branch.agents}</div>
              <div className="text-sm text-purple-700">AI Agents</div>
            </div>
            <Bot className="w-10 h-10 text-purple-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-900">{branch.projects.length}</div>
              <div className="text-sm text-orange-700">Active Projects</div>
            </div>
            <TrendingUp className="w-10 h-10 text-orange-500" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Branch Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card>
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Contact Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Phone</p>
                <p className="font-medium text-secondary-900 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {branch.phone}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="font-medium text-secondary-900 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {branch.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Established</p>
                <p className="font-medium text-secondary-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(branch.establishedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>

          {/* Manager Information */}
          <Card>
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Branch Manager</h2>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                {branch.manager.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-secondary-900 text-lg">{branch.manager}</h3>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-secondary-600 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {branch.managerEmail}
                  </p>
                  <p className="text-sm text-secondary-600 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {branch.managerPhone}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Departments */}
          <Card>
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Departments</h2>
            <div className="space-y-3">
              {branch.departments.map((dept) => (
                <div
                  key={dept.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => navigate(`/organization/departments/${dept.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-secondary-900">{dept.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-secondary-600">
                    <span>{dept.employees} employees</span>
                    <span>{dept.agents} agents</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Active Projects */}
          <Card>
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Active Projects</h2>
            <div className="space-y-4">
              {branch.projects.map((project) => (
                <div key={project.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-secondary-900">{project.name}</h3>
                    <Badge className={getProjectStatusColor(project.status)}>
                      {project.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-secondary-900">{project.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card>
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {branch.recentActivity.map((activity) => (
                <div key={activity.id} className="pb-3 border-b border-gray-200 last:border-0">
                  <p className="text-sm text-secondary-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Add Department
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Add Project
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View All Employees
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View All Agents
              </Button>
            </div>
          </Card>
        </div>
      </div>
      </div>
    </MainLayout>
  );
};

export default BranchDetailsPage;
