import { Table, Badge, Button } from '../../common';
import { Download, Eye } from 'lucide-react';

const Invoices = ({ invoices = [] }) => {
  const handleDownload = (invoiceId) => {
    // In real app, trigger download
    console.log('Download invoice:', invoiceId);
  };

  const handleView = (invoiceId) => {
    // In real app, open invoice viewer
    console.log('View invoice:', invoiceId);
  };

  const getStatusVariant = (status) => {
    const variants = {
      paid: 'success',
      pending: 'warning',
      failed: 'danger',
      refunded: 'default',
    };
    return variants[status] || 'default';
  };

  const columns = [
    {
      key: 'invoiceNumber',
      label: 'Invoice #',
      render: (value) => (
        <span className="font-mono text-sm font-medium">{value}</span>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'description',
      label: 'Description',
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (value) => (
        <span className="font-semibold text-secondary-900">${value.toFixed(2)}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge variant={getStatusVariant(value)} size="sm">
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, invoice) => (
        <div className="flex items-center gap-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleView(invoice.id);
            }}
            variant="ghost"
            size="sm"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleDownload(invoice.id);
            }}
            variant="ghost"
            size="sm"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-secondary-900">
            Billing History
          </h3>
          <p className="text-sm text-secondary-600">
            View and download your past invoices
          </p>
        </div>
      </div>

      <Table
        columns={columns}
        data={invoices}
        sortable
        pagination
        pageSize={10}
      />
    </div>
  );
};

export default Invoices;
