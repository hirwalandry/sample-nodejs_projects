const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
        

    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token

        })

        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()

    }
})
router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()

    }catch(e){

    }
})
router.get('/users/me', auth,  async (req, res) => {
    try{ res.send(req.user) }catch(e){res.status(404).send()}
    
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const includesData = ['name','email','password','age']
    const setToTrue = updates.every((update) => includesData.includes(update))

    if (!setToTrue) {
        return res.status(404).send({error: 'not icluded'})
        
    }
   try {
       
       updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()
    //    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    res.send(req.user)
   } catch (error) {
       res.status(500).send()
   }
  
})
router.delete('/users/me', auth, async (req, res) => {
    try{
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send()

    }

})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(JPG|JPEG|PNG)$/)){
            return cb(new Error('please upload the video extension'))
        }
        cb(undefined, true)

    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width:250, height:250 }).png().toBuffer()
    req.user.avatars = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
router.delete('/users/me/avatar', auth, async(req, res) => {
    req.user.avatars = undefined
    await req.user.save()
    res.send()
})
router.get('/users/:id/avatar', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)

        if(user || user.avatars){
            throw new Error()
    
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatars)
    }catch(e){
        res.status(404).send()

    }
})
module.exports = router