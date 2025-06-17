import React, { useState, useMemo } from 'react';
import { Calendar } from '../scheduling/Calendar';
import { Navbar } from '../scheduling/Navbar';
import { useTracker } from 'meteor/react-meteor-data';
import { Services } from '../../../api/services/services';
import { Bookings } from '../../../api/bookings/bookings'
import { Meteor } from 'meteor/meteor';

// Helper functions unchanged
const timeToMinutes = (time) => {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
};

const minutesToTimeString = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const ampm = h < 12 ? 'AM' : 'PM';
  return `${hour12}:${m.toString().padStart(2, '0')} ${ampm}`;
};

const generateTimeSlots = (start, end) => {
  const startMins = timeToMinutes(start);
  const endMins = timeToMinutes(end);
  const slots = [];
  for (let mins = startMins; mins <= endMins; mins += 30) {
    slots.push(minutesToTimeString(mins));
  }
  return slots;
};

export const SchedulePage = () => {
  const services = useTracker(() => {
    Meteor.subscribe('services');
    return Services.find().fetch();
  }, []);

  const currentUser = useTracker(() => Meteor.user());
  const userName =
    currentUser?.profile?.name || currentUser?.emails?.[0]?.address || '';

  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  const bookings = useTracker(() => {
    if (!calendarMonth) return [];
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
  
    const sub = Meteor.subscribe('bookings', year, month);
    if (!sub.ready()) return [];
  
    return Bookings.find({
        date: {
          $gte: new Date(year, month, 1).toISOString().slice(0, 10),
          $lt: new Date(year, month + 1, 1).toISOString().slice(0, 10),
        }
      }).fetch();
  }, [calendarMonth]);

  const selectedService = useMemo(
    () => services.find((s) => s._id === selectedServiceId),
    [selectedServiceId, services]
  );

  const allowedWeekdays = useMemo(() => {
    if (!selectedService || !selectedService.allowedWeekdays) {
      return [0, 1, 2, 3, 4, 5, 6]; // all days allowed by default
    }
    return selectedService.allowedWeekdays;
  }, [selectedService]);

  const bookingsForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];

    const formatted = selectedDate.toISOString().slice(0, 10);
    return bookings.filter(b => b.date === formatted);
  }, [bookings, selectedDate]);

  const bookedTimes = useMemo(() => {
    return bookingsForSelectedDate.map(b => b.time);
  }, [bookingsForSelectedDate]);

  const timeSlots = useMemo(() => {
    if (!selectedService) return [];

    const { startTime = '09:00', endTime = '18:00' } = selectedService;
    const allSlots = generateTimeSlots(startTime, endTime);

    return allSlots.filter(slot => !bookedTimes.includes(slot));
  }, [selectedService, bookedTimes]);

// 🧠 Helper to get available slots for a day (based on the selectedService)
const getSlotsForDay = (service) => {
    if (!service) return [];
    const { startTime = '09:00', endTime = '18:00' } = service;
    return generateTimeSlots(startTime, endTime);
};

// 🆕 Fully booked days calculation
const fullyBookedDates = useMemo(() => {
    if (!selectedService) return [];

    const slotsPerDay = getSlotsForDay(selectedService);
    const countsByDate = {};

    // Count how many bookings each date has
    for (const booking of bookings) {
    if (!countsByDate[booking.date]) {
        countsByDate[booking.date] = 0;
    }
    countsByDate[booking.date]++;
    }

    // Compare to total slots per day
    return Object.entries(countsByDate)
    .filter(([_, count]) => count >= slotsPerDay.length)
    .map(([date]) => date); // return just the list of fully booked dates
}, [bookings, selectedService]);

  const handleSchedule = () => {
    if (!userName.trim()) {
      alert('Erro: usuário não autenticado.');
      return;
    }
    if (!selectedServiceId) {
      alert('Por favor, selecione um serviço.');
      return;
    }
    if (!selectedDate) {
      alert('Por favor, selecione uma data.');
      return;
    }
    if (!selectedTime) {
      alert('Por favor, selecione um horário.');
      return;
    }

    const formattedDate = selectedDate.toISOString().slice(0, 10);

    Meteor.call(
      'bookings.insert',
      {
        name: userName,
        serviceId: selectedServiceId,
        date: formattedDate,
        time: selectedTime,
      },
      (error) => {
        if (error) {
          alert(`Erro ao agendar: ${error.reason}`);
        } else {
          alert('Agendamento realizado com sucesso!');
          setSelectedTime('');
          setSelectedDate(null);
          setSelectedServiceId('');
        }
      }
    );
  };

  return (
    <div className="h-screen font-sans flex flex-col">
      <Navbar username={userName} avatarSrc="/avatar.png" />

      <div className="flex flex-1">
        {/* Left Panel */}
        <div className="w-1/2 bg-blue-100 p-8 flex flex-col text-center">
          <h1 className="text-xl font-semibold mb-4 p-8">Agende o seu serviço agora!</h1>
          <div className="transform scale-120">
            <Calendar 
              onChangeDate={setSelectedDate} 
              selectedDate={selectedDate}
              onMonthChange={setCalendarMonth} 
              fullyBookedDates={fullyBookedDates}
              allowedWeekdays={allowedWeekdays}/>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 bg-[#fafafa] p-8 flex flex-col">
          <div className="mb-6">
            <h2 className="text-lg text-center font-semibold mb-2">Escolha o serviço</h2>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
            >
              <option value="">Selecione</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <h2 className="text-lg text-center font-semibold mb-2">Escolha o melhor horário</h2>
            <div className="space-y-2">
              {timeSlots.length === 0 ? (
                <p className="text-center text-gray-500">
                  {selectedServiceId
                    ? 'Todos os horários estão ocupados para este dia.'
                    : 'Selecione um serviço para ver os horários disponíveis.'}
                </p>
              ) : (
                timeSlots.map((time) => (
                  <button
                    key={time}
                    className={`w-full border px-4 py-2 rounded text-left hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                      selectedTime === time ? 'bg-blue-300 text-white' : ''
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))
              )}
            </div>
          </div>

          <button
            onClick={handleSchedule}
            className="mt-auto bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500"
            disabled={timeSlots.length === 0}
          >
            AGENDAR
          </button>
        </div>
      </div>
    </div>
  );
};
