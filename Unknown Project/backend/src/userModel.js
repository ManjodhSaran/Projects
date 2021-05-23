import mongoose from 'mongoose'

const instance = mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

export default mongoose.model('users', instance);