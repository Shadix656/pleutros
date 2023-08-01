import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class AuthController {
  /**
   * @register
   * @description Créer un utilisateur.
   * @responseBody 200
   * @requestBody <User>
   */
  public async register({ auth, request, response }: HttpContextContract) {
    try {
      const { email, password, username } = request.body()

      const user = await User.create({
        email: email,
        password: password,
        username: username,
      })

      const token = await auth.use('api').attempt(email, password)

      return {
        user,
        token,
      }
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }

  /**
   * @login
   * @description Connecte un utilisateur
   * @responseBody 200
   * @requestBody <User>
   */
  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const { email, password } = request.body()

      return await auth.use('api').attempt(email, password)
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }
}
