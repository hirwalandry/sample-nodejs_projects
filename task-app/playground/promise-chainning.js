require('../src/db/mongoose')
const Task = require('../src/models/Task')

const deleteTaskAndCount = async(id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('61699db41980605c60299836').then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})