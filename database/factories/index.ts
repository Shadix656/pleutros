import Factory from '@ioc:Adonis/Lucid/Factory'
import Bde from 'App/Models/Bde'

export const BdeFactory = Factory.define(Bde, ({ faker }) => {
  return {
    name: faker.company.name(),
    city: faker.location.city(),
    school: faker.company.name(),
  }
}).build()
