import { Avatar, Chip, Divider, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React from 'react'
import { useHistory } from 'react-router';

const ClassCard = ({ classData }) => {
    const history = useHistory();
    const handleClick = () => {
        history.push(`/application/dashboard/class/${classData.id}`)
    }

    return (
        <Chip
            color="primary"
            onClick={handleClick}
            className="classCard"
            label={`${classData.class}th-${classData.section.toUpperCase()} ${classData.subject.charAt(0).toUpperCase() + classData.subject.slice(1)}`}
        />
    )
}

export default ClassCard
