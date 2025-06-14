import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Services } from './services'

Meteor.methods({
  'services.insert'(name) {
    check(name, String)
    return Services.insert({ name })
  },

  'services.update'(serviceId, name) {
    check(serviceId, String)
    check(name, String)
    return Services.update(serviceId, { $set: { name } })
  },

  'services.remove'(serviceId) {
  check(serviceId, String)

  try {
    return Services.remove(serviceId)
  } catch (error) {
    console.error('Error removing service:', error)
    throw new Meteor.Error('delete-failed', 'Não foi possível excluir o serviço.')
  }
}
,
})
