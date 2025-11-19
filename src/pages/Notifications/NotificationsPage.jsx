import { useState, useEffect } from 'react';
import { Bell, Check, CheckCheck, Trash2, Filter, DollarSign, MessageCircle, Download, Star, AlertCircle, TrendingUp, Users, Settings, ShoppingCart } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('all');

  useEffect(() => {
    // Mock notifications data
    const mockNotifications = [
      {
        id: '1',
        type: 'sale',
        icon: DollarSign,
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        title: 'New Sale',
        message: 'TechCorp Inc purchased your Customer Support Pro agent',
        amount: '$99',
        timestamp: '2 minutes ago',
        isRead: false,
        link: '/agentx/monetization'
      },
      {
        id: '2',
        type: 'message',
        icon: MessageCircle,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        title: 'New Message',
        message: 'LegalTech Corp sent you a message about Legal Document Analyzer',
        timestamp: '15 minutes ago',
        isRead: false,
        link: '/chat'
      },
      {
        id: '3',
        type: 'deployment',
        icon: Download,
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        title: 'Agent Deployed',
        message: 'Your Customer Support Pro was successfully deployed',
        timestamp: '1 hour ago',
        isRead: true,
        link: '/agents'
      },
      {
        id: '4',
        type: 'review',
        icon: Star,
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-600',
        title: 'New Review',
        message: 'StartupXYZ left a 5-star review on your agent',
        rating: 5,
        timestamp: '2 hours ago',
        isRead: true,
        link: '/agentx/monetization'
      },
      {
        id: '5',
        type: 'sale',
        icon: DollarSign,
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        title: 'Yearly Subscription',
        message: 'Enterprise Co purchased yearly subscription',
        amount: '$990',
        timestamp: '3 hours ago',
        isRead: true,
        link: '/agentx/monetization'
      },
      {
        id: '6',
        type: 'message',
        icon: MessageCircle,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        title: 'New Message',
        message: 'SalesPro Inc responded to your inquiry',
        timestamp: '5 hours ago',
        isRead: true,
        link: '/chat'
      },
      {
        id: '7',
        type: 'system',
        icon: AlertCircle,
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-600',
        title: 'System Update',
        message: 'Scheduled maintenance on Feb 1st, 2025 at 2:00 AM EST',
        timestamp: '1 day ago',
        isRead: true,
        link: null
      },
      {
        id: '8',
        type: 'analytics',
        icon: TrendingUp,
        iconBg: 'bg-teal-100',
        iconColor: 'text-teal-600',
        title: 'Monthly Report',
        message: 'Your January performance report is ready',
        timestamp: '2 days ago',
        isRead: true,
        link: '/analytics'
      },
      {
        id: '9',
        type: 'team',
        icon: Users,
        iconBg: 'bg-indigo-100',
        iconColor: 'text-indigo-600',
        title: 'Team Invitation',
        message: 'You were added to the Marketing Team workspace',
        timestamp: '3 days ago',
        isRead: true,
        link: '/settings/team'
      },
      {
        id: '10',
        type: 'deployment',
        icon: Download,
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        title: 'Agent Update Available',
        message: 'New version of Financial Audit Bot is ready to deploy',
        timestamp: '1 week ago',
        isRead: true,
        link: '/agents'
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  const tabs = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.isRead).length },
    { id: 'sale', label: 'Sales', count: notifications.filter(n => n.type === 'sale').length },
    { id: 'message', label: 'Messages', count: notifications.filter(n => n.type === 'message').length },
    { id: 'deployment', label: 'Deployments', count: notifications.filter(n => n.type === 'deployment').length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'unread') return !notification.isRead;
    return notification.type === selectedTab;
  });

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <MainLayout showSidebar={true}>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-secondary-900 tracking-tight">Notifications</h1>
                <p className="text-secondary-600 font-medium">
                  {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-secondary-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <CheckCheck className="w-4 h-4" />
                  Mark all as read
                </button>
              )}
              <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-secondary-700 hover:bg-gray-50 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <div className="flex items-center gap-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                    selectedTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-secondary-600 hover:text-secondary-900 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span
                      className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                        selectedTab === tab.id
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-xl border transition-all ${
                    notification.isRead
                      ? 'border-gray-200 hover:shadow-md'
                      : 'border-primary-200 bg-primary-50/30 hover:shadow-lg'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl ${notification.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-6 h-6 ${notification.iconColor}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm font-bold text-secondary-900">{notification.title}</h3>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-primary-600 rounded-full" />
                              )}
                            </div>
                            <p className="text-sm text-secondary-700 leading-relaxed">{notification.message}</p>

                            {notification.amount && (
                              <div className="mt-2 inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-lg font-bold text-sm">
                                {notification.amount}
                              </div>
                            )}

                            {notification.rating && (
                              <div className="mt-2 flex items-center gap-1">
                                {[...Array(notification.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            )}
                          </div>

                          <span className="text-xs text-gray-500 whitespace-nowrap">{notification.timestamp}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 mt-3">
                          {notification.link && (
                            <button className="px-3 py-1.5 bg-primary-600 text-white rounded-lg font-medium text-xs hover:bg-primary-700 transition-colors">
                              View Details
                            </button>
                          )}
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="px-3 py-1.5 border border-gray-300 rounded-lg font-medium text-xs text-secondary-700 hover:bg-gray-50 transition-colors flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" />
                              Mark as read
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="ml-auto p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete notification"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">No notifications</h3>
              <p className="text-secondary-600">
                {selectedTab === 'all'
                  ? 'You don\'t have any notifications yet'
                  : `No ${selectedTab} notifications`}
              </p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {selectedTab === 'all' && notifications.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-secondary-600 font-medium">Sales Today</div>
                  <div className="text-xl font-bold text-secondary-900">
                    {notifications.filter(n => n.type === 'sale' && n.timestamp.includes('hour')).length}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-secondary-600 font-medium">Unread Messages</div>
                  <div className="text-xl font-bold text-secondary-900">
                    {notifications.filter(n => n.type === 'message' && !n.isRead).length}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-secondary-600 font-medium">Active Deployments</div>
                  <div className="text-xl font-bold text-secondary-900">
                    {notifications.filter(n => n.type === 'deployment').length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default NotificationsPage;
