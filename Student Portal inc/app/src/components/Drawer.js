import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router';


export default function CustomDrawer({ open, setOpen }) {
    const history = useHistory();

    return (
        <React.Fragment>
            <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
                <div className="drawer-content">
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button onClick={() => history.push('/')}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    </List>
                    <Divider />
                </div>
            </Drawer>
        </React.Fragment>

    );
}