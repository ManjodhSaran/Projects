import mongoose from 'mongoose';

const instance = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    className: String,
    subject: String,
    staffId: String,
    classId: String,
    dob: String
});

export default mongoose.model('classes', instance);