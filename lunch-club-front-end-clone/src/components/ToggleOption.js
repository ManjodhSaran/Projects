import { FormGroup, Grid, Typography, withStyles } from '@material-ui/core'
import React from 'react'
import { Switch } from 'react-router-dom';
import '../styles/ToggleOption.scss'

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

const ToggleOption = ({ title, text }) => {
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    return (
        <div className='toggleOption'>
            <div className='toggleOption__info'>
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
            <FormGroup>
                <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item>
                            <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                        </Grid>
                    </Grid>
                </Typography>
            </FormGroup>
        </div>
    )
}

export default ToggleOption
