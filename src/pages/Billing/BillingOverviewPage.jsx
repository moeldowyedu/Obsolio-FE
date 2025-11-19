import { useState } from 'react';
import {
  CreditCard,
  TrendingUp,
  Calendar,
  Download,
  AlertCircle,
} from 'lucide-react';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import MainLayout from '../../components/layout/MainLayout';

const BillingOverviewPage = () => {
  const [billingData] = useState({
    currentPlan: 'Professional',
    billingCycle: 'Monthly',
    nextBillingDate: '2025-12-01',
    currentUsage: {
      agents: 6,
      agentLimit: 20,
      taskExecutions: 4765,
      taskLimit: 10000,
      storage: 45.2,
      storageLimit: 100,
    },
    currentMonthCost: 299,
    lastMonthCost: 289,
    yearToDateCost: 3240,
  });

  return (
    <MainLayout>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Billing Overview</h1>
          <p className="text-secondary-600 mt-1">
            Manage your subscription and billing details
          </p>
        </div>
        <Button
          variant="outline"
          leftIcon={<Download className="w-5 h-5" />}
        >
          Download Invoice
        </Button>
      </div>

      {/* Current Plan */}
      <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primary-900 mb-2">
              {billingData.currentPlan} Plan
            </h2>
            <p className="text-primary-700 mb-4">
              {billingData.billingCycle} billing • Next payment: {new Date(billingData.nextBillingDate).toLocaleDateString()}
            </p>
            <div className="text-3xl font-bold text-primary-900">
              ${billingData.currentMonthCost}
              <span className="text-lg font-normal text-primary-700">/month</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Change Plan
            </Button>
            <Button variant="primary" size="sm">
              Upgrade
            </Button>
          </div>
        </div>
      </Card>

      {/* Usage Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <h3 className="text-sm font-medium text-secondary-600 mb-2">Active Agents</h3>
          <div className="flex items-end justify-between mb-2">
            <div className="text-3xl font-bold text-secondary-900">
              {billingData.currentUsage.agents}
            </div>
            <div className="text-sm text-secondary-600">
              of {billingData.currentUsage.agentLimit}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full"
              style={{ width: `${(billingData.currentUsage.agents / billingData.currentUsage.agentLimit) * 100}%` }}
            ></div>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-secondary-600 mb-2">Task Executions</h3>
          <div className="flex items-end justify-between mb-2">
            <div className="text-3xl font-bold text-secondary-900">
              {billingData.currentUsage.taskExecutions.toLocaleString()}
            </div>
            <div className="text-sm text-secondary-600">
              of {billingData.currentUsage.taskLimit.toLocaleString()}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${(billingData.currentUsage.taskExecutions / billingData.currentUsage.taskLimit) * 100}%` }}
            ></div>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-secondary-600 mb-2">Storage Used</h3>
          <div className="flex items-end justify-between mb-2">
            <div className="text-3xl font-bold text-secondary-900">
              {billingData.currentUsage.storage} GB
            </div>
            <div className="text-sm text-secondary-600">
              of {billingData.currentUsage.storageLimit} GB
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${(billingData.currentUsage.storage / billingData.currentUsage.storageLimit) * 100}%` }}
            ></div>
          </div>
        </Card>
      </div>

      {/* Billing Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-blue-700 mb-1">Current Month</div>
              <div className="text-2xl font-bold text-blue-900">
                ${billingData.currentMonthCost}
              </div>
            </div>
            <Calendar className="w-10 h-10 text-blue-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-green-700 mb-1">Last Month</div>
              <div className="text-2xl font-bold text-green-900">
                ${billingData.lastMonthCost}
              </div>
            </div>
            <TrendingUp className="w-10 h-10 text-green-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-purple-700 mb-1">Year to Date</div>
              <div className="text-2xl font-bold text-purple-900">
                ${billingData.yearToDateCost.toLocaleString()}
              </div>
            </div>
            <TrendingUp className="w-10 h-10 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Payment Method */}
      <Card>
        <h2 className="text-xl font-semibold text-secondary-900 mb-4">Payment Method</h2>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="font-medium text-secondary-900">Visa ending in 4242</p>
              <p className="text-sm text-secondary-600">Expires 12/2027</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Update
          </Button>
        </div>
      </Card>

      {/* Alerts */}
      <Card className="bg-yellow-50 border-yellow-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-1">Usage Alert</h3>
            <p className="text-sm text-yellow-800">
              You've used 47.65% of your monthly task execution limit. Consider upgrading your plan if you need more capacity.
            </p>
          </div>
        </div>
      </Card>
      </div>
    </MainLayout>
  );
};

export default BillingOverviewPage;
