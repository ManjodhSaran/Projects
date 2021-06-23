import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import '../styles/GetStarted.scss'
const GetStarted = () => {
    const [value, setValue] = useState('')
    const history = useHistory();
    return (
        <div className="getStarted no-select">
            <div className="getStarted__container">
                <h2>You are {value}</h2>
                <div className="getStarted__buttons">
                    <Button
                        onMouseOver={() => setValue("Student")}
                        // onMouseOut={() => setValue("")}
                        onClick={() => history.push('/student/signup')}
                        style={{ margin: '10px' }}
                        variant={'outlined'}
                        startIcon={<img className="getStarted__img"
                            src="https://iconarchive.com/download/i108934/google/noto-emoji-people-profession/10213-woman-student-light-skin-tone.ico" />}
                    >Student
                </Button>
                    <Button
                        onMouseOver={() => setValue("Teacher")}
                        // onMouseOut={() => setValue("")}
                        onClick={() => history.push('/teacher/signup')}
                        style={{ margin: '10px' }} variant={'outlined'}
                        startIcon={<img className="getStarted__img"
                            src="https://i.pinimg.com/originals/55/69/55/5569554b4d8a9bb11965949e1af08dbf.png" />}>
                        Teacher
                </Button>
                </div>
            </div>
        </div>
    )
}

export default GetStarted