import { useState, useEffect, useRef } from 'react';
import { Bell, DollarSign, MessageCircle, Download, Star, AlertCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotificationBell = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock recent notifications
    const mockNotifications = [
      {
        id: '1',
        type: 'sale',
        icon: DollarSign,
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        title: 'New Sale',
        message: 'TechCorp Inc purchased your agent',
        timestamp: '2m ago',
        isRead: false
      },
      {
        id: '2',
        type: 'message',
        icon: MessageCircle,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        title: 'New Message',
        message: 'LegalTech Corp sent you a message',
        timestamp: '15m ago',
        isRead: false
      },
      {
        id: '3',
        type: 'deployment',
        icon: Download,
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        title: 'Agent Deployed',
        message: 'Customer Support Pro deployed',
        timestamp: '1h ago',
        isRead: true
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const viewAllNotifications = () => {
    setShowDropdown(false);
    navigate('/notifications');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-6 h-6 text-secondary-600" />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
            <h3 className="font-bold text-secondary-900">Notifications</h3>
            <button
              onClick={() => setShowDropdown(false)}
              className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-secondary-600" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.slice(0, 5).map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !notification.isRead ? 'bg-primary-50/50' : ''
                    }`}
                    onClick={() => {
                      markAsRead(notification.id);
                      viewAllNotifications();
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg ${notification.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${notification.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-secondary-900">{notification.title}</h4>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary-600 rounded-full mt-1 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-secondary-600 line-clamp-1 mb-1">{notification.message}</p>
                        <span className="text-xs text-gray-500">{notification.timestamp}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-secondary-600">No notifications</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
              <button
                onClick={viewAllNotifications}
                className="w-full text-center text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                View All Notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
