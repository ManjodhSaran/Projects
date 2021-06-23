import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import StudentSignin from '../components/StudentSigninForm'
import TeacherSignin from '../components/TeacherSigninForm'
import '../styles/Signin.scss'
import { auth } from '../utils/firebase'

const Signin = () => {
    const [selector, setSelector] = useState(1);

    const [user] = useAuthState(auth);
    return (
        <div className="signin">
            <div className="signin__container">
                <div className="signin__buttons">
                    <Button
                        onClick={() => setSelector(1)}
                        startIcon={
                            <img
                                className="signin__buttonImg"
                                src="https://iconarchive.com/download/i108934/google/noto-emoji-people-profession/10213-woman-student-light-skin-tone.ico"
                            />}
                    >
                        Student
                    </Button>
                    <div className="signin__vl"></div>
                    <Button
                        onClick={() => setSelector(2)}
                        startIcon={
                            <img
                                className="signin__buttonImg"
                                src="https://i.pinimg.com/originals/55/69/55/5569554b4d8a9bb11965949e1af08dbf.png"
                            />}
                    >
                        Teacher
                    </Button>
                </div>
                <div className="signin__hl"></div>
                {selector === 1 && <StudentSignin />}
                {selector === 2 && <TeacherSignin />}
            </div>
        </div>
    )
}

export default Signin
