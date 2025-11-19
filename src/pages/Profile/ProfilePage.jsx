import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState('general')
  const [isEditing, setIsEditing] = useState(false)

  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Solutions Inc.',
    jobTitle: 'Senior Developer',
    bio: 'Passionate about AI and machine learning. 5+ years of experience in software development.',
  })

  const [notifications, setNotifications] = useState({
    emailSubmission: true,
    emailEvaluation: true,
    emailWeekly: false,
    pushSubmission: true,
    pushEvaluation: true,
  })

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: '30',
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleNotificationChange = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    })
  }

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!')
    setIsEditing(false)
  }

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved!')
  }

  const handleSaveSecurity = () => {
    toast.success('Security settings updated!')
  }

  return (
    <MainLayout>
      <div className="py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-secondary-900 mb-2 font-heading">Profile Settings</h1>
          <p className="text-secondary-600">Manage your account settings and preferences</p>
        </div>

        {/* Profile Card with Avatar */}
        <div className="glass-card rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-5xl">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                <span className="material-icons text-primary-600 text-sm">edit</span>
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-secondary-900 mb-2">{formData.name}</h2>
              <p className="text-secondary-600 mb-1">{formData.jobTitle} at {formData.company}</p>
              <p className="text-primary-600 font-medium">{formData.email}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                  <span className="material-icons text-xs mr-1">verified</span>
                  Verified
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                  <span className="material-icons text-xs mr-1">workspace_premium</span>
                  Pro Member
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-5 text-center">
            <div className="text-3xl font-bold text-secondary-900">124</div>
            <div className="text-sm text-secondary-600 mt-1">Total Submissions</div>
          </div>
          <div className="glass-card rounded-2xl p-5 text-center">
            <div className="text-3xl font-bold text-green-600">98</div>
            <div className="text-sm text-secondary-600 mt-1">Completed</div>
          </div>
          <div className="glass-card rounded-2xl p-5 text-center">
            <div className="text-3xl font-bold text-primary-600">87.5</div>
            <div className="text-sm text-secondary-600 mt-1">Avg. Score</div>
          </div>
          <div className="glass-card rounded-2xl p-5 text-center">
            <div className="text-3xl font-bold text-secondary-900">156</div>
            <div className="text-sm text-secondary-600 mt-1">Days Active</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('general')}
                className={`px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'general'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center">
                  <span className="material-icons text-sm mr-2">person</span>
                  General
                </span>
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'notifications'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center">
                  <span className="material-icons text-sm mr-2">notifications</span>
                  Notifications
                </span>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'security'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center">
                  <span className="material-icons text-sm mr-2">security</span>
                  Security
                </span>
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={`px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'billing'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center">
                  <span className="material-icons text-sm mr-2">payment</span>
                  Billing
                </span>
              </button>
            </nav>
          </div>

          <div className="p-8">
            {/* General Tab */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-secondary-900">Personal Information</h3>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="glass-btn-secondary rounded-lg px-4 py-2 flex items-center"
                    >
                      <span className="material-icons text-sm mr-2">edit</span>
                      Edit Profile
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-800 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="glass-input w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-800 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="glass-input w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-800 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="glass-input w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-800 mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="glass-input w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-800 mb-2">Job Title</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="glass-input w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-800 mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows="4"
                    className="glass-input w-full resize-none"
                  />
                </div>

                {isEditing && (
                  <div className="flex items-center justify-end space-x-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="glass-btn-secondary rounded-lg px-6 py-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="glass-btn-primary rounded-lg px-6 py-2"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-secondary-900 mb-6">Notification Preferences</h3>

                <div className="space-y-4">
                  <div className="glass-card rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-secondary-900 mb-4">Email Notifications</h4>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-secondary-900">New Submission</p>
                          <p className="text-sm text-secondary-600">Get notified when a new submission is created</p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('emailSubmission')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.emailSubmission ? 'bg-primary-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.emailSubmission ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-secondary-900">Evaluation Complete</p>
                          <p className="text-sm text-secondary-600">Get notified when an evaluation is completed</p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('emailEvaluation')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.emailEvaluation ? 'bg-primary-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.emailEvaluation ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-secondary-900">Weekly Summary</p>
                          <p className="text-sm text-secondary-600">Receive a weekly summary of your activity</p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('emailWeekly')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.emailWeekly ? 'bg-primary-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.emailWeekly ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-secondary-900 mb-4">Push Notifications</h4>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-secondary-900">Submission Updates</p>
                          <p className="text-sm text-secondary-600">Push notifications for submission status changes</p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('pushSubmission')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.pushSubmission ? 'bg-primary-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.pushSubmission ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-secondary-900">Evaluation Results</p>
                          <p className="text-sm text-secondary-600">Push notifications when results are ready</p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('pushEvaluation')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.pushEvaluation ? 'bg-primary-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.pushEvaluation ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNotifications}
                    className="glass-btn-primary rounded-lg px-6 py-2"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-secondary-900 mb-6">Security Settings</h3>

                <div className="glass-card rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-secondary-900 mb-4">Password</h4>
                  <p className="text-secondary-600 mb-4">Change your password to keep your account secure</p>
                  <button className="glass-btn-secondary rounded-lg px-6 py-2">
                    Change Password
                  </button>
                </div>

                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-secondary-900 mb-2">Two-Factor Authentication</h4>
                      <p className="text-secondary-600">Add an extra layer of security to your account</p>
                    </div>
                    <button
                      onClick={() => setSecurity({ ...security, twoFactor: !security.twoFactor })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        security.twoFactor ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          security.twoFactor ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-secondary-900 mb-4">Active Sessions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="material-icons text-green-600 mr-3">laptop</span>
                        <div>
                          <p className="font-medium text-secondary-900">Current Session</p>
                          <p className="text-sm text-secondary-600">Chrome on MacOS • New York, USA</p>
                        </div>
                      </div>
                      <span className="text-xs text-green-600 font-semibold">Active Now</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveSecurity}
                    className="glass-btn-primary rounded-lg px-6 py-2"
                  >
                    Save Security Settings
                  </button>
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-secondary-900 mb-6">Billing & Subscription</h3>

                <div className="glass-card rounded-xl p-6 border-2 border-primary-400">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-2xl font-bold text-secondary-900">Pro Plan</h4>
                      <p className="text-secondary-600">300 evaluations/month</p>
                    </div>
                    <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Active
                    </span>
                  </div>
                  <div className="flex items-end space-x-2 mb-4">
                    <span className="text-4xl font-bold text-secondary-900">$250</span>
                    <span className="text-secondary-600 mb-1">/month</span>
                  </div>
                  <button className="w-full glass-btn-secondary rounded-lg py-3">
                    Manage Subscription
                  </button>
                </div>

                <div className="glass-card rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-secondary-900 mb-4">Payment Method</h4>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                    <div className="flex items-center">
                      <span className="material-icons text-secondary-600 mr-3">credit_card</span>
                      <div>
                        <p className="font-medium text-secondary-900">•••• •••• •••• 4242</p>
                        <p className="text-sm text-secondary-600">Expires 12/25</p>
                      </div>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                      Edit
                    </button>
                  </div>
                  <button className="glass-btn-secondary rounded-lg px-6 py-2">
                    Add Payment Method
                  </button>
                </div>

                <div className="glass-card rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-secondary-900 mb-4">Billing History</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-secondary-900">December 2025</p>
                        <p className="text-sm text-secondary-600">Paid on Dec 1, 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-secondary-900">$250.00</p>
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
                          Download
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-secondary-900">November 2025</p>
                        <p className="text-sm text-secondary-600">Paid on Nov 1, 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-secondary-900">$250.00</p>
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default ProfilePage
