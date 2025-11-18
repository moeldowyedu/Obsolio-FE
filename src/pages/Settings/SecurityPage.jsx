import { Shield, Lock, Key, Eye, AlertTriangle } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Badge from '../../components/common/Badge/Badge';

const SecurityPage = () => {
  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Settings</h1>
          <p className="text-gray-600">
            Manage your account security and authentication settings
          </p>
        </div>

        {/* Password & Authentication */}
        <Card className="mb-6">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">Password & Authentication</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-medium text-gray-900">Password</h3>
                  <p className="text-sm text-gray-600">Last changed 30 days ago</p>
                </div>
                <Button size="sm" variant="outline">Change Password</Button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-medium text-gray-900">Two-Factor Authentication (2FA)</h3>
                  <p className="text-sm text-gray-600">Add an extra layer of security</p>
                </div>
                <Badge color="gray">Not Enabled</Badge>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Social Login</h3>
                  <p className="text-sm text-gray-600">Google, LinkedIn connected</p>
                </div>
                <Button size="sm" variant="outline">Manage</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* API Access */}
        <Card className="mb-6">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Key className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">API Access</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-medium text-gray-900">API Keys</h3>
                  <p className="text-sm text-gray-600">2 active API keys</p>
                </div>
                <Button size="sm" variant="outline">View Keys</Button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">IP Whitelist</h3>
                  <p className="text-sm text-gray-600">Restrict API access by IP</p>
                </div>
                <Badge color="gray">Not Configured</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Session Management */}
        <Card className="mb-6">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">Active Sessions</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-medium text-gray-900">Current Session</h3>
                  <p className="text-sm text-gray-600">Chrome on macOS • 192.168.1.1</p>
                  <p className="text-xs text-gray-500 mt-1">Active now</p>
                </div>
                <Badge color="green">Active</Badge>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Previous Session</h3>
                  <p className="text-sm text-gray-600">Firefox on Windows • 192.168.1.5</p>
                  <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                </div>
                <Button size="sm" variant="outline">Revoke</Button>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full">
                Sign Out All Other Sessions
              </Button>
            </div>
          </div>
        </Card>

        {/* Security Alerts */}
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              <h2 className="text-xl font-semibold text-gray-900">Security Alerts</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-medium text-gray-900">Email Alerts</h3>
                  <p className="text-sm text-gray-600">Get notified of security events</p>
                </div>
                <Badge color="green">Enabled</Badge>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Login Notifications</h3>
                  <p className="text-sm text-gray-600">Alert on new device logins</p>
                </div>
                <Badge color="green">Enabled</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SecurityPage;
