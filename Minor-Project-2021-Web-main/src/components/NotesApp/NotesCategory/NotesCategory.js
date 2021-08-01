import { data } from 'jquery'
import React from 'react'
import ClearIcon from '@material-ui/icons/Clear';

import './NotesCategory.css'
const NotesCategory = ({ notes, setQuery, query, searchResult, setSearchResult }) => {

    const handleClick = (query2) => {
        setSearchResult(notes.filter(({ id, note }) => note.type === query2));
        setQuery(query2)
    }

    const clearSearch = () => { setSearchResult([]); setQuery(""); }
    console.log(query)
    return (
        <div className="notesCategory">
            <div className="notesCategory__tags">
                <p className={query === 'book' ? "notesSearch__formClearIcon--categoryActive" : ''} onClick={() => handleClick("book")}>Books</p>
                <p className={query === 'Unit/Chapter' ? "notesSearch__formClearIcon--categoryActive" : ''} onClick={() => handleClick("Unit/Chapter")}>Unit/Chapter</p>
                <p className={query === 'specificTopic' ? "notesSearch__formClearIcon--categoryActive" : ''} onClick={() => handleClick("specificTopic")}>Topic Wise</p>
                <p className={query === 'handWritten' ? "notesSearch__formClearIcon--categoryActive" : ''} onClick={() => handleClick("handWritten")}>Hand Written</p>
                {query && <ClearIcon onClick={clearSearch} className="notesSearch__formClearIcon--category" />}
            </div>

        </div>
    )
}

export default NotesCategory
