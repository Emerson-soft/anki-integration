import Route from '@ioc:Adonis/Core/Route'

Route.post('/', 'AnkisController.readFile')

Route.get('/', async () => {
  return { hello: 'world' }
})
