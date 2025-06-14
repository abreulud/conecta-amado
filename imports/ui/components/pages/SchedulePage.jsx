import React from 'react';
import { Calendar } from '../scheduling/Calendar';
import { Navbar } from '../scheduling/Navbar';
import { useTracker } from 'meteor/react-meteor-data';
import { Services } from '../../../api/services/services'

export const SchedulePage = () => {
    const services = useTracker(() => {
        Meteor.subscribe('services')
        return Services.find().fetch()
    }, [])

    return (
        <div className="h-screen font-sans flex flex-col">
          {/* Top Navbar */}
          <Navbar username="USUARIO" avatarSrc="/avatar.png" />
    
          {/* Main content */}
          <div className="flex flex-1">
            {/* Left Panel */}
            <div className="w-1/2 bg-blue-100 p-8 flex flex-col text-center">
              <h1 className="text-xl font-semibold mb-4 p-8">Agende o seu serviço agora!</h1>
              <div className="transform scale-120">
                <Calendar />
              </div>
            </div>
    
            {/* Right Panel */}
            <div className="w-1/2 bg-[#fafafa] p-8 flex flex-col">
              <div className="mb-6">
                <h2 className="text-lg text-center font-semibold mb-2">Escolha o serviço</h2>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="">Selecione</option>
                  {services.map(service => (
                    <option key={service.id} value={service._id}>{service.name}</option>
                  ))}
                </select>
              </div>
    
              <div className="mb-6">
                <h2 className="text-lg text-center font-semibold mb-2">Escolha o melhor horário</h2>
                <div className="space-y-2">
                  {['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM'].map((time) => (
                    <button
                      key={time}
                      className="w-full border border-gray-300 px-4 py-2 rounded text-left hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
    
              <button className="mt-auto bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500">
                AGENDAR
              </button>
            </div>
          </div>
        </div>
      )
    }
