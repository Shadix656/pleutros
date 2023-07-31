import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {

  public async up() {
    this.schema.table('parties', (table) => {
      table.dropColumn('isPrivate')
      table.boolean('is_private')
    })
  }

  public async down() {
    this.schema.dropTable('parties')
  }
}
