// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Party from 'App/Models/Party'
import { schema } from '@adonisjs/validator/build/src/Schema'
import { rules } from '@adonisjs/validator/build/src/Rules'

export default class PartiesController {
  /**
   * @index
   * @description Retourne la liste de soirée.
   * @responseBody 200 - <Party>.with(relations)
   */
  public async index({ response }) {
    const parties: Party[] = await Party.all()

    return response.ok(parties)
  }

  /**
   * @show
   * @paramPath id - Id de la soirée
   * @description Retourne une soirée en fonction de son id
   * @responseBody 200 - <Party>.with(party, party.relation)
   * @responseBody 404
   */
  public async show({ params, response }) {
    const { id }: { id: number } = params

    const party: any = await Party.find(id)
    if (!party) {
      return response.notFound({ message: 'Aucune soirée trouvée.' })
    }

    return response.ok(party)
  }

  /**
   * @store
   * @responseBody 200
   * @requestBody <Party>
   */
  public async store({ request, response }) {
    const partiesSchema = schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
      is_private: schema.boolean(),
    })

    const payload: any = await request.validate({ schema: partiesSchema })
    const party: Party = await Party.create(payload)

    return response.ok(party)
  }

  /**
   * @update
   * @paramPath id - Id de la soirée
   * @responseBody 200
   * @reponseBody 404 - Aucune soirée ne corresponds à l'id donné.
   * @requestBody <Party>
   */
  public async update({ request, params, response }) {
    const partiesSchema = schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
      is_private: schema.boolean(),
    })

    const payload: any = await request.validate({ schema: partiesSchema })

    const { id }: { id: Number } = params

    const party: any = await Party.find(id)
    if (!party) {
      return response.notFound({ message: 'Aucune soirée trouvé.' })
    }

    party.name = payload.name
    party.is_private = payload.is_private

    await party.save()

    return response.ok(party)
  }

  /**
   * @destroy
   * @paramPath id - Id de la soirée
   * @responseBody 200
   * @responseBody 404 - Aucune soirée ne corresponds à l'id donné.
   */
  public async destroy({ params, response }) {
    const { id }: { id: Number } = params

    const party: any = await Party.find(id)
    if (!party) {
      return response.notFound({ message: 'Aucune soirée trouvé' })
    }

    await party.delete()

    return response.ok({ message: 'Soirée supprimé' })
  }
}
