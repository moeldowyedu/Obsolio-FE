import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Ban, CheckCircle, Clock, Filter, ChevronDown } from 'lucide-react';
import adminService from '../../services/adminService';
import subscriptionsService from '../../services/subscriptionsService';
import toast from 'react-hot-toast';
import { useTheme } from '../../contexts/ThemeContext';
import AdminLayout from '../../components/layout/AdminLayout';

const TenantsManagement = () => {
  const { theme } = useTheme();
  const [tenants, setTenants] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'edit', 'subscription', 'trial', 'suspend'

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(20);

  // Fetch tenants
  const fetchTenants = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        per_page: perPage,
        ...(filterType !== 'all' && { type: filterType }),
        ...(filterStatus !== 'all' && { status: filterStatus }),
        ...(searchTerm && { search: searchTerm }),
      };

      const response = await adminService.getAllTenants(params);
      console.log('Tenants API Response:', response);
      console.log('Response type:', typeof response);
      console.log('Response keys:', Object.keys(response || {}));
      console.log('response.data:', response?.data);
      console.log('response.tenants:', response?.tenants);

      // Handle different response structures
      const tenantsData = response.data || response.tenants || response || [];
      const metaData = response.meta || response.pagination || {};

      console.log('Parsed tenantsData:', tenantsData);
      console.log('tenantsData is array?', Array.isArray(tenantsData));
      console.log('tenantsData length:', tenantsData?.length);

      setTenants(Array.isArray(tenantsData) ? tenantsData : []);
      setTotalPages(metaData.last_page || metaData.total_pages || 1);
    } catch (error) {
      console.error('Error fetching tenants:', error);
      console.error('Error details:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to load tenants');
      setTenants([]); // Set empty array on error to prevent crash
    } finally {
      setLoading(false);
    }
  };

  // Fetch subscription plans
  const fetchPlans = async () => {
    try {
      const response = await subscriptionsService.getPlans();
      setPlans(response.data || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, [currentPage, filterType, filterStatus, searchTerm]);

  useEffect(() => {
    fetchPlans();
  }, []);

  // Handle suspend tenant
  const handleSuspend = async (tenantId) => {
    if (!confirm('Are you sure you want to suspend this tenant?')) return;

    try {
      await adminService.suspendTenant(tenantId, { reason: 'Admin action' });
      toast.success('Tenant suspended successfully');
      fetchTenants();
    } catch (error) {
      toast.error('Failed to suspend tenant');
    }
  };

  // Handle activate tenant
  const handleActivate = async (tenantId) => {
    try {
      await adminService.activateTenant(tenantId);
      toast.success('Tenant activated successfully');
      fetchTenants();
    } catch (error) {
      toast.error('Failed to activate tenant');
    }
  };

  // Handle change subscription
  const handleChangeSubscription = async (tenantId, planId, billingCycle = 'monthly') => {
    try {
      await adminService.changeTenantSubscription(tenantId, {
        plan_id: planId,
        billing_cycle: billingCycle,
        starts_immediately: true,
        reason: 'Admin update',
      });
      toast.success('Subscription changed successfully');
      fetchTenants();
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to change subscription');
    }
  };

  // Handle extend trial
  const handleExtendTrial = async (tenantId, days) => {
    try {
      await adminService.extendTrial(tenantId, {
        days: parseInt(days),
        reason: 'Admin extension',
      });
      toast.success(`Trial extended by ${days} days`);
      fetchTenants();
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to extend trial');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      suspended: 'bg-red-500/20 text-red-400 border-red-500/30',
      trial: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      trialing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    };
    return colors[status?.toLowerCase()] || 'bg-gray-500/20 text-gray-400';
  };

  const getTypeColor = (type) => {
    return type === 'organization'
      ? 'bg-blue-500/20 text-blue-400'
      : 'bg-purple-500/20 text-purple-400';
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Tenants Management
          </h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}>
            Manage all system tenants, subscriptions, and trials
          </p>
        </div>

        {/* Filters and Search */}
        <div className={`rounded-xl p-4 mb-6 ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'}`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`} />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 text-white focus:ring-primary-500/50'
                      : 'bg-white border-slate-200 text-slate-900 focus:ring-primary-500/50'
                  }`}
                />
              </div>
            </div>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={`px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-white focus:ring-primary-500/50'
                  : 'bg-white border-slate-200 text-slate-900 focus:ring-primary-500/50'
              }`}
            >
              <option value="all">All Types</option>
              <option value="personal">Personal</option>
              <option value="organization">Organization</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-white focus:ring-primary-500/50'
                  : 'bg-white border-slate-200 text-slate-900 focus:ring-primary-500/50'
              }`}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Tenants Table */}
        <div className={`rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'}`}>
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              <p className={`mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Loading tenants...</p>
            </div>
          ) : tenants.length === 0 ? (
            <div className="p-12 text-center">
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}>No tenants found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Tenant
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Type
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Status
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Plan
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Subdomain
                    </th>
                    <th className={`px-6 py-4 text-right text-xs font-semibold uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {tenants.map((tenant) => (
                    <tr key={tenant.id} className={theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                      <td className="px-6 py-4">
                        <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          {tenant.name}
                        </div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                          {tenant.email || tenant.owner?.email || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(tenant.type)}`}>
                          {tenant.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(tenant.subscription?.status || tenant.status)}`}>
                          {tenant.subscription?.status || tenant.status || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          {tenant.subscription?.plan?.name || 'No Plan'}
                        </div>
                        {tenant.is_on_trial && (
                          <div className="text-xs text-yellow-400 mt-1">
                            Trial ends: {new Date(tenant.trial_ends_at).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <code className={`text-sm ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`}>
                          {tenant.subdomain || tenant.slug}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {/* Change Subscription */}
                          <button
                            onClick={() => {
                              setSelectedTenant(tenant);
                              setModalType('subscription');
                              setShowModal(true);
                            }}
                            className={`p-2 rounded-lg transition-colors ${
                              theme === 'dark'
                                ? 'hover:bg-white/10 text-blue-400'
                                : 'hover:bg-slate-100 text-blue-600'
                            }`}
                            title="Change Subscription"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {/* Extend Trial */}
                          {tenant.is_on_trial && (
                            <button
                              onClick={() => {
                                setSelectedTenant(tenant);
                                setModalType('trial');
                                setShowModal(true);
                              }}
                              className={`p-2 rounded-lg transition-colors ${
                                theme === 'dark'
                                  ? 'hover:bg-white/10 text-yellow-400'
                                  : 'hover:bg-slate-100 text-yellow-600'
                              }`}
                              title="Extend Trial"
                            >
                              <Clock className="w-4 h-4" />
                            </button>
                          )}

                          {/* Suspend/Activate */}
                          {tenant.status !== 'suspended' ? (
                            <button
                              onClick={() => handleSuspend(tenant.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                theme === 'dark'
                                  ? 'hover:bg-white/10 text-red-400'
                                  : 'hover:bg-slate-100 text-red-600'
                              }`}
                              title="Suspend Tenant"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleActivate(tenant.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                theme === 'dark'
                                  ? 'hover:bg-white/10 text-green-400'
                                  : 'hover:bg-slate-100 text-green-600'
                              }`}
                              title="Activate Tenant"
                            >
                              <CheckCircle className="w-4 h-4" />
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
          {totalPages > 1 && (
            <div className={`px-6 py-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
              <div className="flex items-center justify-between">
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === 1
                        ? 'opacity-50 cursor-not-allowed'
                        : theme === 'dark'
                        ? 'bg-white/10 hover:bg-white/20 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === totalPages
                        ? 'opacity-50 cursor-not-allowed'
                        : theme === 'dark'
                        ? 'bg-white/10 hover:bg-white/20 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && selectedTenant && (
          <ModalComponent
            tenant={selectedTenant}
            modalType={modalType}
            plans={plans}
            theme={theme}
            onClose={() => {
              setShowModal(false);
              setSelectedTenant(null);
            }}
            onChangeSubscription={handleChangeSubscription}
            onExtendTrial={handleExtendTrial}
          />
        )}
      </div>
    </AdminLayout>
  );
};

// Modal Component
const ModalComponent = ({ tenant, modalType, plans, theme, onClose, onChangeSubscription, onExtendTrial }) => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [trialDays, setTrialDays] = useState('30');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'subscription') {
      onChangeSubscription(tenant.id, selectedPlan, billingCycle);
    } else if (modalType === 'trial') {
      onExtendTrial(tenant.id, trialDays);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-lg rounded-2xl p-6 ${theme === 'dark' ? 'bg-[#1a1f2e] border border-white/10' : 'bg-white border border-slate-200'}`}>
        <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {modalType === 'subscription' ? 'Change Subscription' : 'Extend Trial'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {modalType === 'subscription' ? (
            <>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                  Select Plan
                </label>
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 text-white focus:ring-primary-500/50'
                      : 'bg-white border-slate-200 text-slate-900 focus:ring-primary-500/50'
                  }`}
                  required
                >
                  <option value="">Select a plan...</option>
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} - ${plan.monthly_price / 100}/mo
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                  Billing Cycle
                </label>
                <select
                  value={billingCycle}
                  onChange={(e) => setBillingCycle(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 text-white focus:ring-primary-500/50'
                      : 'bg-white border-slate-200 text-slate-900 focus:ring-primary-500/50'
                  }`}
                >
                  <option value="monthly">Monthly</option>
                  <option value="annual">Annual</option>
                </select>
              </div>
            </>
          ) : (
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                Extend Trial By (Days)
              </label>
              <input
                type="number"
                min="1"
                max="365"
                value={trialDays}
                onChange={(e) => setTrialDays(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white focus:ring-primary-500/50'
                    : 'bg-white border-slate-200 text-slate-900 focus:ring-primary-500/50'
                }`}
                required
              />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  : 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg font-medium bg-primary-600 hover:bg-primary-500 text-white transition-colors"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantsManagement;
