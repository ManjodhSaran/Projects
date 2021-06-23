import { Button, CircularProgress, MenuItem, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { classesRef } from '../utils/firebase';
import { selectUser } from '../features/appSlice';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import CustomAccordion from './ui/Accordion';
import { Autocomplete } from '@material-ui/lab';
import { subjects } from '../static/subjects'
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

const CreateClass = ({ expanded, setExpanded }) => {
    const classes = useStyles();
    const userData = useSelector(selectUser);
    const [progress, setProgress] = useState(false);
    const [subjectNo, setSubjectNo] = useState(0);
    const [error, setError] = useState({ id: '', message: '' });
    const [classData, setClassData] = useState({ class: '', section: '', subject: subjects[0].value })

    const classesArr = [{ value: '6', label: '6th' }, { value: '7', label: '7th' }, { value: '8', label: '8th' }, { value: '9', label: '9th' }, { value: '10', label: '10th' }];
    const sectionsArr = [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }, { value: 'c', label: 'C' }];

    const handleClick = () => {
        setError({ id: '', message: '' })
        if (
            classData.class !== "" &&
            classData.section !== "" &&
            classData.subject !== ""
        ) {
            setProgress(true);
            const subject = classData.subject.toLowerCase();
            const id = `${classData.class}${classData.section}-${subject}`
            const staffId = userData.staffId;
            classesRef.doc(id).get().then(doc => {
                if (!doc.exists) {
                    classesRef.doc(id).set({ ...classData, subject: subject, staffId, id })
                        .then(() => {
                            setClassData({ class: '', section: '', subject: subjects[0].value });
                            setProgress(false);
                        })
                } else {
                    setError({ id: "main", message: "Class Already Exists" });
                    setProgress(false);
                }
            })
        } else {
            classData.subject === "" && setError({ id: 'subject', message: 'Required' });
            classData.section === "" && setError({ id: 'section', message: 'Required' });
            classData.class === "" && setError({ id: 'class', message: 'Required' });
            setProgress(false);
        }
    }

    return (
        <div className='createClass'>
            <CustomAccordion
                expanded={expanded === 'panel1'}
                onChange={() => expanded === 'panel1' ? setExpanded('') : setExpanded('panel1')}
                title={<h4>Create Class</h4>}
                component={
                    <form className='CustomAccordion__form' >
                        <TextField
                            className={classes.textField}
                            variant="outlined"
                            label="Class"
                            select
                            value={classData.class}
                            onChange={e => setClassData({ ...classData, class: e.target.value })}
                            error={error.id === 'class' ? true : false}
                            helperText={error.id === 'class' && error.message}
                        >
                            {classesArr.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            className={classes.textField}
                            variant="outlined"
                            label="Section"
                            value={classData.section}
                            select
                            onChange={e => setClassData({ ...classData, section: e.target.value })}
                            error={error.id === 'section' ? true : false}
                            helperText={error.id === 'section' && error.message}
                        >
                            {sectionsArr.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Autocomplete
                            id="combo-box-subjects"
                            className={classes.textField}
                            label="Subject"
                            value={subjects[subjectNo]}
                            options={subjects}
                            getOptionLabel={(option) => option.value}
                            onChange={(event, value) => {
                                setClassData({ ...classData, subject: value?.value });
                                setSubjectNo(value.no);
                            }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Subject"
                                    variant="outlined"
                                />
                            }
                        />
                        {error.id === 'main' && <p className="form__error">{error.message}</p>}
                        <Button
                            className="form__button"
                            disabled={progress}
                            startIcon={progress && <CircularProgress size={16} />}
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                        >
                            Create
                        </Button>
                    </form>
                }
            />
        </div>
    )
}

export default CreateClass
