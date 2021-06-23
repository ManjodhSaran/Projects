import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors';
import bodyparser from 'body-parser'
import mongoose from 'mongoose'
import studentModel from './modals/studentModel.js'
import teacherModal from './modals/teacherModal.js';
import classModal from './modals/classModal.js';

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }))

// DB config
const connection_url = `mongodb+srv://admin:${process.env.DB_USERNAME_KEY}@student-portal.gvczb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(connection_url, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log("db connected")
    } else {
        console.log(err.message)
    }
});
const db = mongoose.connection;

// Student Apis /////////////////////////////////////////////////////////////////////////////

app.route('/api/v1/student/signup')
    .post((req, res) => {
        const student = req.body
        const { id, rollno } = student
        studentModel.find({ rollno: rollno, class: student.class }, (err, data) => {
            if (!err) {
                if (data.length === 0) {
                    studentModel.create(student, (err, data) => {
                        if (!err) {
                            res.status(200).json({ success: true, id: id })
                        } else {
                            res.json({ success: false, error: err.message })
                        }
                    })
                } else {
                    res.json({ success: false, error: `Student with roll no. ${rollno} and class ${student.class} already exists` })
                }
            } else {
                res.json({ success: false, error: err.message })
            }
        })
    })

app.route('/api/v1/student/signin')
    .get((req, res) => {
        const student = req.body
        const { id, rollno } = student
        studentModel.find({ rollno: rollno, class: student.class }, (err, data) => {
            if (!err) {
                if (data.length !== 0) {
                    res.status(200).json({ success: true, student: data })
                } else {
                    res.json({ success: false, error: `Student not found` })
                }
            } else {
                res.json({ success: false, error: err.message })
            }
        })
    })

app.route('/api/v1/student')
    .get((req, res) => {
        const student = req.body
        const { id, rollno } = student
        if (rollno && student.class && id) {
            studentModel.find({ rollno: rollno, class: student.class }, (err, data) => {
                if (!err) {
                    if (data.length !== 0) {
                        res.status(200).json({ success: true, student: data })
                    } else {
                        res.json({ success: false, error: `Student not found` })
                    }
                } else {
                    res.json({ success: false, error: err.message })
                }
            })
        } else {
            studentModel.find((err, data) => {
                if (!err) {
                    if (data.length !== 0) {
                        res.status(200).json({ success: true, students: data })
                    } else {
                        res.json({ success: false, error: `Student not found` })
                    }
                } else {
                    res.json({ success: false, error: err.message })
                }
            })
        }
    })
    .patch(
        (req, res) => {
            const { id } = req.body
            if (!id) {
                return res.status(400).json({ success: false, error: "student id Required" })
            }
            studentModel.findOne({ id: id }, (err, data) => {
                if (!err) {
                    if (data) {
                        studentModel.updateOne({ id: id }, { $set: req.body }, (err, data) => {
                            if (!err) {
                                res.status(200).json({ success: true, students: data })
                            } else {
                                res.json({ success: false, error: err.message })
                            }
                        })
                    } else {
                        res.json({ success: false, error: `Student not found` })
                    }
                } else {
                    res.json({ success: false, error: err.message })
                }
            })
        }
    )
    .delete((req, res) => {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({ success: false, error: "student id Required" })
        }
        studentModel.deleteOne({ id: id }, (err, data) => {
            if (err) {
                return res.json({ success: false, error: err.message })
            }
            if (data.length !== 0) {
                res.json({ success: true })
            }
        })
    })



// Teacher Apis /////////////////////////////////////////////////////////////////////////////

app.route('/api/v1/teacher/signup')
    .post((req, res) => {
        const teacher = req.body
        const { id, staffId } = teacher
        if (!id || !staffId) {
            return res.status(400).json({ success: false, error: "Field Values are missing" })
        }
        teacherModal.find({ staffId: staffId }, (err, data) => {
            if (!err) {
                if (data.length === 0) {
                    teacherModal.create(teacher, (err, data) => {
                        if (!err) {
                            res.status(200).json({ success: true, teacher: data })
                        } else {
                            res.json({ success: false, error: err.message })
                        }
                    })
                } else {
                    res.json({ success: false, error: `Teacher with card id. ${staffId} already exists` })
                }
            } else {
                res.json({ success: false, error: err.message })
            }
        })
    })

app.route('/api/v1/teacher/signin')
    .get((req, res) => {
        const teacher = req.body
        const { staffId } = teacher
        if (!staffId) {
            return res.status(400).json({ success: false, error: "Staff id required" })
        }
        teacherModal.find({ staffId: staffId }, (err, data) => {
            if (!err) {
                if (data.length !== 0) {
                    res.status(200).json({ success: true, teacher: data })
                } else {
                    res.json({ success: false, error: `Teacher not found` })
                }
            } else {
                res.json({ success: false, error: err.message })
            }
        })
    })

app.route('/api/v1/teacher')
    .get((req, res) => {
        const teacher = req.body
        const { staffId } = teacher
        if (staffId) {
            teacherModal.find({ staffId: staffId }, (err, data) => {
                if (!err) {
                    if (data.length !== 0) {
                        res.status(200).json({ success: true, teacher: data })
                    } else {
                        res.status(404).json({ success: false, error: `Teacher not found` })
                    }
                } else {
                    res.json({ success: false, error: err.message })
                }
            })
        } else {
            teacherModal.find((err, data) => {
                if (!err) {
                    if (data.length !== 0) {
                        res.status(200).json({ success: true, teachers: data })
                    } else {
                        res.status(404).json({ success: false, error: `Teacher not found` })
                    }
                } else {
                    res.json({ success: false, error: err.message })
                }
            })
        }
    })
    .patch(
        (req, res) => {
            const { staffId } = req.body
            if (!staffId) {
                return res.status(400).json({ success: false, error: "Staff Id Required" })
            }
            teacherModal.findOne({ staffId: staffId }, (err, data) => {
                if (!err) {
                    if (data) {
                        teacherModal.updateOne({ staffId: staffId }, { $set: req.body }, (err, data) => {
                            if (!err) {
                                res.status(200).json({ success: true, teacher: data })
                            } else {
                                res.json({ success: false, error: err.message })
                            }
                        })
                    } else {
                        res.json({ success: false, error: `Teacher not found` })
                    }
                } else {
                    res.json({ success: false, error: err.message })
                }
            })
        }
    )
    .delete((req, res) => {
        const { staffId } = req.body
        if (!staffId) {
            return res.status(400).json({ success: false, error: "Staff id Required" })
        }
        teacherModal.deleteOne({ staffId: staffId }, (err, data) => {
            if (err) {
                return res.json({ success: false, error: err.message })
            }
            if (data.length !== 0) {
                res.json({ success: true })
            }
        })
    })

// Creating a class ///////////////////////////////////////////////////////////////////////////////////////////////

app.route('/api/v1/class')
    .get((req, res) => {
        const { classId } = req.body
        if (classId) {
            classModal.find({ classId: classId }, (err, data) => {
                if (err) {
                    return res.json({ success: false, error: err.message })
                }
                if (data) {
                    return res.status(200).json({ success: true, class: data })
                } else {
                    return res.status(404).json({ success: false, error: "class not found" })
                }
            })
        } else {
            classModal.find((err, data) => {
                if (err) {
                    return res.json({ success: false, error: err.message })
                }
                if (data) {
                    return res.status(200).json({ success: true, classes: data })
                } else {
                    return res.json({ success: false, classes: {} })
                }
            })
        }
    })
    .post((req, res) => {
        const { staffId, className, subject } = req.body;
        if (!staffId || !className || !subject) {
            return res.status(400).json({ success: false, error: "Missing Value fields" })
        }
        const classId = `${staffId}-${className}-${subject}`
        classModal.findOne({ classId: classId }, (err, data) => {
            if (err) {
                return res.json({ success: false, error: err.message })
            }
            if (data) {
                return res.json({ success: false, error: `Class with Staff id ${staffId},class ${className} and subject ${subject} already exists` })
            } else {
                classModal.create({ ...req.body, classId: classId }, (err, data) => {
                    if (err) {
                        return res.json({ success: false, error: err.message })
                    }
                    res.status(200).json({ success: true, class: data })
                })
            }
        })
    })
    .patch((req, res) => {
        const { classId, className, subject, staffId } = req.body
        if (!classId) {
            return res.status(400).json({ success: false, error: "class Id required" })
        }
        classModal.find({ classId: classId }, (err, data) => {
            if (err) {
                return res.json({ success: false, error: err.message })
            }
            if (data) {
                const newStaffId = staffId ? staffId : data[0].staffId
                const newClassName = className ? className : data[0].className
                const newSubject = subject ? subject : data[0].subject
                const newClassId = `${newStaffId}-${newClassName}-${newSubject}`
                classModal.updateOne({ classId: classId }, { $set: { ...req.body, classId: newClassId } }, (err, data) => {
                    if (err) {
                        return res.json({ success: false, error: err.message })
                    }
                    if (data) {
                        return res.status(200).json({ success: true, class: data })
                    }
                })
            } else {
                return res.status(404).json({ success: false, error: "class not found" })
            }
        })
    })
    .delete((req, res) => {
        const { classId } = req.body
        if (!classId) {
            return res.status(400).json({ success: false, error: "class Id required" })
        }
        classModal.deleteOne({ classId: classId }, (err, data) => {
            if (err) {
                return res.json({ success: false, error: err.message })
            }
            if (data.length !== 0) {
                res.status(200).json({ success: true })
            }
        })
    })

// Mark Attendence //////////////////////////////////////////////////////////////////////////////////////

app.route('/api/v1/student/attendance')
    .get()
    .post(async (req, res) => {
        const { id } = req.body
        studentModel.findOne({ id: id }, (err, data) => {
            if (err) {
                return res.json({ success: false, error: err.message })
            }
            if (data) {
                studentModel.updateOne({ id: id },
                    {
                        $set:
                        {
                            attendance: [
                                ...data.attendance,
                                {
                                    subject: "hindi",
                                    timestamp: new Date(),
                                    markedBy: "self",
                                    present: true
                                }]
                        }
                    }, (err, data) => {
                        if (err) {
                            return res.json({ success: false, error: err.message })
                        }
                        if (data) {
                            return res.status(200).json({ success: true, student: data })
                        }
                    })
            } else {
                res.json({ success: false, error: `Student not found` })
            }
        })
        const student = await studentModel.findOne({ name: 'Ryu' })
        student.attendance.push({
            subject: "hindi",
            timestamp: new Date(),
            markedBy: "self"
        })
        const updated = await student.save()
        res.json({ updated: updated })
    })
    .patch((req, res) => {
        db.collection("students").findAndModify
    })

app.route('/')
    .get((req, res) => {
        res.send("Server is running")
    })

app.listen(3030, () =>
    console.log('Server is up on Port 3030')
)