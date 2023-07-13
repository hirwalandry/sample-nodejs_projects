const app = require('./app')
const port = process.env.PORT


app.listen(port, () => {
    console.log("server is up on port " + port)
})

// // const Task = require('./models/task')
// // const User = require('./models/user')

// // const main = async () => {
    
// //     const task = await User.findById('617569345dd2628882c5bc49')
// //     await task.populate('tasks')
// //     console.log(task.tasks)


// // }
// // main()