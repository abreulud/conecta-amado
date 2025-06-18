import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import { AdminServiceManager } from './AdminServiceManager';
import { Bookings } from '../../../api/bookings/bookings';
import { Services } from '../../../api/services/services';

export const AdminDashboard = () => {
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();

  const { bookings, services, loading } = useTracker(() => {
    const subBookings = Meteor.subscribe('bookings');
    const subServices = Meteor.subscribe('services');

    const loading = !subBookings.ready() || !subServices.ready();

    return {
      bookings: Bookings.find({}, { sort: { createdAt: -1 } }).fetch(),
      services: Services.find().fetch(),
      loading,
    };
  }, []);

  const handleLogout = () => {
    Meteor.logout();
    navigate('/admin/login');
  };

  const getServiceName = id => {
    const service = services.find(s => s._id === id);
    return service ? service.name : 'Serviço desconhecido';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Admin Dashboard - Welcome {user?.profile?.name}
          </h2>
          <button
            onClick={handleLogout}
            className="auth-button bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Bookings Table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-2xl font-semibold mb-4">Scheduled Bookings</h3>
          {loading ? (
            <p>Carregando reservas...</p>
          ) : bookings.length === 0 ? (
            <p>Nenhuma reserva encontrada.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Service
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(({ _id, name, serviceId, date, time }) => (
                  <tr key={_id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{name}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {getServiceName(serviceId)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{date}</td>
                    <td className="border border-gray-300 px-4 py-2">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <AdminServiceManager />
      </div>
    </div>
  );
};
