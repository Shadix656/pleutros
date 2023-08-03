import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Bde extends BaseModel {
  @hasMany(() => User)
  public users: HasMany<typeof User>

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public school: string

  @column()
  public city: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
