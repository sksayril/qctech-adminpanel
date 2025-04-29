import { useState, useEffect } from 'react';
import { Users, Plus, Eye, X, Loader, Search } from 'lucide-react';

interface Serviceman {
  _id: string;
  ServiceManId: string;
  ServiceManName: string;
  Email: string;
  Password: string;
  ContactNumber: string;
  AadhaarNumber: string;
  BranchName: string;
  ImageUrl: string;
  CreatedBy: string;
  createdAt: string;
  updatedAt: string;
}

interface Task {
  _id: string;
  serviceMan_id: string;
  serviceManQcid: string;
  organizationName: string;
  productName: string;
  additionalInfo: string;
  remarks: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export default function Salesmen() {
  const [salesmen, setSalesmen] = useState<Serviceman[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    ServiceManName: '',
    Email: '',
    Password: '',
    ContactNumber: '',
    AadhaarNumber: '',
    BranchName: 'Kolkata Branch',
    Image: null as File | null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSalesmen();
  }, []);

  const fetchSalesmen = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://7cvccltb-3100.inc1.devtunnels.ms/admin/api/serviceman/getall', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.data) {
        setSalesmen(data.data);
      }
    } catch (err) {
      setError('Failed to fetch salesmen');
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async (serviceManId: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://7cvccltb-3100.inc1.devtunnels.ms/admin/api/serviceman/getservicemantask/by-qcid/${serviceManId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.data) {
        setSelectedTasks(data.data);
        setShowTaskModal(true);
      }
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataObj.append(key, value);
        }
      });

      const response = await fetch('https://7cvccltb-3100.inc1.devtunnels.ms/admin/api/serviceman/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataObj
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Salesman created successfully');
        setShowForm(false);
        fetchSalesmen();
        setFormData({
          ServiceManName: '',
          Email: '',
          Password: '',
          ContactNumber: '',
          AadhaarNumber: '',
          BranchName: 'Kolkata Branch',
          Image: null,
        });
      } else {
        setError(data.message || 'Failed to create salesman');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, Image: e.target.files![0] }));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredTasks = selectedTasks.filter(task =>
    task.organizationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Users className="mr-2" size={24} />
          <h1 className="text-2xl font-bold">Salesmen Management</h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus size={20} className="mr-2" />
          Add Salesman
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Salesman</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.ServiceManName}
                onChange={(e) => setFormData(prev => ({ ...prev, ServiceManName: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.Email}
                onChange={(e) => setFormData(prev => ({ ...prev, Email: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={formData.Password}
                onChange={(e) => setFormData(prev => ({ ...prev, Password: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                value={formData.ContactNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, ContactNumber: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aadhaar Number
              </label>
              <input
                type="text"
                value={formData.AadhaarNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, AadhaarNumber: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch Name
              </label>
              <input
                type="text"
                value={formData.BranchName}
                onChange={(e) => setFormData(prev => ({ ...prev, BranchName: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                accept="image/*"
                required
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                {loading ? <Loader className="animate-spin mr-2" size={20} /> : null}
                Create Salesman
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && !showForm ? (
        <div className="flex justify-center items-center p-8">
          <Loader className="animate-spin text-blue-500" size={40} />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Branch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Password
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesmen.map((salesman) => (
                <tr key={salesman._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img 
                      src={salesman.ImageUrl} 
                      alt={salesman.ServiceManName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{salesman.ServiceManId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{salesman.ServiceManName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{salesman.Email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{salesman.ContactNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{salesman.BranchName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{salesman.Password}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="flex items-center text-blue-600 hover:text-blue-800"
                      onClick={() => fetchTasks(salesman.ServiceManId)}
                    >
                      <Eye size={16} className="mr-1" />
                      View Tasks
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Tasks List</h2>
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by organization name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
              </div>
              
              <div className="space-y-8">
                {filteredTasks.map((task) => (
                  <div key={task._id} className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization Details</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600">Organization Name</p>
                            <p className="font-medium text-gray-900">{task.organizationName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Product</p>
                            <p className="font-medium text-gray-900">{task.productName}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Details</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600">Additional Info</p>
                            <p className="font-medium text-gray-900">{task.additionalInfo}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Remarks</p>
                            <p className="font-medium text-gray-900">{task.remarks}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-2">Task Completion Date</p>
                      <p className="text-green-500 font-medium">{formatDate(task.createdAt)}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Images</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {task.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Task image ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}