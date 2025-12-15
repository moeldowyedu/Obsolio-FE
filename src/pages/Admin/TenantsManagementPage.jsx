import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { useAdminStore } from '../../store/adminStore';
import {
  Building2, Users, DollarSign, TrendingUp, Search, Filter,
  Download, Plus, Eye, Settings, Ban, CheckCircle, LogIn,
  Calendar, Crown, Zap, Shield, Loader2, User, Clock, X
} from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const TenantsManagementPage = () => {
  const { tenants, fetchAllTenants, isLoading, suspendTenant, activateTenant, updateTenant, pagination } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [newEndDate, setNewEndDate] = useState('');

  // Use store pagination or local if store not fully synced yet
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const location = useLocation();


  useEffect(() => {
    // Fetch initial data
    fetchAllTenants({ page: currentPage, search: searchTerm });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]); // Add debounced search dependecy in future

  // Handle Search Enter
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(1);
      fetchAllTenants({ page: 1, search: searchTerm, plan: filterPlan, status: filterStatus });
    }
  };

  const handleAction = async (action, tenantId) => {
    try {
      if (action === 'suspend') {
        await suspendTenant(tenantId);
        toast.success('Tenant suspended');
      } else if (action === 'activate') {
        await activateTenant(tenantId);
        toast.success('Tenant activated');
      }
    } catch (error) {
      toast.error('Action failed');
    }
  };

  const handleOpenModal = (tenant) => {
    setSelectedTenant(tenant);
    // Format existing date to YYYY-MM-DD for input or empty
    const currentEnd = tenant.end_date ? new Date(tenant.end_date).toISOString().split('T')[0] : '';
    setNewEndDate(currentEnd);
    setIsModalOpen(true);
  };

  const handleSaveSubscription = async () => {
    if (!selectedTenant) return;
    try {
      await updateTenant(selectedTenant.id, { end_date: newEndDate });
      toast.success('Subscription updated successfully');
      setIsModalOpen(false);
      setSelectedTenant(null);
    } catch (error) {
      console.error('Update failed:', error);
      toast.error(error.response?.data?.message || 'Failed to update subscription');
    }
  };

  // Stats Logic - Calculate from visible tenants or fetch separate stats endpoint
  // For now using simple calculations on loaded tenants or hardcoded until stats endpoint ready
  const activeTenantsCount = tenants.filter(t => t.status === 'Active').length;

  const stats = [
    {
      label: 'Total Tenants',
      value: pagination.totalItems || tenants.length,
      change: 'Platform-wide',
      trend: 'up',
      icon: Building2,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Active Subscriptions',
      value: activeTenantsCount,
      change: 'Real-time',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      // Placeholder for future billing integration
      label: 'Total Revenue (MRR)',
      value: '$0',
      change: 'Coming Soon',
      trend: 'neutral',
      icon: DollarSign,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Avg Users/Tenant',
      value: tenants.length > 0 ? Math.round(tenants.reduce((acc, t) => acc + (t.total_users || t.users_count || 0), 0) / tenants.length) : 0,
      change: 'Analytics',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const getPlanIcon = (plan) => {
    switch (plan?.toLowerCase()) {
      case 'enterprise': return <Shield className="w-4 h-4" />;
      case 'pro': return <Zap className="w-4 h-4" />;
      default: return <Crown className="w-4 h-4" />;
    }
  };

  const getPlanColor = (plan) => {
    switch (plan?.toLowerCase()) {
      case 'enterprise': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'pro': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'trial': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Styles
  const cardClass = 'glass-card rounded-2xl p-6 hover:shadow-xl transition-all border border-white/10 bg-[#1e293b]/40';
  const textPrimary = 'text-white';
  const textSecondary = 'text-gray-400';
  const tableHeaderClass = 'bg-gray-900/80 text-gray-400';
  const tableRowClass = 'border-t border-gray-700/50 hover:bg-gray-900/50';

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${textPrimary}`}>Tenants Management</h1>
            <p className={textSecondary}>Manage all platform tenants and subscriptions</p>
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
              <div key={index} className={cardClass}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className={`text-3xl font-bold mb-1 ${textPrimary}`}>{stat.value}</h3>
                <p className={`${textSecondary} text-sm font-medium mb-2`}>{stat.label}</p>
                <p className="text-green-400 text-xs font-semibold">{stat.change}</p>
              </div>
            );
          })}
        </div>

        {/* Filters and Search */}
        <div className={cardClass}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${textSecondary}`} />
                <input
                  type="text"
                  placeholder="Search by tenant name, domain or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500 bg-gray-900 border-gray-700 text-white placeholder-gray-400`}
                />
              </div>
            </div>

            {/* Plan Filter */}
            <div className="relative">
              <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${textSecondary}`} />
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500 appearance-none bg-gray-900 border-gray-700 text-white`}
              >
                <option value="all">All Plans</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Pro">Pro</option>
                <option value="Free">Free</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${textSecondary}`} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500 appearance-none bg-gray-900 border-gray-700 text-white`}
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
        <div className={`backdrop-blur-sm rounded-xl border overflow-hidden bg-gray-800/50 border-gray-700/50`}>
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
            </div>
          ) : tenants.length === 0 ? (
            <div className={`flex flex-col items-center justify-center py-20 ${textSecondary}`}>
              <Building2 className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg">No tenants found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={tableHeaderClass}>
                  <tr>
                    <th className="text-left py-2 px-3 text-xs font-bold uppercase">Tenant</th>
                    <th className="text-left py-2 px-3 text-xs font-bold uppercase">Admin</th>
                    <th className="text-left py-2 px-3 text-xs font-bold uppercase">Plan & Trial</th>
                    <th className="text-left py-2 px-3 text-xs font-bold uppercase">Start Date</th>
                    <th className="text-left py-2 px-3 text-xs font-bold uppercase">Status</th>
                    <th className="text-left py-2 px-3 text-xs font-bold uppercase">Users</th>
                    <th className="text-left py-2 px-3 text-xs font-bold uppercase">End Date</th>
                    <th className="text-right py-2 px-3 text-xs font-bold uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tenants.map((tenant) => (
                    <tr key={tenant.id} className={`${tableRowClass} transition-colors`}>
                      <td className="py-2 px-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
                            {tenant.logo_url ? (
                              <img src={tenant.logo_url} alt={tenant.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-white font-bold text-xs">{(tenant.name || 'T')[0]}</span>
                            )}
                          </div>
                          <div>
                            <div className={`font-semibold text-sm ${textPrimary}`}>{tenant.name || 'Unnamed'}</div>
                            <div className={`text-xs ${textSecondary}`}>{tenant.subdomain || tenant.domain || 'No Domain'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        {tenant.tenant_admin ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                              {/* Avatar placeholder or image if available */}
                              <User className="w-3 h-3 text-gray-500" />
                            </div>
                            <div>
                              <div className={`text-xs font-medium ${textPrimary}`}>{tenant.tenant_admin.name}</div>
                              <div className={`text-[10px] ${textSecondary}`}>{tenant.tenant_admin.email}</div>
                            </div>
                          </div>
                        ) : (
                          <span className={`text-xs ${textSecondary}`}>No Admin</span>
                        )}
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex flex-col space-y-0.5">
                          <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold w-fit border ${getPlanColor(tenant.plan || 'free')}`}>
                            {getPlanIcon(tenant.plan || 'free')}
                            <span className="uppercase">{tenant.plan || 'Free'}</span>
                          </span>
                          {(tenant.days_left !== undefined && tenant.days_left !== null && tenant.days_left > 0) && (
                            <span className={`text-[10px] flex items-center ${textSecondary}`}>
                              <Clock className="w-3 h-3 mr-1" />
                              {Math.ceil(tenant.days_left)} days left
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <div className={`flex items-center space-x-2 ${textSecondary}`}>
                          <Calendar className="w-3 h-3" />
                          <span className="text-xs">{tenant.start_date ? format(new Date(tenant.start_date), 'MMM d, yyyy') : (tenant.created_at ? format(new Date(tenant.created_at), 'MMM d, yyyy') : '-')}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusColor(tenant.status || 'Active')}`}>
                          {tenant.status || 'Active'}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <div className={`flex items-center space-x-2 ${textPrimary}`}>
                          <Users className={`w-3 h-3 ${textSecondary}`} />
                          <span className="font-semibold text-xs">{tenant.total_users || tenant.users_count || 0}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <div className={`flex items-center space-x-2 ${textSecondary}`}>
                          <Calendar className="w-3 h-3" />
                          <span className="text-xs">
                            {tenant.end_date
                              ? format(new Date(tenant.end_date), 'MMM d, yyyy')
                              : '-'}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center justify-end space-x-1">
                          <button className={`p-1.5 rounded-lg transition-colors hover:bg-gray-700`} title="View Details">
                            <Eye className="w-3.5 h-3.5 text-blue-400" />
                          </button>
                          <button
                            onClick={() => handleOpenModal(tenant)}
                            className={`p-1.5 rounded-lg transition-colors hover:bg-gray-700`} title="Manage Subscription">
                            <Settings className="w-3.5 h-3.5 text-purple-400" />
                          </button>
                          <button className={`p-1.5 rounded-lg transition-colors hover:bg-gray-700`} title="Login As">
                            <LogIn className="w-3.5 h-3.5 text-green-400" />
                          </button>
                          {tenant.status === 'Suspended' ? (
                            <button
                              onClick={() => handleAction('activate', tenant.id)}
                              className={`p-1.5 rounded-lg transition-colors hover:bg-gray-700`}
                              title="Activate">
                              <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAction('suspend', tenant.id)}
                              className={`p-1.5 rounded-lg transition-colors hover:bg-gray-700`}
                              title="Suspend">
                              <Ban className="w-3.5 h-3.5 text-red-400" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {tenants.length > 0 && (
            <div className={`px-6 py-4 flex items-center justify-between border-t bg-gray-900/80 border-gray-700/50`}>
              <div className={`text-sm ${textSecondary}`}>
                Page {pagination.currentPage} of {pagination.totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm font-semibold bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 text-white`}
                >
                  Previous
                </button>
                <div className="flex items-center space-x-1">
                  {/* Simplified pagination dots/numbers could go here */}
                  <span className={`font-semibold px-2 ${textPrimary}`}>{pagination.currentPage}</span>
                </div>
                <button
                  onClick={() => setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))}
                  disabled={currentPage === pagination.totalPages}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm font-semibold bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 text-white`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subscription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={`w-full max-w-md p-6 rounded-xl shadow-2xl bg-gray-800 border border-gray-700`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${textPrimary}`}>Manage Subscription</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className={`p-1 rounded-full hover:bg-gray-100 transition-colors ${textSecondary}`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondary}`}>Tenant</label>
                <div className={`p-3 rounded-lg border bg-gray-900 border-gray-700 ${textPrimary}`}>
                  {selectedTenant?.name}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondary}`}>Trial / Subscription End Date</label>
                <input
                  type="date"
                  value={newEndDate}
                  onChange={(e) => setNewEndDate(e.target.value)}
                  className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none bg-gray-900 border-gray-700 text-white`}
                />
                <p className="text-xs text-gray-400 mt-1">Set a future date to extend the trial or subscription.</p>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className={`px-4 py-2 rounded-lg font-medium text-gray-300 hover:bg-gray-700`}>
                  Cancel
                </button>
                <button
                  onClick={handleSaveSubscription}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:opacity-90 transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default TenantsManagementPage;
