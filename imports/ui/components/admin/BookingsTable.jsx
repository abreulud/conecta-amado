import React, { useMemo } from 'react';

export const BookingsTable = ({ bookings, services, loading }) => {
  const enhancedBookings = useMemo(() => {
    return bookings.map(booking => ({
      ...booking,
      serviceName:
        services.find(s => s._id === booking.serviceId)?.name ||
        'Serviço desconhecido',
    }));
  }, [bookings, services]);

  const formatDate = dateString => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  if (loading)
    return <p className="py-4 text-gray-500">Carregando reservas...</p>;
  if (!bookings.length)
    return <p className="py-4 text-gray-500">Nenhuma reserva encontrada.</p>;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Serviço</TableHeader>
            <TableHeader>Data</TableHeader>
            <TableHeader>Horário</TableHeader>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {enhancedBookings.map(booking => (
            <TableRow
              key={booking._id}
              booking={booking}
              formatDate={formatDate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableHeader = ({ children }) => (
  <th
    scope="col"
    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  >
    {children}
  </th>
);

const TableRow = ({ booking, formatDate }) => (
  <tr className="hover:bg-gray-50 transition-colors duration-150">
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {booking.name}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {booking.serviceName}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {formatDate(booking.date)}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {booking.time}
    </td>
  </tr>
);
