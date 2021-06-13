import { Button, CircularProgress, Divider, List } from '@material-ui/core'
import React, { useState } from 'react'
import EmailCard from './EmailCard'
import { useCollection } from 'react-firebase-hooks/firestore';
import AddIcon from '@material-ui/icons/Add'
import ComposeModal from './ComposeModal'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, mails } from '../utils/firebase';

const Sidebar = () => {
    const [user] = useAuthState(auth);
    const [value, loading, error] = useCollection(
        mails.where('to', '==', user.email),
        { snapshotListenOptions: { includeMetadataChanges: true } }
    );
    const [openCompose, setOpenCompose] = useState(false);

    return (
        <div className="sidebar noselect">
            <div className="compose">
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon fontSize={'large'} />}
                    onClick={() => setOpenCompose(true)}
                >Compose
                </Button>
                {openCompose && <ComposeModal open={openCompose} setOpen={setOpenCompose} />}
            </div>
            <Divider />
            <div className="inbox">
                <h3><span>I</span>nbox</h3>
                <List className="emails">
                    {!loading
                        ?
                        value.docs.map(doc => <EmailCard data={doc.data()} />)
                        :
                        <CircularProgress size={25} />
                    }

                </List>
            </div>
        </div>
    )
}

export default Sidebar
