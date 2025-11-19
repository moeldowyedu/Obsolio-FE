import { Download, Eye } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Badge from '../../components/common/Badge/Badge';

const InvoicesPage = () => {
  const invoices = [
    {
      id: 'INV-2024-001',
      date: '2024-01-15',
      amount: '$99.00',
      status: 'paid',
      period: 'Jan 1 - Jan 31, 2024'
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-15',
      amount: '$99.00',
      status: 'paid',
      period: 'Dec 1 - Dec 31, 2023'
    },
    {
      id: 'INV-2023-011',
      date: '2023-11-15',
      amount: '$99.00',
      status: 'paid',
      period: 'Nov 1 - Nov 30, 2023'
    },
    {
      id: 'INV-2023-010',
      date: '2023-10-15',
      amount: '$99.00',
      status: 'paid',
      period: 'Oct 1 - Oct 31, 2023'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      paid: 'green',
      pending: 'yellow',
      overdue: 'red'
    };
    return colors[status] || 'gray';
  };

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Invoices</h1>
          <p className="text-secondary-600">
            View and download your billing invoices
          </p>
        </div>

        <Card>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-secondary-900">Invoice ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-secondary-900">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-secondary-900">Period</th>
                    <th className="text-left py-3 px-4 font-semibold text-secondary-900">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-secondary-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-secondary-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <code className="text-sm font-mono text-secondary-900">{invoice.id}</code>
                      </td>
                      <td className="py-4 px-4 text-secondary-700">{invoice.date}</td>
                      <td className="py-4 px-4 text-secondary-700">{invoice.period}</td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-secondary-900">{invoice.amount}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge color={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" icon={<Eye className="w-4 h-4" />}>
                            View
                          </Button>
                          <Button size="sm" variant="outline" icon={<Download className="w-4 h-4" />}>
                            Download
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default InvoicesPage;
