import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema } from '@adonisjs/validator/build/src/Schema'
import { rules } from '@adonisjs/validator/build/src/Rules'

export default class AuthController {
  /**
   * @register
   * @description Créer un utilisateur.
   * @responseBody 200
   * @requestBody {"email": "string", "password": "string", "password_confirmation": "string", "username": "string"}
   */
  public async register({ auth, request, response }: HttpContextContract) {
    try {
      const registerSchema = schema.create({
        email: schema.string({}, [
          rules.email(),
          rules.unique({ table: 'users', column: 'email' }),
        ]),
        password: schema.string({}, [rules.confirmed()]),
        username: schema.string({ trim: true }, [rules.maxLength(255)]),
      })

      const payload = await request.validate({ schema: registerSchema })
      const user = await User.create(payload)

      const token = await auth.use('api').attempt(payload.email, payload.password)

      return {
        user,
        token,
      }
    } catch (error) {
      return response.unauthorized(error)
    }
  }

  /**
   * @login
   * @description Connecte un utilisateur
   * @responseBody 200
   * @requestBody {"email": "string", "password": "string"}
   */
  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const { email, password } = request.body()

      return await auth.use('api').attempt(email, password)
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()

    return {
      revoked: true,
    }
  }

  /**
   * @show
   * @description Retourne le profil d'un utilisateur
   * @responseBody 200 - <User>.with(user, user.relation)
   * @responseBody 404
   */
  public async show({ auth }) {
    if (auth.user) {
      const userId = auth.user.id

      return User.find(userId)
    }
  }
}
