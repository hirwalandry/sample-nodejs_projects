const mongoose = require('mongoose')
const BlogPostSchema = new mongoose.Schema({
    title: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'author'},
    comments:[{
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'author'},
        content: String
    }]
})
const BlogPost = mongoose.model('BlogPost', BlogPostSchema, 'BlogPost')

module.exports = BlogPost 