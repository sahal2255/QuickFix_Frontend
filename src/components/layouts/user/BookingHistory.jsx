import React from 'react';

export default function BookingHistory() {
  // You can fetch booking data from the server or use dummy data here.
  const bookings = [
    { id: 1, date: '2023-08-10', status: 'Completed' },
    { id: 2, date: '2023-07-05', status: 'Cancelled' },
    // Add more bookings...
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Booking History</h2>
      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li key={booking.id} className="border-b pb-2">
            <div className="flex justify-between">
              <span>{booking.date}</span>
              <span className={`font-semibold ${booking.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>
                {booking.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
