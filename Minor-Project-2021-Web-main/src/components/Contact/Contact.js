import React, { useEffect, useState } from 'react'
import { Input } from '@material-ui/core'
import firebase from 'firebase'
import './Contact.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, showNotification } from '../../features/appSlice';
import { db } from '../../utils/firebase';
import { useHistory } from 'react-router-dom'
const Contact = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [bug, setbug] = useState("")
    const [issue, setIssue] = useState("")
    const [other, setOther] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            setName(user.displayName);
            setEmail(user.email);
            setPhone(user.phoneNumber);
        }
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            if (issue || bug || other) {
                db
                    .collection('admin')
                    .doc("appData")
                    .collection('contactUs')
                    .add({
                        userID: user ? user.uid : null,
                        user: name,
                        email: email,
                        phoneNumber: phone,
                        issue: issue,
                        bug: bug,
                        other: other,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    }).then(() => dispatch(showNotification(`You issue has been reported. You will get respond within 24 hrs.`)))
                    .then(history.replace("/"))
            } else {
                setError("Data Fields Missing")
            }
        }
    }

    return (
        <div className="contact">
            <div className="contact__container">
                <h2>Contact us</h2>
                <form>
                    <Input value={name} onChange={(e) => setName(e.target.value)} className="contact__input" placeholder="name" />
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} className="contact__input" placeholder="email" />
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="contact__input" placeholder="phone no." />
                    <Input value={bug} onChange={(e) => setbug(e.target.value)} className="contact__input" placeholder="report a bug" />
                    <Input value={issue} onChange={(e) => setIssue(e.target.value)} className="contact__input" placeholder="report an Issue" />
                    <Input value={other} onChange={(e) => setOther(e.target.value)} className="contact__input" placeholder="Other" />
                    {error && <p className="setupApp__error">{error}</p>}
                    <button type="submit" onClick={handleSubmit} className="contact__button">submit</button>
                </form>
                <div className="contact__containerOr">
                    <h2>Or </h2>
                </div>
                <h6>Email us at <span>gne.notes@gmail.com</span></h6>
            </div>

        </div>
    )
}
export default Contact