import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  FolderTree,
  Tag,
  TrendingUp,
  Grid,
  ArrowUpDown,
} from 'lucide-react';
import adminService from '../../services/adminService';
import notify from '../../utils/toast';

const AgentCategoriesPage = () => {
  const { theme } = useTheme();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('display_order');
  const [sortOrder, setSortOrder] = useState('asc');

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '',
    display_order: 1,
  });

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    totalAgents: 0,
    avgAgentsPerCategory: 0,
  });

  useEffect(() => {
    fetchCategories();
  }, [searchQuery, sortBy, sortOrder]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchQuery || undefined,
        sort: `${sortBy}_${sortOrder}`
      };

      const response = await adminService.getAgentCategories(params);

      // Handle different response structures
      let categoriesData = [];
      if (response.data && Array.isArray(response.data)) {
        categoriesData = response.data;
      } else if (Array.isArray(response)) {
        categoriesData = response;
      }

      setCategories(categoriesData);

      // Calculate stats
      const totalAgents = categoriesData.reduce((sum, cat) => sum + (cat.agents_count || 0), 0);
      setStats({
        total: categoriesData.length,
        totalAgents: totalAgents,
        avgAgentsPerCategory: categoriesData.length > 0 ? Math.round(totalAgents / categoriesData.length) : 0,
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
      notify.error('Failed to load agent categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminService.createAgentCategory(formData);
      notify.success('Category created successfully');
      setShowCreateModal(false);
      resetForm();
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
      notify.error(error.response?.data?.message || 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminService.updateAgentCategory(selectedCategory.id, formData);
      notify.success('Category updated successfully');
      setShowEditModal(false);
      setSelectedCategory(null);
      resetForm();
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      notify.error(error.response?.data?.message || 'Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    setLoading(true);
    try {
      await adminService.deleteAgentCategory(selectedCategory.id);
      notify.success('Category deleted successfully');
      setShowDeleteModal(false);
      setSelectedCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      notify.error(error.response?.data?.message || 'Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      display_order: category.display_order,
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      icon: '',
      display_order: 1,
    });
    setSelectedCategory(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FolderTree className="w-8 h-8 text-purple-500" />
            <h1
              className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Agent Categories
            </h1>
          </div>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Organize and manage agent categories for better classification
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className={`p-6 rounded-xl ${
              theme === 'dark'
                ? 'bg-gray-800/50 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Total Categories
                </p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {stats.total}
                </p>
              </div>
              <Grid className="w-10 h-10 text-purple-500" />
            </div>
          </div>

          <div
            className={`p-6 rounded-xl ${
              theme === 'dark'
                ? 'bg-gray-800/50 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Total Agents
                </p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {stats.totalAgents}
                </p>
              </div>
              <Tag className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div
            className={`p-6 rounded-xl ${
              theme === 'dark'
                ? 'bg-gray-800/50 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Avg. Agents/Category
                </p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {stats.avgAgentsPerCategory}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-500" />
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Create Category
          </button>
        </div>

        {/* Categories Table */}
        <div
          className={`rounded-xl overflow-hidden ${
            theme === 'dark'
              ? 'bg-gray-800/50 border border-gray-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead
                className={
                  theme === 'dark'
                    ? 'bg-gray-900/50 border-b border-gray-700'
                    : 'bg-gray-50 border-b border-gray-200'
                }
              >
                <tr>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-opacity-80 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                    onClick={() => toggleSort('display_order')}
                  >
                    <div className="flex items-center gap-2">
                      Order
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-opacity-80 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                    onClick={() => toggleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Category
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Description
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-opacity-80 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                    onClick={() => toggleSort('agents_count')}
                  >
                    <div className="flex items-center gap-2">
                      Agents
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th
                    className={`px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                      </div>
                    </td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className={`px-6 py-12 text-center ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      No categories found
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr
                      key={category.id}
                      className={`${
                        theme === 'dark'
                          ? 'hover:bg-gray-700/30'
                          : 'hover:bg-gray-50'
                      } transition-colors`}
                    >
                      <td
                        className={`px-6 py-4 whitespace-nowrap ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                        }`}
                      >
                        <span className="font-medium">{category.display_order}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              theme === 'dark'
                                ? 'bg-purple-900/30'
                                : 'bg-purple-100'
                            }`}
                          >
                            <FolderTree className="w-5 h-5 text-purple-500" />
                          </div>
                          <div>
                            <div
                              className={`font-medium ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {category.name}
                            </div>
                            <div
                              className={`text-sm ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              {category.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        <div className="max-w-md truncate">{category.description}</div>
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                        }`}
                      >
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-900/30 text-purple-400">
                          {category.agents_count}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(category)}
                            className={`p-2 rounded-lg transition-colors ${
                              theme === 'dark'
                                ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                            }`}
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(category)}
                            className={`p-2 rounded-lg transition-colors ${
                              theme === 'dark'
                                ? 'hover:bg-red-900/30 text-gray-400 hover:text-red-400'
                                : 'hover:bg-red-50 text-gray-600 hover:text-red-600'
                            }`}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className={`w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div
              className={`px-6 py-4 border-b ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3
                  className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Create New Category
                </h3>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700 text-gray-400'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateCategory} className="flex flex-col max-h-[calc(90vh-5rem)]">
              <div className="overflow-y-auto px-6 py-4 space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Category Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="e.g., Data Processing"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Slug *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Auto-generated from name"
                  />
                  <p
                    className={`text-xs mt-1 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                    }`}
                  >
                    URL-friendly identifier (auto-generated from name)
                  </p>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Brief description of this category"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Icon
                  </label>
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="e.g., database, brain, plug"
                  />
                  <p
                    className={`text-xs mt-1 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                    }`}
                  >
                    Icon identifier (lucide-react icon name)
                  </p>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="display_order"
                    value={formData.display_order}
                    onChange={handleInputChange}
                    min="1"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                  <p
                    className={`text-xs mt-1 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                    }`}
                  >
                    Order in which this category appears in lists
                  </p>
                </div>
              </div>

              <div
                className={`px-6 py-4 border-t flex items-center justify-end gap-3 ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className={`w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div
              className={`px-6 py-4 border-b ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3
                  className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Edit Category
                </h3>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700 text-gray-400'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdateCategory} className="flex flex-col max-h-[calc(90vh-5rem)]">
              <div className="overflow-y-auto px-6 py-4 space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Category Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Slug *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Icon
                  </label>
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="display_order"
                    value={formData.display_order}
                    onChange={handleInputChange}
                    min="1"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                </div>
              </div>

              <div
                className={`px-6 py-4 border-t flex items-center justify-end gap-3 ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium"
                >
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className={`w-full max-w-md rounded-2xl p-6 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Delete Category
            </h3>
            <p
              className={`mb-6 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Are you sure you want to delete the category{' '}
              <span className="font-semibold">{selectedCategory.name}</span>? This action
              cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedCategory(null);
                }}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCategory}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentCategoriesPage;
