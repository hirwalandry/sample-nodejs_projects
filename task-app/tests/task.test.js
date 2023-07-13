const {TextDecoder ,TextEncoder} = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')


const {userOneId, userOne, taskThree, setupDatabase} = require('./fixtures/db')


beforeEach(setupDatabase)
test('create new task', async() => {
    const respond = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: 'task create',
    })
    .expect(201)

    const task = await Task.findById(respond.body._id)
    expect(task).not.toBeNull()
})
test('get all tasks', async() => {
    const respond = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    expect(respond.body.length).toEqual(2)
})
test('test delete security', async() => {
    const respond = await request(app)
    .delete(`/tasks/${taskThree._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(404)

    const task = await Task.findById(taskThree._id)
    expect(task).not.toBeNull()
})