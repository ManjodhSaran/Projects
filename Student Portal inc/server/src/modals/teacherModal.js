import mongoose from 'mongoose';

const instance = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    name: String,
    staffId: {
        type: String,
        unique: true
    },
    dob: String
});

export default mongoose.model('teachers', instance);