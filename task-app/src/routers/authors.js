const express = require('express')
// const multer = require('multer')
// const sharp = require('sharp')
const Author = require('../models/authors')
// const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/author', async(req, res) =>{
    try {
        const author = new Author(req.body)
        await author.save()
        res.send(author)
    } catch (error) {
        res.status(500).send()
    }
    
})
router.get('/author/me', async(req, res) => {
    
    try {
        const author = await Author.find({}).populate('posts')
        res.send(author)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router