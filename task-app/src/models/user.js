const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        
        validate(val){
            if (!validator.isEmail(val)) {
                throw new Error('invalid email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (!value == 1-9) {
                throw new Error('not allowed this "password"')
                
            }
        }
    },
    age: {
        type: Number,
        default: 0,
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }

    }],
    avatars:{
        type: Buffer

    }},{
        timestamps: true
    })

userSchema.virtual('tasks', {
    ref: 'Task',
    localField:'_id',
    foreignField:'owner'
})
userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatars

    return userObject
}
userSchema.methods.generateAuthToken = async function(){
    const user = this

    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
    
}

//login a user seting what lookup
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user){
        throw new Error('unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('unable to login')
    }
    
    return user
}
// hash the plain text password before saving
userSchema.pre('save', async function(next){
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
        
    }
  
    next()
})
//delete user tasks when user is removed
userSchema.pre('remove', async function(next){
    const user = this

    await Task.deleteMany({ owner: user._id })
    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User