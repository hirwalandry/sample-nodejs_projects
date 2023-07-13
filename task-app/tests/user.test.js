// if(typeof TextEncoder === 'undefined'){
//     const {TextEncoder} = require('util')
//     this.global.TextEncoder = TextEncoder
// }
const {TextDecoder ,TextEncoder} = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {userOneId, userOne, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase) 

test('should test signup, create users', async() => {
      await request(app).post('/users').send({
          name :'landry',
          email : 'hirwalandry@gmail.com',
          password : '123344545lan'
      }).expect(201)
})

test('should login', async() => {
    const res = await request(app).post('/users/login').send({
        email : userOne.email,
        password : userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(res.body.token).toBe(user.tokens[1].token)
})
test('should not login', async() => {
    await request(app).post('/users/login').send({
        email : 'hirwalandry@gmail.com',
        password : '123344545lan'
    }).expect(400)

    
})
test('should get the users', async() => {
    await request(app).get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})
test('should not get users', async() => {
    await request(app).get('/users/me')
    .send()
    .expect(401)
})
test('should delete users', async() => {
    await request(app).delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})
test('should not delete users', async() => {
    await request(app).delete('/users/me')
    .send()
    .expect(401)
})
// test('should insert avatar as buffer', async() => {
//     await request(app).post('/users/me/avatar')
//     .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//     .attach('avatar', 'tests/fixtures/_MG_0029.JPG')
//     .expect(200)
    
//     const user = await User.findById(userOneId)
//     expect(user.avatar).toEqual(expect.any(Buffer))
// })
test('should update user', async() => {
    const res = await request(app).patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name : 'landry'
    })
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toBe(res.body.name)
})
test('should not update user', async() => {
    const res = await request(app).patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location : 'gisozi'
    })
    .expect(404)

})