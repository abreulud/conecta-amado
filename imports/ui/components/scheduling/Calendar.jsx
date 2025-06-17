import React, { useEffect } from 'react';


const weekdays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

export const Calendar = ({ 
    selectedDate, 
    onChangeDate, 
    onMonthChange, 
    fullyBookedDates = [],
    allowedWeekdays = [0,1,2,3,4,5,6]
 }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = React.useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  useEffect(() => {
    onMonthChange?.(currentDate);
  }, [currentDate]);

  const prevMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    setCurrentDate(newDate);
    onMonthChange?.(newDate);
  };
  
  const nextMonth = () => {
    const newDate = new Date(year, month + 1, 1);
    setCurrentDate(newDate);
    onMonthChange?.(newDate);
  };

  const isSelected = (day) =>
    selectedDate &&
    selectedDate.getDate() === day &&
    selectedDate.getMonth() === month &&
    selectedDate.getFullYear() === year;

  // Prepare days with empty slots for start
  const daysArray = [];
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d);
  }

  const isFullyBooked = (dateObj) => {
    const iso = dateObj.toISOString().slice(0, 10);
    return fullyBookedDates.includes(iso);
  };

  return (
    <div className="text-center">
    {/*Header */}
      <div className="flex items-center justify-between w-full max-w-xs mx-auto mb-4">
        <button onClick={prevMonth} className="text-2xl text-gray-600 hover:text-blue-500 transition">&lt;</button>
        <span className="flex flex-col items-center font-semibold text-lg">
          <span className="text-xl uppercase">{currentDate.toLocaleString('pt-BR', { month: 'long' })}</span>
          <span className="text-sm">{year}</span>
        </span>
        <button onClick={nextMonth} className="text-2xl text-gray-600 hover:text-blue-500 transition">&gt;</button>
      </div>
  
    {/*Weekday names row */}
      <div className="grid grid-cols-7 gap-4 text-sm font-semibold m-auto">
        {weekdays.map((day, i) => (
          <div key={i}>{day}</div>
        ))}
      </div>
  
        {/*Days Grid */}
      <div className="grid grid-cols-7 gap-4 mt-4">
        {daysArray.map((day, idx) => {
          if (!day) {
            return <div key={idx} className="w-8 h-8" />;
          }
  
          // Construct the date for this day
          const dateObj = new Date(year, month, day);
          const dateISO = dateObj.toISOString().slice(0, 10);
          const weekday = dateObj.getDay();

          const isFullyBooked = fullyBookedDates?.includes(dateISO);
          const isWeekdayAllowed = allowedWeekdays.includes(weekday);
          const isDisabled = isFullyBooked || !isWeekdayAllowed;

          return (
            <button
              key={idx}
              onClick={() => !isDisabled && onChangeDate(dateObj)}
              disabled={isDisabled}
              className={`w-12 h-12 rounded-full flex m-auto items-center justify-center
                ${
                  isSelected(day)
                    ? 'bg-white text-black font-bold cursor-pointer'
                    : 'text-gray-800 hover:bg-white hover:text-black cursor-pointer'
                }
                ${isFullyBooked ? 'bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200' : 'cursor-pointer'}
                ${!isWeekdayAllowed ? 'bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200' : 'cursor-pointer'}
              `}
            >
              {day}
            </button>
          );transparent
        })}
      </div>
    </div>
  );
};
