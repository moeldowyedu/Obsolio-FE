import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import toast from 'react-hot-toast'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../translations'

const UserManagementPage = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      plan: 'Premium',
      submissions: 45,
      avgScore: 87,
      joined: '2025-01-15',
      lastActive: '2025-11-05'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      status: 'active',
      plan: 'Premium',
      submissions: 38,
      avgScore: 91,
      joined: '2025-02-20',
      lastActive: '2025-11-04'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike@example.com',
      role: 'user',
      status: 'active',
      plan: 'Free',
      submissions: 32,
      avgScore: 85,
      joined: '2025-03-10',
      lastActive: '2025-11-03'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'admin',
      status: 'active',
      plan: 'Premium',
      submissions: 28,
      avgScore: 89,
      joined: '2025-01-05',
      lastActive: '2025-11-05'
    },
    {
      id: 5,
      name: 'Tom Wilson',
      email: 'tom@example.com',
      role: 'user',
      status: 'suspended',
      plan: 'Free',
      submissions: 24,
      avgScore: 83,
      joined: '2025-04-01',
      lastActive: '2025-10-20'
    },
  ])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleSuspendUser = (userId) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'suspended' } : u))
    toast.success(t.userSuspendedSuccess)
  }

  const handleActivateUser = (userId) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'active' } : u))
    toast.success(t.userActivatedSuccess)
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm(t.deleteUserConfirmation)) {
      setUsers(prev => prev.filter(u => u.id !== userId))
      toast.success(t.userDeletedSuccess)
    }
  }

  const getStatusBadge = (status) => {
    const configs = {
      active: { bg: 'bg-green-100', text: 'text-green-800', icon: 'check_circle' },
      suspended: { bg: 'bg-red-100', text: 'text-red-800', icon: 'block' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: 'schedule' },
    }
    const config = configs[status] || configs.active
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        <span className="material-icons text-xs mr-1">{config.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const stats = [
    { label: t.totalUsersLabel, value: users.length, icon: 'people', color: 'blue' },
    { label: t.activeUsersLabel, value: users.filter(u => u.status === 'active').length, icon: 'check_circle', color: 'green' },
    { label: t.premiumUsersLabel, value: users.filter(u => u.plan === 'Premium').length, icon: 'star', color: 'yellow' },
    { label: t.suspendedLabel, value: users.filter(u => u.status === 'suspended').length, icon: 'block', color: 'red' },
  ]

  return (
    <MainLayout>
      <div className="py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-secondary-900 mb-2 font-heading">{t.userManagementTitle}</h1>
            <p className="text-secondary-600">{t.userManagementDesc}</p>
          </div>
          <button className="glass-btn-primary rounded-xl px-6 py-3 font-semibold inline-flex items-center mt-4 md:mt-0">
            <span className="material-icons mr-2">person_add</span>
            {t.addNewUserButton}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card rounded-2xl p-6">
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 flex items-center justify-center mb-4`}>
                <span className={`material-icons text-${stat.color}-600 text-xl`}>{stat.icon}</span>
              </div>
              <div className="text-3xl font-bold text-secondary-900 mb-1">{stat.value}</div>
              <div className="text-sm text-secondary-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                <input
                  type="text"
                  placeholder={t.searchUsersPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input w-full pl-10"
                />
              </div>
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="glass-input"
            >
              <option value="all">{t.allRolesOption}</option>
              <option value="user">{t.userRoleOption}</option>
              <option value="admin">{t.adminRoleOption}</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="glass-input"
            >
              <option value="all">{t.allStatusOption}</option>
              <option value="active">{t.activeStatusOption}</option>
              <option value="suspended">{t.suspendedStatusOption}</option>
              <option value="pending">{t.pendingStatusOption}</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-bold text-secondary-700 uppercase">{t.tableHeaderUser}</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-secondary-700 uppercase">{t.tableHeaderRole}</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-secondary-700 uppercase">{t.tableHeaderPlan}</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-secondary-700 uppercase">{t.tableHeaderStatus}</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-secondary-700 uppercase">{t.tableHeaderSubmissions}</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-secondary-700 uppercase">{t.tableHeaderAvgScore}</th>
                  <th className="text-right py-4 px-6 text-xs font-bold text-secondary-700 uppercase">{t.tableHeaderActions}</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-gray-500">
                      {t.noUsersFoundMessage}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="py-5 px-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                            <span className="text-primary-600 font-semibold text-lg">{user.name[0]}</span>
                          </div>
                          <div>
                            <div className="font-semibold text-secondary-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role === 'admin' && <span className="material-icons text-xs mr-1">shield</span>}
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          user.plan === 'Premium' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.plan === 'Premium' && <span className="material-icons text-xs mr-1">star</span>}
                          {user.plan}
                        </span>
                      </td>
                      <td className="py-5 px-6">{getStatusBadge(user.status)}</td>
                      <td className="py-5 px-6">
                        <span className="font-semibold text-secondary-900">{user.submissions}</span>
                      </td>
                      <td className="py-5 px-6">
                        <span className="text-primary-600 font-bold">{user.avgScore}</span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center justify-end space-x-2">
                          {user.status === 'active' ? (
                            <button
                              onClick={() => handleSuspendUser(user.id)}
                              className="text-red-600 hover:text-red-700 p-2"
                              title="Suspend User"
                            >
                              <span className="material-icons text-sm">block</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleActivateUser(user.id)}
                              className="text-green-600 hover:text-green-700 p-2"
                              title="Activate User"
                            >
                              <span className="material-icons text-sm">check_circle</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-700 p-2"
                            title="Delete User"
                          >
                            <span className="material-icons text-sm">delete</span>
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
    </MainLayout>
  )
}

export default UserManagementPage
