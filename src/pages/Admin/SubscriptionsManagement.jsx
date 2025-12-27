import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, DollarSign, Users } from 'lucide-react';
import adminService from '../../services/adminService';
import toast from 'react-hot-toast';
import { useTheme } from '../../contexts/ThemeContext';
import AdminLayout from '../../components/layout/AdminLayout';

const SubscriptionsManagement = () => {
  const { theme } = useTheme();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: 'personal',
    tier: 'starter',
    description: '',
    price_monthly: '0',
    price_annual: '0',
    trial_days: 14,
    is_published: true,
    is_active: true,
    display_order: 0,
    features: [],
    max_users: 1,
    max_agents: 10,
    storage_gb: 5,
  });

  // Fetch plans
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllPlans();
      console.log('Plans API Response:', response);
      console.log('Response keys:', Object.keys(response || {}));
      console.log('response.data:', response?.data);

      // Handle different response structures
      // API may return: { success: true, data: [...] } or { data: [...] } or [...]
      let plansData = [];

      if (response.data && Array.isArray(response.data)) {
        plansData = response.data;
      } else if (Array.isArray(response)) {
        plansData = response;
      }

      console.log('Parsed plansData:', plansData);
      console.log('plansData length:', plansData.length);
      setPlans(plansData);
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast.error('Failed to load subscription plans');
      setPlans([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Handle create plan
  const handleCreate = () => {
    setModalMode('create');
    setFormData({
      name: '',
      type: 'personal',
      tier: 'starter',
      description: '',
      price_monthly: '0',
      price_annual: '0',
      trial_days: 14,
      is_published: true,
      is_active: true,
      display_order: 0,
      features: [],
      max_users: 1,
      max_agents: 10,
      storage_gb: 5,
    });
    setShowModal(true);
  };

  // Handle edit plan
  const handleEdit = (plan) => {
    setModalMode('edit');
    setSelectedPlan(plan);
    setFormData({
      name: plan.name,
      type: plan.type,
      tier: plan.tier,
      description: plan.description || '',
      price_monthly: plan.price_monthly || plan.monthly_price || '0',
      price_annual: plan.price_annual || plan.annual_price || '0',
      trial_days: plan.trial_days || 14,
      is_published: plan.is_published !== undefined ? plan.is_published : true,
      is_active: plan.is_active !== undefined ? plan.is_active : true,
      display_order: plan.display_order || 0,
      features: plan.features || [],
      max_users: plan.max_users || plan.limits?.max_users || 1,
      max_agents: plan.max_agents || plan.limits?.max_agents || 10,
      storage_gb: plan.storage_gb || plan.limits?.max_storage_gb || 5,
    });
    setShowModal(true);
  };

  // Handle delete plan
  const handleDelete = async (planId) => {
    if (!confirm('Are you sure you want to delete this plan? This action cannot be undone.')) return;

    try {
      await adminService.deletePlan(planId);
      toast.success('Plan deleted successfully');
      fetchPlans();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete plan');
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modalMode === 'create') {
        await adminService.createPlan(formData);
        toast.success('Plan created successfully');
      } else {
        await adminService.updatePlan(selectedPlan.id, formData);
        toast.success('Plan updated successfully');
      }
      setShowModal(false);
      fetchPlans();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save plan');
    }
  };

  const getTierColor = (tier) => {
    const colors = {
      starter: 'bg-green-500/20 text-green-400',
      pro: 'bg-blue-500/20 text-blue-400',
      team: 'bg-purple-500/20 text-purple-400',
      enterprise: 'bg-yellow-500/20 text-yellow-400',
    };
    return colors[tier?.toLowerCase()] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Subscription Plans
            </h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}>
              Manage subscription plans and pricing
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Plan
          </button>
        </div>

        {/* Plans Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <p className={`mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Loading plans...</p>
          </div>
        ) : plans.length === 0 ? (
          <div className={`text-center py-12 rounded-xl ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'}`}>
            <DollarSign className={`w-12 h-12 mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-slate-400'}`} />
            <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              No subscription plans yet
            </h3>
            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
              Create your first subscription plan to get started
            </p>
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Plan
            </button>
          </div>
        ) : (
          <div className={`rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Plan Name
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Type
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Tier
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Monthly Price
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Annual Price
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Limits
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Status
                    </th>
                    <th className={`px-6 py-4 text-right text-xs font-semibold uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {plans.map((plan) => (
                    <tr key={plan.id} className={theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                      <td className="px-6 py-4">
                        <div>
                          <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            {plan.name}
                          </div>
                          {plan.description && (
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                              {plan.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          plan.type === 'organization' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {plan.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTierColor(plan.tier)}`}>
                          {plan.tier}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          ${parseFloat(plan.price_monthly || plan.monthly_price || 0).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          ${parseFloat(plan.price_annual || plan.annual_price || 0).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                          <div>{plan.max_users || plan.limits?.max_users || 0} users</div>
                          <div>{plan.max_agents || plan.limits?.max_agents || 0} agents</div>
                          <div>{plan.storage_gb || plan.limits?.max_storage_gb || 0}GB storage</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {plan.is_published ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                              Draft
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(plan)}
                            className={`p-2 rounded-lg transition-colors ${
                              theme === 'dark'
                                ? 'hover:bg-white/10 text-blue-400'
                                : 'hover:bg-slate-100 text-blue-600'
                            }`}
                            title="Edit Plan"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(plan.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              theme === 'dark'
                                ? 'hover:bg-white/10 text-red-400'
                                : 'hover:bg-slate-100 text-red-600'
                            }`}
                            title="Delete Plan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <PlanModal
            mode={modalMode}
            formData={formData}
            setFormData={setFormData}
            theme={theme}
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </AdminLayout>
  );
};

// Plan Modal Component
const PlanModal = ({ mode, formData, setFormData, theme, onClose, onSubmit }) => {
  const [featureInput, setFeatureInput] = useState('');

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()],
      });
      setFeatureInput('');
    }
  };

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className={`w-full max-w-2xl rounded-2xl p-6 my-8 ${theme === 'dark' ? 'bg-[#1a1f2e] border border-white/10' : 'bg-white border border-slate-200'}`}>
        <h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {mode === 'create' ? 'Create New Plan' : 'Edit Plan'}
        </h3>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Plan Name */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
              Plan Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-white focus:ring-primary-500/50'
                  : 'bg-white border-slate-200 text-slate-900 focus:ring-primary-500/50'
              }`}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-white focus:ring-primary-500/50'
                  : 'bg-white border-slate-200 text-slate-900 focus:ring-primary-500/50'
              }`}
              placeholder="Brief description of the plan..."
            />
          </div>

          {/* Type and Tier */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white focus:ring-primary-500/50'
                    : 'bg-white border-slate-200 text-slate-900 focus:ring-primary-500/50'
                }`}
              >
                <option value="personal">Personal</option>
                <option value="organization">Organization</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                Tier *
              </label>
              <select
                value={formData.tier}
                onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white focus:ring-primary-500/50'
                    : 'bg-white border-slate-200 text-slate-900 focus:ring-primary-500/50'
                }`}
              >
                <option value="starter">Starter</option>
                <option value="pro">Pro</option>
                <option value="team">Team</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                Monthly Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price_monthly}
                onChange={(e) => setFormData({ ...formData, price_monthly: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white focus:ring-primary-500/50'
                    : 'bg-white border-slate-200 text-slate-900 focus:ring-primary-500/50'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                Annual Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price_annual}
                onChange={(e) => setFormData({ ...formData, price_annual: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white focus:ring-primary-500/50'
                    : 'bg-white border-slate-200 text-slate-900 focus:ring-primary-500/50'
                }`}
              />
            </div>
          </div>

          {/* Limits */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                Max Users
              </label>
              <input
                type="number"
                min="1"
                value={formData.max_users}
                onChange={(e) => setFormData({ ...formData, max_users: parseInt(e.target.value) })}
                className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white focus:ring-primary-500/50'
                    : 'bg-white border-slate-200 text-slate-900 focus:ring-primary-500/50'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                Max Agents
              </label>
              <input
                type="number"
                min="1"
                value={formData.max_agents}
                onChange={(e) => setFormData({ ...formData, max_agents: parseInt(e.target.value) })}
                className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white focus:ring-primary-500/50'
                    : 'bg-white border-slate-200 text-slate-900 focus:ring-primary-500/50'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                Storage (GB)
              </label>
              <input
                type="number"
                min="1"
                value={formData.storage_gb}
                onChange={(e) => setFormData({ ...formData, storage_gb: parseInt(e.target.value) })}
                className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white focus:ring-primary-500/50'
                    : 'bg-white border-slate-200 text-slate-900 focus:ring-primary-500/50'
                }`}
              />
            </div>
          </div>

          {/* Trial Days & Display Order */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                Trial Days
              </label>
              <input
                type="number"
                min="0"
                value={formData.trial_days}
                onChange={(e) => setFormData({ ...formData, trial_days: parseInt(e.target.value) })}
                className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white focus:ring-primary-500/50'
                    : 'bg-white border-slate-200 text-slate-900 focus:ring-primary-500/50'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                Display Order
              </label>
              <input
                type="number"
                min="1"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white focus:ring-primary-500/50'
                    : 'bg-white border-slate-200 text-slate-900 focus:ring-primary-500/50'
                }`}
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
              Features
            </label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feature}
                    readOnly
                    className={`flex-1 px-3 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      theme === 'dark'
                        ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                        : 'bg-red-50 hover:bg-red-100 text-red-600'
                    }`}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  placeholder="Add a feature..."
                  className={`flex-1 px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 text-white focus:ring-primary-500/50'
                      : 'bg-white border-slate-200 text-slate-900 focus:ring-primary-500/50'
                  }`}
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                    theme === 'dark'
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Published */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_published"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="is_published" className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
              Publish plan (make visible to users)
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-white/10">
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
              {mode === 'create' ? 'Create Plan' : 'Update Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionsManagement;
