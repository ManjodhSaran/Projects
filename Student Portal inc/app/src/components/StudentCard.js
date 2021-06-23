import React from 'react'
import '../styles/StudentCard.scss'

const StudentCard = ({ student }) => {
    console.log(student)
    return (
        <div className="studentCard">
            <h4>{student.name}</h4>
        </div>
    )
}

export default StudentCard
