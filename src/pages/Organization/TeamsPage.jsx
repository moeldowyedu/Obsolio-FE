import { useState } from 'react';
import {
  Plus,
  Users,
  User,
  Edit,
  Trash2,
  Search,
  Mail,
  Building,
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Select from '../../components/common/Input/Select';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';

const TeamsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const [teams] = useState([
    {
      id: 1,
      name: 'Frontend Development',
      description: 'User interface development team',
      department: 'Engineering',
      lead: 'Ivy Chen',
      leadEmail: 'ivy.chen@company.com',
      members: 8,
      agents: 2,
      projects: ['Customer Portal Redesign'],
      memberList: [
        'Ivy Chen',
        'Tom Harris',
        'Sarah Kim',
        'Mike Johnson',
        'Lisa Wang',
        'Alex Turner',
        'Emma Brown',
        'Chris Lee',
      ],
    },
    {
      id: 2,
      name: 'Backend Development',
      description: 'Server-side and API development',
      department: 'Engineering',
      lead: 'Henry Wilson',
      leadEmail: 'henry.wilson@company.com',
      members: 12,
      agents: 3,
      projects: ['Customer Portal Redesign', 'Data Migration Project'],
      memberList: [
        'Henry Wilson',
        'Maria Garcia',
        'John Smith',
        'David Lee',
        'Anna Johnson',
        'Ryan Clark',
        'Sophie Turner',
        'Mark Davis',
        'Julia White',
        'Kevin Brown',
        'Rachel Green',
        'Peter Parker',
      ],
    },
    {
      id: 3,
      name: 'Recruitment Team',
      description: 'Talent acquisition specialists',
      department: 'Human Resources',
      lead: 'Bob Smith',
      leadEmail: 'bob.smith@company.com',
      members: 5,
      agents: 2,
      projects: ['HR Automation Initiative'],
      memberList: ['Bob Smith', 'Jennifer Lopez', 'Michael Chen', 'Diana Prince', 'Bruce Wayne'],
    },
    {
      id: 4,
      name: 'Financial Analysis',
      description: 'Financial planning and analysis',
      department: 'Finance',
      lead: 'Emma Davis',
      leadEmail: 'emma.davis@company.com',
      members: 6,
      agents: 2,
      projects: ['Financial Reporting Dashboard'],
      memberList: [
        'Emma Davis',
        'Robert Miller',
        'Jessica Taylor',
        'Daniel Moore',
        'Olivia Martinez',
        'William Anderson',
      ],
    },
    {
      id: 5,
      name: 'Content Marketing',
      description: 'Content creation and strategy',
      department: 'Marketing',
      lead: 'Sarah Thompson',
      leadEmail: 'sarah.thompson@company.com',
      members: 7,
      agents: 3,
      projects: ['Marketing Campaign Automation'],
      memberList: [
        'Sarah Thompson',
        'James Wilson',
        'Emily Clark',
        'Andrew Scott',
        'Megan Adams',
        'Ryan Hughes',
        'Laura Bell',
      ],
    },
  ]);

  const departments = ['all', ...new Set(teams.map((t) => t.department))];

  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.lead.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === 'all' || team.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const stats = {
    totalTeams: teams.length,
    totalMembers: teams.reduce((sum, t) => sum + t.members, 0),
    totalAgents: teams.reduce((sum, t) => sum + t.agents, 0),
    avgTeamSize: Math.round(teams.reduce((sum, t) => sum + t.members, 0) / teams.length),
  };

  return (
    <MainLayout>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Teams</h1>
          <p className="text-secondary-600 mt-1">
            Manage teams across your organization
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-5 h-5" />}>
          Create Team
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-900">{stats.totalTeams}</div>
              <div className="text-sm text-blue-700">Total Teams</div>
            </div>
            <Users className="w-10 h-10 text-blue-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-900">{stats.totalMembers}</div>
              <div className="text-sm text-green-700">Total Members</div>
            </div>
            <User className="w-10 h-10 text-green-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-900">{stats.totalAgents}</div>
              <div className="text-sm text-purple-700">AI Agents</div>
            </div>
            <Users className="w-10 h-10 text-purple-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-900">{stats.avgTeamSize}</div>
              <div className="text-sm text-orange-700">Avg Team Size</div>
            </div>
            <Users className="w-10 h-10 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search teams by name, description, or lead..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
              fullWidth
            />
          </div>
          <Select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            options={departments.map((dept) => ({
              value: dept,
              label: dept === 'all' ? 'All Departments' : dept,
            }))}
            className="min-w-[200px]"
          />
        </div>
      </Card>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                      {team.name}
                    </h3>
                    <p className="text-sm text-secondary-600">{team.description}</p>
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

              {/* Department Badge */}
              <div>
                <Badge className="bg-blue-100 text-blue-700">
                  <Building className="w-3 h-3 inline mr-1" />
                  {team.department}
                </Badge>
              </div>

              {/* Team Lead */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 uppercase mb-2">Team Lead</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {team.lead.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">{team.lead}</p>
                    <p className="text-xs text-secondary-600 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {team.leadEmail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Members</p>
                  <p className="text-lg font-bold text-secondary-900">{team.members}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">AI Agents</p>
                  <p className="text-lg font-bold text-secondary-900">{team.agents}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Projects</p>
                  <p className="text-lg font-bold text-secondary-900">{team.projects.length}</p>
                </div>
              </div>

              {/* Projects */}
              {team.projects.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-2">Active Projects</p>
                  <div className="flex flex-wrap gap-2">
                    {team.projects.map((project, idx) => (
                      <Badge key={idx} className="bg-green-100 text-green-700">
                        {project}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* View Members Button */}
              <Button variant="outline" className="w-full" size="sm">
                View All Members
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              No Teams Found
            </h3>
            <p className="text-secondary-600">
              {searchTerm || departmentFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Get started by creating your first team'}
            </p>
          </div>
        </Card>
      )}
      </div>
    </MainLayout>
  );
};

export default TeamsPage;
