import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { FormControlLabel } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: '20px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default function AccordionCustom({ ques, ans }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);


    return (
        <div className={classes.root}>
            <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
                <AccordionSummary
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <FormControlLabel
                        aria-label="Acknowledge"
                        className={classes.heading}
                        control={expanded ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
                    />
                    <Typography className={classes.heading}>{ques}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {ans}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
