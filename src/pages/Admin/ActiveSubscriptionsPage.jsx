import { useState, useEffect } from 'react';
import {
  CreditCard,
  Search,
  Filter,
  X,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Play,
  Ban,
  Calendar,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import adminService from '../../services/adminService';
import toast from 'react-hot-toast';

const ActiveSubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReactivateModal, setShowReactivateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [statistics, setStatistics] = useState({
    total_subscriptions: 0,
    active_subscriptions: 0,
    trialing_subscriptions: 0,
    canceled_subscriptions: 0,
    expired_subscriptions: 0,
    past_due_subscriptions: 0,
    total_revenue: 0,
    monthly_recurring_revenue: 0
  });

  // Filters and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [planFilter, setPlanFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  // Action form data
  const [cancelFormData, setCancelFormData] = useState({
    reason: '',
    cancel_at_period_end: true
  });

  

  const statuses = ['trialing', 'active', 'canceled', 'expired', 'past_due'];

  useEffect(() => {
    fetchSubscriptions();
    fetchStatistics();
  }, [currentPage, searchTerm, statusFilter, planFilter]);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        per_page: perPage
      };

      if (searchTerm) params.search = searchTerm;
      if (statusFilter) params.status = statusFilter;
      if (planFilter) params.plan_id = planFilter;

      const response = await adminService.getSubscriptions(params);

      let subsData = [];
      let total = 0;

      if (response.data?.data && Array.isArray(response.data.data)) {
        subsData = response.data.data;
        total = response.data.total || response.data.data.length;
      } else if (response.data && Array.isArray(response.data)) {
        subsData = response.data;
        total = response.data.length;
      } else if (Array.isArray(response)) {
        subsData = response;
        total = response.length;
      }

      setSubscriptions(subsData);
      setTotalPages(Math.ceil(total / perPage));
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast.error('Failed to fetch subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await adminService.getSubscriptionStatistics();
      if (response.data) {
        setStatistics(response.data);
      } else if (response) {
        setStatistics(response);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleCancelSubscription = async (e) => {
    e.preventDefault();
    try {
      await adminService.cancelSubscription(selectedSubscription.id, cancelFormData);
      toast.success('Subscription canceled successfully');
      setShowCancelModal(false);
      setSelectedSubscription(null);
      setCancelFormData({ reason: '', cancel_at_period_end: true });
      fetchSubscriptions();
      fetchStatistics();
    } catch (error) {
      console.error('Error canceling subscription:', error);
      toast.error(error.response?.data?.message || 'Failed to cancel subscription');
    }
  };

  const handleReactivateSubscription = async (e) => {
    e.preventDefault();
    try {
      await adminService.reactivateSubscription(selectedSubscription.id);
      toast.success('Subscription reactivated successfully');
      setShowReactivateModal(false);
      setSelectedSubscription(null);
      fetchSubscriptions();
      fetchStatistics();
    } catch (error) {
      console.error('Error reactivating subscription:', error);
      toast.error(error.response?.data?.message || 'Failed to reactivate subscription');
    }
  };

  const openCancelModal = (subscription) => {
    setSelectedSubscription(subscription);
    setCancelFormData({ reason: '', cancel_at_period_end: true });
    setShowCancelModal(true);
  };

  const openReactivateModal = (subscription) => {
    setSelectedSubscription(subscription);
    setShowReactivateModal(true);
  };

  const openDetailsModal = (subscription) => {
    setSelectedSubscription(subscription);
    setShowDetailsModal(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: {
        icon: CheckCircle,
        className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      },
      trialing: {
        icon: Clock,
        className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      },
      canceled: {
        icon: XCircle,
        className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      },
      expired: {
        icon: Ban,
        className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
      },
      past_due: {
        icon: AlertCircle,
        className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      }
    };

    const config = statusConfig[status] || statusConfig.active;
    const Icon = config.icon;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${config.className}`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount / 100);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Active Subscriptions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage tenant subscriptions and billing
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Subscriptions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {statistics.total_subscriptions}
                </p>
              </div>
              <CreditCard className="w-10 h-10 text-purple-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                  {statistics.active_subscriptions}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Trialing</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                  {statistics.trialing_subscriptions}
                </p>
              </div>
              <Clock className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">MRR</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                  {formatCurrency(statistics.monthly_recurring_revenue || 0)}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-purple-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Canceled</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
                  {statistics.canceled_subscriptions}
                </p>
              </div>
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Past Due</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
                  {statistics.past_due_subscriptions}
                </p>
              </div>
              <AlertCircle className="w-10 h-10 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Expired</p>
                <p className="text-2xl font-bold text-gray-600 dark:text-gray-400 mt-1">
                  {statistics.expired_subscriptions}
                </p>
              </div>
              <Ban className="w-10 h-10 text-gray-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                  {formatCurrency(statistics.total_revenue || 0)}
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-green-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by tenant or organization..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="w-full md:w-48">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
                  >
                    <option value="">All Statuses</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscriptions Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No subscriptions found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Tenant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Period
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {subscriptions.map((subscription) => (
                      <tr key={subscription.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                              <CreditCard className="w-6 h-6 text-white" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {subscription.tenant?.name || subscription.organization?.name || 'N/A'}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                ID: {subscription.tenant_id || subscription.organization_id || 'N/A'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {subscription.plan?.name || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {subscription.billing_cycle || 'monthly'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatCurrency(subscription.amount || 0)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(subscription.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {formatDate(subscription.current_period_start)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              to {formatDate(subscription.current_period_end)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openDetailsModal(subscription)}
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              title="View Details"
                            >
                              <Search className="w-4 h-4" />
                            </button>
                            {subscription.status === 'active' || subscription.status === 'trialing' ? (
                              <button
                                onClick={() => openCancelModal(subscription)}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                title="Cancel"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            ) : subscription.status === 'canceled' ? (
                              <button
                                onClick={() => openReactivateModal(subscription)}
                                className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                title="Reactivate"
                              >
                                <Play className="w-4 h-4" />
                              </button>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Page <span className="font-medium">{currentPage}</span> of{' '}
                        <span className="font-medium">{totalPages}</span>
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cancel Subscription</h2>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCancelSubscription}>
                <div className="mb-4">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Are you sure you want to cancel this subscription for{' '}
                    <strong>{selectedSubscription?.tenant?.name || selectedSubscription?.organization?.name}</strong>?
                  </p>

                  <div className="mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cancelFormData.cancel_at_period_end}
                        onChange={(e) => setCancelFormData({ ...cancelFormData, cancel_at_period_end: e.target.checked })}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Cancel at period end ({formatDate(selectedSubscription?.current_period_end)})
                      </span>
                    </label>
                  </div>

                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cancellation Reason
                  </label>
                  <textarea
                    required
                    value={cancelFormData.reason}
                    onChange={(e) => setCancelFormData({ ...cancelFormData, reason: e.target.value })}
                    rows={3}
                    placeholder="Provide a reason for canceling this subscription..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCancelModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Keep Subscription
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Cancel Subscription
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Reactivate Subscription Modal */}
      {showReactivateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reactivate Subscription</h2>
                <button
                  onClick={() => setShowReactivateModal(false)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleReactivateSubscription}>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Are you sure you want to reactivate this subscription for{' '}
                  <strong>{selectedSubscription?.tenant?.name || selectedSubscription?.organization?.name}</strong>?
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowReactivateModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Reactivate Subscription
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedSubscription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Subscription Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tenant/Organization</p>
                    <p className="text-sm text-gray-900 dark:text-white mt-1">
                      {selectedSubscription.tenant?.name || selectedSubscription.organization?.name || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                    <div className="mt-1">{getStatusBadge(selectedSubscription.status)}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Plan</p>
                    <p className="text-sm text-gray-900 dark:text-white mt-1">
                      {selectedSubscription.plan?.name || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Amount</p>
                    <p className="text-sm text-gray-900 dark:text-white mt-1">
                      {formatCurrency(selectedSubscription.amount || 0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Billing Cycle</p>
                    <p className="text-sm text-gray-900 dark:text-white mt-1">
                      {selectedSubscription.billing_cycle || 'monthly'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Period</p>
                    <p className="text-sm text-gray-900 dark:text-white mt-1">
                      {formatDate(selectedSubscription.current_period_start)} - {formatDate(selectedSubscription.current_period_end)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</p>
                    <p className="text-sm text-gray-900 dark:text-white mt-1">
                      {formatDate(selectedSubscription.created_at)}
                    </p>
                  </div>
                  {selectedSubscription.canceled_at && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Canceled At</p>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">
                        {formatDate(selectedSubscription.canceled_at)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveSubscriptionsPage;
