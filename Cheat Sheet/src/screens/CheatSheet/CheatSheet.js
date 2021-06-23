import React, { useEffect, useRef, useState } from 'react'
import { appData, storage } from '../../utils/firebase'
import './CheatSheet.css'
import firebase from 'firebase'
import $ from "jquery";

import Switch from "react-switch";

const CheatSheet = () => {
    const href = window.location.pathname;
    const subjectId = href.split('/')[2];

    const [data, setData] = useState([])
    const [show, setShow] = useState(-1);
    const [active, setActive] = useState(false);

    const [q, setQ] = useState('');
    const [rawA, setRawA] = useState('');
    const [file, setFile] = useState(null);
    const [hoverAction, setHoverAction] = useState(false);

    const [uploading, setUploading] = useState(false);
    const subjectData = appData.doc(subjectId).collection('subjectData')
    useEffect(() => {
        subjectData.orderBy('timestamp', 'desc').onSnapshot(snapshot =>
            setData(snapshot.docs.map(doc => doc.data())))
    }, [])

    const addQuestion = (e) => {
        e.preventDefault();

        setUploading(true);

        if (q) {
            if (rawA || file) {
                const timestamp = firebase.firestore.FieldValue.serverTimestamp();
                const a = $('TextArea').val()?.split('\n');

                if (file) {
                    const uploadTask = storage.ref(`${subjectId}/${file.name}`).put(file);
                    uploadTask.on("state_changed", snapshot => { }, (error) => {
                        console.log(error);
                        alert(error.message)
                    }, () => {
                        storage.ref(`${subjectId}/${file.name}`).getDownloadURL()
                            .then(url => subjectData.add({ q, a, file: url, timestamp }))
                            .catch(error => alert(error.message))
                    })
                }
                if (rawA) {
                    subjectData.add({ q, a, timestamp })
                }

            }
        }
        setQ('');
        setRawA('');
        setFile(null)
        setActive(false);
        setUploading(false);
    }
    console.log(data)
    const toggle = (i) => (show === i) ? setShow(-1) : setShow(i)
    const handleFile = (e) => {
        e.preventDefault();
        const data = e.target.files[0];
        data ? setFile(data) : setFile(null)
    }
    console.log(file)
    console.log(typeof file)
    return (
        <div className="cheatSheet">
            <div className="cheatSheet__switch" onClick={() => setHoverAction(!hoverAction)}>
                <h4 style={{ color: hoverAction ? "#F1C107" : '#586994' }}>Show Answer on {hoverAction ? 'Hover ' : 'Click'}</h4>
            </div>
            <div className="add__qa noselect">
                <h3 title="Add Questions" onClick={() => setActive(!active)}><span><span>+</span></span></h3>
                {active && <form className="add__qa__form">
                    <div>
                        <input value={q} onChange={(e) => setQ(e.target.value)} type="text" placeholder="Question" />
                    </div>
                    <div className="add_a">
                        <textarea id="TextArea" wrap="hard" value={rawA} onChange={(e) => setRawA(e.target.value)} rows="5" type="text" placeholder="Answer" />
                        <div>
                            <h3>Image: </h3>
                            <input type='file' onChange={handleFile} accept="image/*" placeholder="image" />
                            <p>(optional)</p>
                        </div>
                    </div>
                    <button type="submit" disabled={uploading} onClick={addQuestion}>Add</button>
                </form>
                }
            </div>
            <div className='cheatSheet__data'>
                {data.length !== 0 ? data.map(({ q, a, file }, i) =>
                    <div key={q, i, a, i} className="qa"
                        onMouseEnter={() => hoverAction && toggle(i)} onMouseLeave={() => hoverAction && toggle(i)}
                    >
                        <h2 className="q" onClick={() => toggle(i)}>{q}</h2>
                        <div className={`a ${show === i && 'a__show'}`} >
                            {a.length !== 0 && a.map((line, j) =>
                                <>
                                    <p key={"line data", j}>{line}</p>
                                    {file && <img src={file} />}
                                </>
                            )}
                        </div>
                    </div>
                )
                    :
                    <div>
                        {/* <h2>{'Loading...'}</h2> */}
                    </div>
                }
            </div>
        </div >
    )
}

export default CheatSheet
