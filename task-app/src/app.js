const express = require('express')
require('./db/mongoose')
const useRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const authorsrouter = require('./routers/authors')
const blogpostrouter= require('./routers/blogpost')

const app = express()

app.use(express.json())
app.use(useRouter)
app.use(taskRouter)
app.use(authorsrouter)
app.use(blogpostrouter)

module.exports = app
