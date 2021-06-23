import React from 'react'

const SelectVideo = ({ onChange }) => {
    return (
        <div>
            <input type="file" onChange={onChange} />
        </div>
    )
}

export default SelectVideo
