import { useState } from 'react';
import {
  Plus,
  Building2,
  MapPin,
  Users,
  Edit,
  Trash2,
  Search,
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';

const BranchesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [branches] = useState([
    {
      id: 1,
      name: 'Headquarters',
      location: 'New York, NY',
      address: '123 Main Street, New York, NY 10001',
      departments: 8,
      employees: 245,
      status: 'active',
      manager: 'John Smith',
    },
    {
      id: 2,
      name: 'West Coast Office',
      location: 'San Francisco, CA',
      address: '456 Market Street, San Francisco, CA 94102',
      departments: 5,
      employees: 150,
      status: 'active',
      manager: 'Sarah Johnson',
    },
    {
      id: 3,
      name: 'European Hub',
      location: 'London, UK',
      address: '789 Oxford Street, London, W1D 2HG',
      departments: 6,
      employees: 180,
      status: 'active',
      manager: 'James Wilson',
    },
  ]);

  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Branches</h1>
          <p className="text-secondary-600 mt-1">
            Manage your organization's branch locations
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-5 h-5" />}>
          Add Branch
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-900">{branches.length}</div>
              <div className="text-sm text-blue-700">Total Branches</div>
            </div>
            <Building2 className="w-10 h-10 text-blue-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-900">
                {branches.reduce((sum, b) => sum + b.employees, 0)}
              </div>
              <div className="text-sm text-green-700">Total Employees</div>
            </div>
            <Users className="w-10 h-10 text-green-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-900">
                {branches.reduce((sum, b) => sum + b.departments, 0)}
              </div>
              <div className="text-sm text-purple-700">Total Departments</div>
            </div>
            <Building2 className="w-10 h-10 text-purple-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-900">
                {branches.filter((b) => b.status === 'active').length}
              </div>
              <div className="text-sm text-orange-700">Active Branches</div>
            </div>
            <MapPin className="w-10 h-10 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <Input
          placeholder="Search branches by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<Search className="w-5 h-5" />}
          fullWidth
        />
      </Card>

      {/* Branches List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredBranches.map((branch) => (
          <Card key={branch.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-8 h-8 text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-secondary-900">
                      {branch.name}
                    </h3>
                    <Badge className="bg-green-100 text-green-700">
                      {branch.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-secondary-600">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {branch.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Manager: {branch.manager}
                    </p>
                  </div>
                  <div className="flex gap-6 mt-3">
                    <div>
                      <span className="text-xs text-gray-500">Departments</span>
                      <p className="font-semibold text-secondary-900">{branch.departments}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Employees</span>
                      <p className="font-semibold text-secondary-900">{branch.employees}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" leftIcon={<Edit className="w-4 h-4" />}>
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Trash2 className="w-4 h-4" />}
                  className="text-red-600 hover:bg-red-50 border-red-200"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredBranches.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              No Branches Found
            </h3>
            <p className="text-secondary-600">
              {searchTerm ? 'Try adjusting your search' : 'Get started by adding your first branch'}
            </p>
          </div>
        </Card>
      )}
      </div>
    </MainLayout>
  );
};

export default BranchesPage;
