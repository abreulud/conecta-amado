import React, { useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Services } from '../../../api/services/services'
import { Meteor } from 'meteor/meteor'

export const ServiceAdmin = () => {
  const [newService, setNewService] = useState('')
  const [editing, setEditing] = useState(null)
  const [editedName, setEditedName] = useState('')

  const services = useTracker(() => {
    Meteor.subscribe('services')
    return Services.find().fetch()
  })

  const handleCreate = () => {
    if (newService.trim()) {
      Meteor.call('services.insert', newService, (err) => {
        if (!err) setNewService('')
      })
    }
  }

  const handleEdit = (id, name) => {
    setEditing(id)
    setEditedName(name)
  }

  const handleUpdate = (id) => {
    Meteor.call('services.update', id, editedName, (err) => {
      if (!err) setEditing(null)
    })
  }

  const handleDelete = (id) => {
    Meteor.call('services.remove', id)
  }

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Gerenciar Serviços</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          placeholder="Novo serviço"
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Adicionar
        </button>
      </div>

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
                <button onClick={() => handleUpdate(service._id)} className="text-green-600">Salvar</button>
              </>
            ) : (
              <>
                <span>{service.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(service._id, service.name)}
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
