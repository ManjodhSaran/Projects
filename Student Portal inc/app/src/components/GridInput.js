import { Grid } from '@material-ui/core'
import React from 'react'

const GridInput = ({ icon, textfield, error }) => {
    return (
        <Grid container spacing={1} alignItems="center">
            <Grid item>
                {icon}
            </Grid>
            <Grid item>
                {textfield}
            </Grid>
        </Grid>
    )
}

export default GridInput
