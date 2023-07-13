require('../src/db/mongoose')
const User = require('../src/models/User')


const updateUserAndCount = async(id, age) =>{
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}  

updateUserAndCount('616982cc3a2b0446703b9717', { age: 1 }).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})
