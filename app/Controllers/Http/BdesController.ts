import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Bde from 'App/Models/Bde'

export default class BdesController {
  /**
   * @index
   * @description Retourne la liste des bde.
   * @responseBody 200 - <Bde[]>
   */
  public async index({ response }: HttpContextContract) {
    const bdes = await Bde.all()

    return response.ok(bdes)
  }

  /**
   * @show
   * @paramPath id - Id du bde
   * @description Retourne un bde en fonction de son id
   * @responseBody 200 - <Bde>.with(bde, bde.relation)
   * @responseBody 404
   */
  public async show({ params, response }) {
    const { id } = params

    const bde = await Bde.find(id)
    if (!bde) {
      return response.notFound({ message: 'Aucun bde trouvée.' })
    }

    return response.ok(bde)
  }

  /**
   * @store
   * @responseBody 200
   * @requestBody <Bde>
   */
  public async store({ request, response }: HttpContextContract) {
    const bdeSchema = schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
      school: schema.string(),
      city: schema.string(),
    })

    const payload = await request.validate({ schema: bdeSchema })

    try {
      const bde: Bde = await Bde.create(payload)
      return response.ok(bde)
    } catch (e) {
      return response.unprocessableEntity(e)
    }
  }

  /**
   * @update
   * @paramPath id - Id du bde
   * @responseBody 200
   * @reponseBody 404 - Aucun bde ne correspond à l'id donné.
   * @requestBody <Bde>
   */
  public async update({ request, params, response }: HttpContextContract) {
    const bdeSchema = schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
      school: schema.string.optional(),
      city: schema.string.optional(),
    })

    const payload = await request.validate({ schema: bdeSchema })

    const { id } = params

    const bde = await Bde.find(id)
    if (!bde) {
      return response.notFound({ message: 'Aucun bde trouvé.' })
    }

    try {
      bde.merge(payload)

      await bde.save()

      return response.ok(bde)
    } catch (e) {
      return response.unprocessableEntity(e)
    }
  }

  /**
   * @destroy
   * @paramPath id - Id du bde
   * @responseBody 200
   * @responseBody 404 - Aucun bde ne correspond à l'id donné.
   */
  public async destroy({ params, response }) {
    const { id }: { id: Number } = params

    const bde = await Bde.find(id)
    if (!bde) {
      return response.notFound({ message: 'Aucun bde trouvé' })
    }

    await bde.delete()

    return response.ok({ message: 'Bde supprimé' })
  }
}
