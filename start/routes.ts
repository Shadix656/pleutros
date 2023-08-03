/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import AutoSwagger from 'adonis-autoswagger'
import swagger from 'Config/swagger'

Route.get('/swagger', async () => {
  return AutoSwagger.docs(Route.toJSON(), swagger)
})

Route.get('/docs', async () => {
  return AutoSwagger.ui('/swagger')
})

Route.post('/auth/register', 'AuthController.register')
Route.post('/auth/login', 'AuthController.login')
Route.post('/auth/logout', 'AuthController.logout')
Route.get('/auth/me', 'AuthController.show').middleware('auth')

Route.resource('parties', 'PartiesController').except(['create', 'edit'])

Route.resource('bde', 'BdesController').except(['create', 'edit'])
