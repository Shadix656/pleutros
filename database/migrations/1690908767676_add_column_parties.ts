import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'parties'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('description').notNullable()
      table.string('short_description').notNullable()
      table.string('address').notNullable()
      table.string('city').notNullable()
      table.integer('zipcode').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
