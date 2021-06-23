import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    subject: String,
    timestamp: Date,
    markedBy: String,
    present: Boolean
})


const instance = mongoose.Schema({
    id: String,
    name: String,
    rollno: String,
    dob: String,
    class: String,
    role: String,
    attendance: [attendanceSchema],
});

export default mongoose.model('students', instance);