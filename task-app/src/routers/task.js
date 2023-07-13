const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/tasks', auth, async (req, res) => {
    
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()

        res.status(201).send(task)
    } catch (e) {
        res.ststus(400).send(e)
    }

})

router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if(req.query.completed){
        match.completed = req.query.completed === 'true'

    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try{
        const tasks = await Task.find({ owner: req.user._id})
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)

    }catch(e){
        res.status(500).send()

    }
})
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner:req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const toValidate = ['description','completed']
    const setToTrue = updates.every((update) => toValidate.includes(update))
    if(!setToTrue){
        res.status(400).send({error : 'not included'})
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})
        

        await task.save()
        //  const updateById = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        if (!task) {
            return res.status(404).send()
            
        }
        updates.forEach((update) => task[update] = req.body[update]);
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
   
})
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const deleteById = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!deleteById) {
            return res.status(404).send()
            
        }
        res.send(deleteById)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router