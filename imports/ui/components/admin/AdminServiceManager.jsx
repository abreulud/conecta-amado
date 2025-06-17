import React, { useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Services } from '../../../api/services/services'
import { Meteor } from 'meteor/meteor'

const weekdays = [
  { label: 'Domingo', value: 0 },
  { label: 'Segunda', value: 1 },
  { label: 'Terça', value: 2 },
  { label: 'Quarta', value: 3 },
  { label: 'Quinta', value: 4 },
  { label: 'Sexta', value: 5 },
  { label: 'Sábado', value: 6 },
];

export const AdminServiceManager = () => {
  const [newService, setNewService] = useState('')
  const [newStartTime, setNewStartTime] = useState('09:00') // default start time
  const [newEndTime, setNewEndTime] = useState('18:00') // default end time
  // New state for allowed weekdays for new service
  const [newAllowedWeekdays, setNewAllowedWeekdays] = useState([])

  const [editing, setEditing] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedStartTime, setEditedStartTime] = useState('');
  const [editedEndTime, setEditedEndTime] = useState('');
  // New state for allowed weekdays when editing
  const [editedAllowedWeekdays, setEditedAllowedWeekdays] = useState([])

  const services = useTracker(() => {
    Meteor.subscribe('services')
    return Services.find().fetch()
  })

  // Toggle weekday in array (for new service)
  const toggleNewWeekday = (dayValue) => {
    if (newAllowedWeekdays.includes(dayValue)) {
      setNewAllowedWeekdays(newAllowedWeekdays.filter((d) => d !== dayValue))
    } else {
      setNewAllowedWeekdays([...newAllowedWeekdays, dayValue])
    }
  }

  // Toggle weekday in array (for editing service)
  const toggleEditedWeekday = (dayValue) => {
    if (editedAllowedWeekdays.includes(dayValue)) {
      setEditedAllowedWeekdays(editedAllowedWeekdays.filter((d) => d !== dayValue))
    } else {
      setEditedAllowedWeekdays([...editedAllowedWeekdays, dayValue])
    }
  }

  // Updated: send all 4 parameters when creating
  const handleCreate = () => {
    if (!newService.trim()) {
      alert('Por favor, informe o nome do serviço.')
      return
    }
    if (newAllowedWeekdays.length === 0) {
      alert('Por favor, selecione pelo menos um dia permitido.')
      return
    }
    Meteor.call(
      'services.insert',
      newService,
      newStartTime,
      newEndTime,
      newAllowedWeekdays,
      (err) => {
        if (!err) {
          setNewService('')
          setNewStartTime('09:00')
          setNewEndTime('18:00')
          setNewAllowedWeekdays([])
        } else {
          alert(`Erro ao adicionar serviço: ${err.reason}`)
        }
      }
    )
  }

  // Updated: accept allowedWeekdays when editing
  const handleEdit = (id, name, startTime, endTime, allowedWeekdays = []) => {
    setEditing(id)
    setEditedName(name)
    setEditedStartTime(startTime || '09:00')
    setEditedEndTime(endTime || '18:00')
    setEditedAllowedWeekdays(allowedWeekdays)
  }

  const handleUpdate = (id) => {
    if (!editedName.trim()) {
      alert('Por favor, informe o nome do serviço.')
      return
    }
    if (editedAllowedWeekdays.length === 0) {
      alert('Por favor, selecione pelo menos um dia permitido.')
      return
    }
    Meteor.call(
      'services.update',
      id,
      editedName,
      editedStartTime,
      editedEndTime,
      editedAllowedWeekdays,
      (err) => {
        if (!err) setEditing(null)
        else alert(`Erro ao atualizar serviço: ${err.reason}`)
      }
    )
  }

  const handleDelete = (id) => {
    Meteor.call('services.remove', id, (err) => {
      if (err) alert(`Erro ao excluir serviço: ${err.reason}`)
    })
  }

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Gerenciar Serviços</h2>

      {/* New service creation */}
      <div className="flex flex-col gap-2 mb-4">
        <input
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          placeholder="Novo serviço"
          className="border px-3 py-2 rounded"
        />
        <div className="flex gap-2">
          <label>
            Início:
            <input
              type="time"
              value={newStartTime}
              onChange={(e) => setNewStartTime(e.target.value)}
              className="border px-2 py-1 rounded ml-2"
            />
          </label>

          <label>
            Fim:
            <input
              type="time"
              value={newEndTime}
              onChange={(e) => setNewEndTime(e.target.value)}
              className="border px-2 py-1 rounded ml-2"
            />
          </label>
        </div>

        {/* Allowed weekdays checkboxes for new service */}
        <div className="mb-2">
          <span className="font-semibold">Dias permitidos:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {weekdays.map(({ label, value }) => (
              <label key={value} className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newAllowedWeekdays.includes(value)}
                  onChange={() => toggleNewWeekday(value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
        >
          Adicionar
        </button>
      </div>

      {/* List of existing services with edit/delete */}
      <ul className="space-y-2">
        {services.map((service) => (
          <li key={service._id} className="flex items-center justify-between">
            {editing === service._id ? (
              <>
                <input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="border px-2 py-1 rounded w-full mr-2"
                />
                <input
                  type="time"
                  value={editedStartTime}
                  onChange={(e) => setEditedStartTime(e.target.value)}
                  className="border px-2 py-1 rounded mr-2"
                />
                <input
                  type="time"
                  value={editedEndTime}
                  onChange={(e) => setEditedEndTime(e.target.value)}
                  className="border px-2 py-1 rounded mr-2"
                />

                {/* Allowed weekdays checkboxes for editing */}
                <div className="flex flex-wrap gap-2 mr-2">
                  {weekdays.map(({ label, value }) => (
                    <label key={value} className="inline-flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={editedAllowedWeekdays.includes(value)}
                        onChange={() => toggleEditedWeekday(value)}
                      />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>

                <button onClick={() => handleUpdate(service._id)} className="text-green-600">
                  Salvar
                </button>
              </>
            ) : (
              <>
                <span>{service.name}</span>
                <span className="ml-4 text-sm text-gray-600">
                  {service.startTime || '09:00'} - {service.endTime || '18:00'}
                </span>
                {/* Show allowed weekdays as abbreviated labels */}
                <span className="ml-4 text-sm text-gray-500">
                  {service.allowedWeekdays && service.allowedWeekdays.length > 0
                    ? service.allowedWeekdays
                        .map((d) => weekdays.find((w) => w.value === d)?.label?.slice(0, 3))
                        .join(', ')
                    : 'Todos os dias'}
                </span>
                <div className="flex gap-2 ml-auto">
                  <button
                    onClick={() =>
                      handleEdit(
                        service._id,
                        service.name,
                        service.startTime,
                        service.endTime,
                        service.allowedWeekdays || []
                      )
                    }
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="text-red-600 hover:underline"
                  >
                    Excluir
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
