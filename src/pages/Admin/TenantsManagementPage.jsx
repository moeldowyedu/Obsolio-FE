import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import {
  Building2, Users, DollarSign, TrendingUp, Search, Filter,
  Download, Plus, Eye, Settings, Ban, CheckCircle, LogIn,
  Calendar, Crown, Zap, Shield
} from 'lucide-react';

const TenantsManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock Stats
  const stats = [
    {
      label: 'Total Tenants',
      value: '247',
      change: '+23 this month',
      trend: 'up',
      icon: Building2,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Active Subscriptions',
      value: '189',
      change: '76.5% conversion',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Total Revenue (MRR)',
      value: '$124,580',
      change: '+$18,240 vs last month',
      trend: 'up',
      icon: DollarSign,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Growth Rate',
      value: '12.3%',
      change: '+2.1% from last month',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500'
    }
  ];

  // Mock Tenants Data (15 tenants)
  const mockTenants = [
    {
      id: 1,
      name: 'TechCorp Industries',
      email: 'admin@techcorp.com',
      plan: 'Enterprise',
      status: 'Active',
      users: 125,
      createdDate: '2024-01-15',
      mrr: 2999,
      logo: 'TC'
    },
    {
      id: 2,
      name: 'Innovate Solutions',
      email: 'contact@innovate.io',
      plan: 'Pro',
      status: 'Active',
      users: 45,
      createdDate: '2024-02-20',
      mrr: 499,
      logo: 'IS'
    },
    {
      id: 3,
      name: 'StartupHub Inc',
      email: 'info@startuphub.com',
      plan: 'Free',
      status: 'Trial',
      users: 8,
      createdDate: '2024-10-05',
      mrr: 0,
      logo: 'SH'
    },
    {
      id: 4,
      name: 'DataDrive Analytics',
      email: 'admin@datadrive.ai',
      plan: 'Enterprise',
      status: 'Active',
      users: 230,
      createdDate: '2023-11-10',
      mrr: 4999,
      logo: 'DD'
    },
    {
      id: 5,
      name: 'CloudScale Systems',
      email: 'hello@cloudscale.com',
      plan: 'Pro',
      status: 'Active',
      users: 67,
      createdDate: '2024-03-15',
      mrr: 499,
      logo: 'CS'
    },
    {
      id: 6,
      name: 'AgileWorks Ltd',
      email: 'contact@agileworks.co',
      plan: 'Pro',
      status: 'Suspended',
      users: 34,
      createdDate: '2024-01-22',
      mrr: 0,
      logo: 'AW'
    },
    {
      id: 7,
      name: 'FinTech Ventures',
      email: 'admin@fintechventures.io',
      plan: 'Enterprise',
      status: 'Active',
      users: 178,
      createdDate: '2023-09-08',
      mrr: 2999,
      logo: 'FV'
    },
    {
      id: 8,
      name: 'EduLearn Platform',
      email: 'support@edulearn.edu',
      plan: 'Pro',
      status: 'Active',
      users: 89,
      createdDate: '2024-04-12',
      mrr: 499,
      logo: 'EL'
    },
    {
      id: 9,
      name: 'HealthTech Solutions',
      email: 'info@healthtech.med',
      plan: 'Enterprise',
      status: 'Active',
      users: 312,
      createdDate: '2023-08-20',
      mrr: 4999,
      logo: 'HT'
    },
    {
      id: 10,
      name: 'RetailBoost Co',
      email: 'admin@retailboost.shop',
      plan: 'Free',
      status: 'Trial',
      users: 5,
      createdDate: '2024-10-28',
      mrr: 0,
      logo: 'RB'
    },
    {
      id: 11,
      name: 'DevOps Masters',
      email: 'team@devopsmasters.dev',
      plan: 'Pro',
      status: 'Active',
      users: 52,
      createdDate: '2024-05-18',
      mrr: 499,
      logo: 'DM'
    },
    {
      id: 12,
      name: 'Marketing Geniuses',
      email: 'hello@marketinggeniuses.com',
      plan: 'Pro',
      status: 'Active',
      users: 41,
      createdDate: '2024-06-25',
      mrr: 499,
      logo: 'MG'
    },
    {
      id: 13,
      name: 'Legal Eagle Partners',
      email: 'contact@legaleagle.law',
      plan: 'Enterprise',
      status: 'Active',
      users: 95,
      createdDate: '2024-02-14',
      mrr: 2999,
      logo: 'LE'
    },
    {
      id: 14,
      name: 'Creative Studios XYZ',
      email: 'info@creativestudios.art',
      plan: 'Free',
      status: 'Active',
      users: 12,
      createdDate: '2024-09-10',
      mrr: 0,
      logo: 'CS'
    },
    {
      id: 15,
      name: 'LogisticsPro Network',
      email: 'admin@logisticspro.net',
      plan: 'Pro',
      status: 'Active',
      users: 73,
      createdDate: '2024-07-03',
      mrr: 499,
      logo: 'LP'
    }
  ];

  // Filter and search logic
  const filteredTenants = mockTenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'all' || tenant.plan === filterPlan;
    const matchesStatus = filterStatus === 'all' || tenant.status === filterStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTenants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTenants = filteredTenants.slice(startIndex, startIndex + itemsPerPage);

  const getPlanIcon = (plan) => {
    switch (plan) {
      case 'Enterprise': return <Shield className="w-4 h-4" />;
      case 'Pro': return <Zap className="w-4 h-4" />;
      default: return <Crown className="w-4 h-4" />;
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Pro': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Trial': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Suspended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Tenants Management</h1>
            <p className="text-gray-400">Manage all platform tenants and subscriptions</p>
          </div>
          <button className="mt-4 md:mt-0 flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Create New Tenant</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm font-medium mb-2">{stat.label}</p>
                <p className="text-green-400 text-xs font-semibold">{stat.change}</p>
              </div>
            );
          })}
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by tenant name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Plan Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 appearance-none"
              >
                <option value="all">All Plans</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Pro">Pro</option>
                <option value="Free">Free</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 appearance-none"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Trial">Trial</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Export Button */}
          <div className="mt-4 flex justify-end">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm font-semibold">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Tenants Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/80">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Tenant</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Plan</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Status</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Users</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Created</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">MRR</th>
                  <th className="text-right py-4 px-6 text-xs font-bold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTenants.map((tenant) => (
                  <tr key={tenant.id} className="border-t border-gray-700/50 hover:bg-gray-900/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{tenant.logo}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-white">{tenant.name}</div>
                          <div className="text-xs text-gray-400">{tenant.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold border ${getPlanColor(tenant.plan)}`}>
                        {getPlanIcon(tenant.plan)}
                        <span>{tenant.plan}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(tenant.status)}`}>
                        {tenant.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2 text-white">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold">{tenant.users}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{tenant.createdDate}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-white font-bold">
                        ${tenant.mrr.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="View Details">
                          <Eye className="w-4 h-4 text-blue-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="Manage Subscription">
                          <Settings className="w-4 h-4 text-purple-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="Login As">
                          <LogIn className="w-4 h-4 text-green-400" />
                        </button>
                        {tenant.status === 'Active' ? (
                          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="Suspend">
                            <Ban className="w-4 h-4 text-red-400" />
                          </button>
                        ) : (
                          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="Activate">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-900/80 px-6 py-4 flex items-center justify-between border-t border-gray-700/50">
            <div className="text-sm text-gray-400">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTenants.length)} of {filteredTenants.length} tenants
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-secondary-600 text-white rounded-lg transition-colors text-sm font-semibold"
              >
                Previous
              </button>
              <div className="flex items-center space-x-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${
                      currentPage === i + 1
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-secondary-600 text-white rounded-lg transition-colors text-sm font-semibold"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TenantsManagementPage;
