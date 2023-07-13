const mangoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mangoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name :'nshuti',
    email : 'hirwalandry44@gmail.com',
    password : '123what!!!',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}
const userTwoId = new mangoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name :'landry',
    email : 'nshutihirwa44@gmail.com',
    password : '1234whatF^k',
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id : new mangoose.Types.ObjectId,
    description: 'first task',
    completed: 'true',
    owner: userOneId
}
const taskTwo = {
    _id : new mangoose.Types.ObjectId,
    description: 'second task',
    completed: 'false',
    owner: userOneId
}
const taskThree= {
    _id : new mangoose.Types.ObjectId,
    description: 'third task',
    completed: 'false',
    owner: userTwoId
}

const setupDatabase = async() => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    taskThree,
    setupDatabase
}