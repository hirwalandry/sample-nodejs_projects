const express = require('express')
const BlogPost = require('../models/blogpost')
// const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/blog', async(req, res) =>{
    try {
        const blog = new BlogPost(req.body)
        await blog.save()
        res.send(blog)
    } catch (error) {
        res.status(500).send()
    }
    
})

module.exports = router