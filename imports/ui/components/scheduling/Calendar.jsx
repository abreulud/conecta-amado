import React from 'react'
import { useState } from 'react'

const weekdays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB']

export const Calendar = () => {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const isSelected = (day) =>
    selectedDate &&
    selectedDate.getDate() === day &&
    selectedDate.getMonth() === month &&
    selectedDate.getFullYear() === year

  const daysArray = []
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d)
  }

  return (
    <div className="text-center">
      <div className="flex items-center justify-between w-full max-w-xs mx-auto mb-4">
        <button onClick={prevMonth} className="text-2xl text-gray-600 hover:text-blue-500 transition">&lt;</button>
        <span className="flex flex-col items-center font-semibold text-lg">
            <span className="text-xl uppercase">
                {currentDate.toLocaleString('pt-BR', { month: 'long' })}
            </span>
            <span className="text-sm">
                {currentDate.getFullYear()}
            </span>
        </span>
        <button onClick={nextMonth} className="text-2xl text-gray-600 hover:text-blue-500 transition">&gt;</button>
      </div>

      <div className="grid grid-cols-7 gap-4 text-sm font-semibold m-auto">
        {weekdays.map((day, i) => (
          <div key={i}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4 mt-4">
        {daysArray.map((day, idx) => (
          <div key={idx}>
            {day ? (
              <button
                onClick={() => setSelectedDate(new Date(year, month, day))}
                className={`w-12 h-12 rounded-full flex m-auto items-center justify-center
                  ${isSelected(day) ? 'bg-white text-black font-bold' : 'text-gray-800 hover:bg-white hover:text-black'}`}
              >
                {day}
              </button>
            ) : (
              <div className="w-8 h-8" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
