import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { Link } from 'react-router-dom'

const NotificationsPage = () => {
  const [filter, setFilter] = useState('all')
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'evaluation_complete',
      title: 'Evaluation Completed',
      message: 'Machine Learning Model Assessment has been completed with a score of 92/100',
      timestamp: '2025-11-05T14:30:00',
      read: false,
      icon: 'check_circle',
      color: 'green',
      link: '/submissions/1',
      actionText: 'View Results'
    },
    {
      id: 2,
      type: 'submission_created',
      title: 'New Submission Created',
      message: 'Your submission "Legal Document Review" has been created and is pending evaluation',
      timestamp: '2025-11-05T09:15:00',
      read: false,
      icon: 'upload_file',
      color: 'blue',
      link: '/submissions/2',
      actionText: 'View Submission'
    },
    {
      id: 3,
      type: 'criteria_updated',
      title: 'Evaluation Criteria Updated',
      message: 'The default rubric for Education industry has been updated with new scoring guidelines',
      timestamp: '2025-11-04T16:45:00',
      read: true,
      icon: 'tune',
      color: 'purple',
      link: '/criteria',
      actionText: 'View Criteria'
    },
    {
      id: 4,
      type: 'report_generated',
      title: 'AI Report Generated',
      message: 'Comprehensive evaluation report is now available for Educational Content Evaluation',
      timestamp: '2025-11-04T11:20:00',
      read: true,
      icon: 'description',
      color: 'orange',
      link: '/evaluations/3/report',
      actionText: 'Download Report'
    },
    {
      id: 5,
      type: 'processing',
      title: 'Processing Started',
      message: 'Healthcare Compliance Review is now being processed by our AI agents',
      timestamp: '2025-11-04T08:00:00',
      read: true,
      icon: 'hourglass_empty',
      color: 'yellow',
      link: '/submissions/5',
      actionText: 'View Status'
    },
    {
      id: 6,
      type: 'failed',
      title: 'Evaluation Failed',
      message: 'Mobile App Code Review failed due to unsupported file format. Please resubmit with valid files',
      timestamp: '2025-11-03T15:30:00',
      read: true,
      icon: 'error',
      color: 'red',
      link: '/submissions/7',
      actionText: 'View Details'
    },
    {
      id: 7,
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on Nov 10, 2025 from 2:00 AM - 4:00 AM EST',
      timestamp: '2025-11-03T10:00:00',
      read: true,
      icon: 'build',
      color: 'gray',
      link: null,
      actionText: null
    },
    {
      id: 8,
      type: 'evaluation_complete',
      title: 'Evaluation Completed',
      message: 'Marketing Presentation Analysis completed with a score of 85/100',
      timestamp: '2025-11-02T13:45:00',
      read: true,
      icon: 'check_circle',
      color: 'green',
      link: '/submissions/4',
      actionText: 'View Results'
    },
  ])

  const filterOptions = [
    { value: 'all', label: 'All Notifications', icon: 'notifications' },
    { value: 'unread', label: 'Unread', icon: 'mark_email_unread' },
    { value: 'evaluation_complete', label: 'Completed', icon: 'check_circle' },
    { value: 'processing', label: 'Processing', icon: 'hourglass_empty' },
    { value: 'failed', label: 'Failed', icon: 'error' },
    { value: 'system', label: 'System', icon: 'build' },
  ]

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notif.read
    return notif.type === filter
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} minutes ago`
    if (diffHours < 24) return `${diffHours} hours ago`
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  return (
    <MainLayout>
      <div className="py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 font-heading">Notifications</h1>
            <p className="text-gray-600">
              Stay updated with your evaluation activity
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800">
                  {unreadCount} unread
                </span>
              )}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="glass-btn-secondary rounded-xl px-4 py-2 mt-4 md:mt-0 inline-flex items-center text-sm font-semibold"
            >
              <span className="material-icons text-sm mr-2">done_all</span>
              Mark All as Read
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Filters</h2>
              <div className="space-y-2">
                {filterOptions.map((option) => {
                  const count = option.value === 'all'
                    ? notifications.length
                    : option.value === 'unread'
                    ? unreadCount
                    : notifications.filter(n => n.type === option.value).length

                  return (
                    <button
                      key={option.value}
                      onClick={() => setFilter(option.value)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                        filter === option.value
                          ? 'bg-primary-100 text-primary-800 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-3">{option.icon}</span>
                        <span className="text-sm">{option.label}</span>
                      </div>
                      {count > 0 && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          filter === option.value
                            ? 'bg-primary-200'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {count}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="glass-card rounded-2xl p-12 text-center">
                  <span className="material-icons text-6xl text-gray-300 mb-4">notifications_off</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No notifications</h3>
                  <p className="text-gray-600">
                    {filter === 'unread'
                      ? "You're all caught up! No unread notifications."
                      : 'No notifications match your current filter.'}
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`glass-card rounded-2xl p-6 transition-all ${
                      !notification.read ? 'ring-2 ring-primary-200 bg-primary-50/30' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl bg-${notification.color}-100 flex items-center justify-center flex-shrink-0`}>
                        <span className={`material-icons text-${notification.color}-600`}>
                          {notification.icon}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h3 className="text-lg font-bold text-gray-900">{notification.title}</h3>
                              {!notification.read && (
                                <span className="ml-2 w-2 h-2 rounded-full bg-primary-600"></span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xs text-gray-500 flex items-center">
                            <span className="material-icons text-xs mr-1">schedule</span>
                            {formatTimestamp(notification.timestamp)}
                          </span>

                          <div className="flex items-center space-x-2">
                            {notification.link && notification.actionText && (
                              <Link
                                to={notification.link}
                                onClick={() => markAsRead(notification.id)}
                                className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center"
                              >
                                {notification.actionText}
                                <span className="material-icons text-sm ml-1">arrow_forward</span>
                              </Link>
                            )}
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-gray-600 hover:text-gray-800 text-sm flex items-center"
                                title="Mark as read"
                              >
                                <span className="material-icons text-sm">done</span>
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-red-600 hover:text-red-700 text-sm"
                              title="Delete"
                            >
                              <span className="material-icons text-sm">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Load More */}
            {filteredNotifications.length > 0 && (
              <div className="mt-6 text-center">
                <button className="glass-btn-secondary rounded-xl px-6 py-3 font-semibold">
                  Load More Notifications
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default NotificationsPage
