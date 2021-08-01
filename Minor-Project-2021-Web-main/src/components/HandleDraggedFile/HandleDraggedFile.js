import React, { useEffect, useRef, useState } from 'react'
import GetAppIcon from '@material-ui/icons/GetApp';
import './HandleDraggedFile.css'
const HandleDraggedFile = ({ setFile }) => {

    const handleFileDiv = useRef()

    const [dragActive, setDragActive] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const dropArea = handleFileDiv.current
        dropArea.addEventListener('dragenter', () => setDragActive(true), false)
        dropArea.addEventListener('dragleave', () => setDragActive(false), false)

        return () => {
            dropArea.removeEventListener('dragenter', () => setDragActive(true))
            dropArea.removeEventListener('dragleave', () => setDragActive(false))
        }
    }, [])


    const dropZone = document.getElementById('dropZone');

    dropZone && dropZone.addEventListener('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });

    dropZone && dropZone.addEventListener('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
        var files = e.dataTransfer.files; // Array of all files
        console.log(files[0])
        setFile(files[0])
    });

    return (
        <div id="dropZone" className={`handleDraggedFile ${dragActive && 'handleDraggedFile--active'} `} ref={handleFileDiv}>
            <div className='handleDraggedFile__container' ref={handleFileDiv}>
                <h1>Drop Here</h1>
                <GetAppIcon className="handleDraggedFileIcon" />
            </div>
        </div>
    )
}

export default HandleDraggedFile
