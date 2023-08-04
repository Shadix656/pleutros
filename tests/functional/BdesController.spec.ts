import { test } from '@japa/runner'
import Bde from 'App/Models/Bde'

test('Get a list of bde (BdesController::index)', async ({ client, assert }) => {
  const response = await client.get('/bde')

  const body = response.body()

  response.assertStatus(200)
  assert.typeOf(body, 'array')
  assert.properties(body[0], ['name', 'school', 'city'])
})

test('Create a bde (BdesController::store)', async ({ client, assert }) => {
  const bdesBefore = (await Bde.all()).length

  const response = await client.post('/bde').json({
    name: 'name',
    school: 'school',
    city: 'city',
  })

  const bdesAfter = (await Bde.all()).length

  response.assertStatus(200)
  assert.equal(bdesAfter, bdesBefore + 1)
})

test('Create a bde (BdesController::store) non unique', async ({ client }) => {
  const response = await client.post('/bde').json({
    name: 'name',
    school: 'school',
    city: 'city',
  })

  response.assertStatus(422)
})

test('Get a single instance of bde (BdesController::show)', async ({ client, assert }) => {
  const bde = await Bde.findBy('id', 1)

  const response = await client.get('/bde/1')

  response.assertStatus(200)
  assert.sameDeepMembers([bde!.serialize()], [response.body()])
})

test('Update bde (BdesController::update)', async ({ client, assert }) => {
  const bdeBefore = await Bde.findBy('id', 1)

  const response = await client.put('/bde/1').json({
    name: 'name2',
    school: 'school',
    city: 'city',
  })
  const bdeAfter = await Bde.findBy('id', 1)

  response.assertStatus(200)
  assert.notEqual(bdeBefore!.name, bdeAfter!.name)
  assert.equal(bdeAfter!.name, 'name2')

  assert.notEqual(bdeBefore!.school, bdeAfter!.school)
  assert.equal(bdeAfter!.school, 'school')

  assert.notEqual(bdeBefore!.city, bdeAfter!.city)
  assert.equal(bdeAfter!.city, 'city')
})

test('Update bde (BdesController::update) non unique', async ({ client }) => {
  const response = await client.put('/bde/1').json({
    name: 'name',
    school: 'school',
    city: 'city',
  })

  response.assertStatus(422)
})

test('Delete bde (BdesController::destroy)', async ({ client, assert }) => {
  const response = await client.delete('/bde/1')

  response.assertStatus(200)
  const bdes = await Bde.all()

  assert.equal(bdes.length, 2)
})
