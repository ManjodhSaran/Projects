import { CircularProgress, Divider, TextareaAutosize } from '@material-ui/core'
import React, { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { selectEmailData, setEmailData } from '../features/appSlice';
import TimeAgo from 'timeago-react';
import { mails } from '../utils/firebase';

const EmailViewer = () => {
    const data = useSelector(selectEmailData);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const deleteMail = () => {
        setLoading(true);
        mails.doc(data.id).delete().then(() => {
            setLoading(false);
            dispatch(setEmailData(null))
        })
    }

    return (
        <div className="emailViewer">
            {data ?
                <>
                    <div className="emailViewer__header">
                        {data.subject
                            ?
                            <div>
                                <h4>{data.subject}</h4>
                                <h6>{data.from.charAt(0).toUpperCase() + data.from.slice(1)}</h6>
                            </div>
                            :
                            <h4>{data.from.charAt(0).toUpperCase() + data.from.slice(1)}</h4>
                        }
                        {!loading ?
                            <DeleteIcon onClick={deleteMail} />
                            :
                            <CircularProgress size={16} color={'inherit'} />
                        }
                    </div>
                    <Divider />
                    <TimeAgo datetime={data.timestamp} />
                    <div className="emailViewer__message">
                        <TextareaAutosize
                            className="textarea-scrollbar scrollbar-outer"
                            rowsMin={15}
                            rowsMax={50}
                            value={JSON.parse(data.text)}
                            disabled={true}
                            spellCheck='false'
                        />
                    </div>
                </>
                :
                <div className="emailViewer__noEmail">
                    <h2><span>M</span>ock <span>M</span>ails</h2>
                </div>
            }
        </div>
    )
}

export default EmailViewer
