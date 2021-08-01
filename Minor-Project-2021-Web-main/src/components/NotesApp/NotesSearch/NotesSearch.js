import React, { useEffect } from 'react'
import './NotesSearch.css'
import { Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const NotesSearch = ({ notes, searchResult, setSearchResult, query, setQuery }) => {

    const searchFunction = () => {
        let arr = []
        for (let i = 0; i < notes.length; i++) {
            let str = notes[i].note.title.toLowerCase();
            if (str.match(query.toLowerCase())) {
                arr.push(notes[i]);
            }
        }
        arr && setSearchResult(arr)
    }

    const clearSearch = () => { setSearchResult([]); setQuery(""); }

    useEffect(() => { query && searchFunction() }, [query]);

    return (
        <div className="notesSearch">
            <form className="notesSearch__form">
                <Input
                    placeholder="Search Notes..."
                    className="notesSearch__formInput animate__animated animate__bounceInRight"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <SearchIcon className="notesSearch__formSearchIcon" />
                {query && <ClearIcon onClick={clearSearch} className="notesSearch__formClearIcon " />}
            </form>
        </div>
    )
}

export default NotesSearch
