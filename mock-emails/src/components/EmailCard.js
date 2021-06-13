import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setEmailData } from '../features/appSlice';
import TimeAgo from 'timeago-react';

const EmailCard = ({ data }) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setEmailData({ ...data, timestamp: data.timestamp.toDate() }))
    }
    return (
        <>
            <ListItem onClick={handleClick} className="emailCard">
                <ListItemAvatar>
                    <Avatar>{data?.from?.charAt(0).toUpperCase()}</Avatar>
                </ListItemAvatar>
                {/* <ListItemText primary={data.from} secondary={data.subject ? data.subject : <TimeAgo date={data.timestamp.toDate()} />} /> */}
                <ListItemText primary={data.from} secondary={data.subject} />
            </ListItem>

            <Divider variant="inset" component="li" />
        </>
    )
}

export default EmailCard
