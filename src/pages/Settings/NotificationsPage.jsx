import { Bell, Mail, MessageSquare, Calendar, Check } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';

const NotificationsPage = () => {
  const notificationSettings = [
    {
      category: 'Agent Activity',
      icon: <Bell className="w-5 h-5" />,
      notifications: [
        { name: 'Agent Execution Complete', email: true, push: true, sms: false },
        { name: 'Agent Execution Failed', email: true, push: true, sms: true },
        { name: 'Agent Deployed', email: true, push: false, sms: false },
        { name: 'Agent Paused', email: false, push: true, sms: false }
      ]
    },
    {
      category: 'Approvals & HITL',
      icon: <Check className="w-5 h-5" />,
      notifications: [
        { name: 'Approval Required', email: true, push: true, sms: true },
        { name: 'Approval Approved', email: true, push: false, sms: false },
        { name: 'Approval Rejected', email: true, push: true, sms: false }
      ]
    },
    {
      category: 'Billing & Usage',
      icon: <Mail className="w-5 h-5" />,
      notifications: [
        { name: 'Monthly Invoice', email: true, push: false, sms: false },
        { name: 'Payment Failed', email: true, push: true, sms: true },
        { name: 'Usage Limit Warning', email: true, push: true, sms: false },
        { name: 'Plan Upgrade Available', email: true, push: false, sms: false }
      ]
    },
    {
      category: 'System Updates',
      icon: <MessageSquare className="w-5 h-5" />,
      notifications: [
        { name: 'New Features', email: true, push: false, sms: false },
        { name: 'Maintenance Scheduled', email: true, push: true, sms: false },
        { name: 'Security Updates', email: true, push: true, sms: true }
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Notification Settings</h1>
          <p className="text-secondary-600">
            Manage how you receive notifications and alerts
          </p>
        </div>

        {/* Notification Preferences Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="p-6">
              <Mail className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-1">Email</h3>
              <p className="text-sm text-secondary-600">12 active</p>
              <Badge color="green" className="mt-2">Enabled</Badge>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <Bell className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-1">Push</h3>
              <p className="text-sm text-secondary-600">8 active</p>
              <Badge color="green" className="mt-2">Enabled</Badge>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <MessageSquare className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-1">SMS</h3>
              <p className="text-sm text-secondary-600">3 active</p>
              <Badge color="yellow" className="mt-2">Limited</Badge>
            </div>
          </Card>
        </div>

        {/* Notification Categories */}
        <div className="space-y-6">
          {notificationSettings.map((category, idx) => (
            <Card key={idx}>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-primary-600">
                    {category.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-secondary-900">{category.category}</h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-secondary-700">Notification Type</th>
                        <th className="text-center py-3 px-4 font-semibold text-secondary-700">Email</th>
                        <th className="text-center py-3 px-4 font-semibold text-secondary-700">Push</th>
                        <th className="text-center py-3 px-4 font-semibold text-secondary-700">SMS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.notifications.map((notif, notifIdx) => (
                        <tr key={notifIdx} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-secondary-900">{notif.name}</td>
                          <td className="py-3 px-4 text-center">
                            <input
                              type="checkbox"
                              checked={notif.email}
                              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                              readOnly
                            />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <input
                              type="checkbox"
                              checked={notif.push}
                              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                              readOnly
                            />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <input
                              type="checkbox"
                              checked={notif.sms}
                              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                              readOnly
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quiet Hours */}
        <Card className="mt-6">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-secondary-900">Quiet Hours</h2>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-secondary-900">Do Not Disturb</h3>
                <p className="text-sm text-secondary-600">Pause non-urgent notifications during these hours</p>
              </div>
              <div className="flex items-center gap-4">
                <select className="px-3 py-2 border border-gray-300 rounded-lg">
                  <option>10:00 PM</option>
                  <option>11:00 PM</option>
                  <option>12:00 AM</option>
                </select>
                <span className="text-secondary-600">to</span>
                <select className="px-3 py-2 border border-gray-300 rounded-lg">
                  <option>6:00 AM</option>
                  <option>7:00 AM</option>
                  <option>8:00 AM</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default NotificationsPage;
