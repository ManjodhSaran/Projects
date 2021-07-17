import React, { useState } from 'react'
import '../styles/EditField.scss'

const EditField = ({ icon, text }) => {
    const [enableEdit, setEnableEdit] = useState(false);
    return (
        <div className='editField'>
            {icon &&
                <img src={icon} alt="" />
            }
            <input type="text" value={text} disabled={!enableEdit} />
            {enableEdit ?
                <button onClick={() => setEnableEdit(false)}>cancel</button>
                :
                <button onClick={() => setEnableEdit(true)}>edit</button>
            }
        </div>
    )
}

export default EditField
