import { Button, makeStyles, MenuItem, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/appSlice';
import CustomAccordion from './ui/Accordion'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        margin: '10px',
        width: '34ch',
    },
}));

const CreateAttendenceSection = ({ classesData, expanded, setExpanded }) => {
    const classes = useStyles();
    const userData = useSelector(selectUser);
    const [error, setError] = useState({ id: '', message: '' });
    const [data, setData] = useState({ class: '', from: '', to: '', password: '' })

    const [progress, setProgress] = useState(false);
    console.log(data)
    const handleClick = () => {
        setError({ id: '', message: '' })
        if (
            data.class !== "" &&
            data.from !== "" &&
            data.to !== ""
        ) {
            // const subject = classData.subject.toLowerCase();
            // const id = `${classData.class}${classData.section}-${subject}`
            // const staffId = userData.staffId;
            // classesRef.doc(id).get().then(doc => {
            //     if (!doc.exists) {
            //         classesRef.doc(id).set({ ...classData, subject: subject, staffId, id })
            //     } else {
            //         setError({ id: "main", message: "Class Already Exists" })
            //     }
            // })
        } else {
            data.subject === "" && setError({ id: 'subject', message: 'Required' })
            data.section === "" && setError({ id: 'section', message: 'Required' })
            data.class === "" && setError({ id: 'class', message: 'Required' })
        }
    };

    console.log(data.from !== '' && data.from.toString())

    return (
        <div className="createAttendenceSection">
            <CustomAccordion
                expanded={expanded === 'panel2'}
                onChange={() => expanded === 'panel2' ? setExpanded('') : setExpanded('panel2')}
                title={<h4>Create Attendence Link</h4>}
                component={
                    <form className='CustomAccordion__form' >
                        <TextField
                            className={classes.textField}
                            variant="outlined"
                            label="Class"
                            select
                            onChange={e => setData({ ...data, class: e.target.value })}
                            error={error.id === 'class' ? true : false}
                            helperText={error.id === 'class' && error.message}
                        >
                            {classesData.map((classData) => (
                                <MenuItem
                                    key={`${classData.class}th-${classData.section.toUpperCase()} ${classData.subject.charAt(0).toUpperCase() + classData.subject.slice(1)}`}
                                    value={classData.id}
                                >
                                    {`${classData.class}th-${classData.section.toUpperCase()} ${classData.subject.charAt(0).toUpperCase() + classData.subject.slice(1)}`}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="time"
                            label="From"
                            type="time"
                            variant="outlined"
                            defaultValue="07:30"
                            onChange={(date) => setData({ ...data, from: date })}
                            className={classes.textField}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                        <TextField
                            id="time"
                            label="To"
                            type="time"
                            variant="outlined"
                            defaultValue="07:30"
                            onChange={e => setData({ ...data, to: e.target.value })}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                        <TextField
                            className={classes.textField}
                            type="select"
                            variant="outlined"
                            label="Password(optional)"
                            onChange={e => setData({ ...data, password: e.target.value })}
                            error={error.id === 'subject' ? true : false}
                            helperText={error.id === 'subject' && error.message}
                        />
                        {error.id === 'main' && <p className="form__error">{error.message}</p>}
                        <Button className="form__button" variant="contained" color="primary" onClick={handleClick}>
                            Create
                        </Button>
                    </form>
                }
            />
        </div>
    )
}

export default CreateAttendenceSection
