import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Bde from 'App/Models/Bde'

export default class extends BaseSeeder {
  public async run() {
    await Bde.createMany([
      {
        name: "Bin'Harry",
        school: 'IUT RCC',
        city: 'Reims',
      },
      {
        name: 'Medecine',
        school: 'INSSET',
        city: 'Saint-Quentin',
      },
    ])
  }
}
