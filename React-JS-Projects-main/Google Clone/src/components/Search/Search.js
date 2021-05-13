import React, { useState } from 'react'

import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';

import './Search.css'
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';

function Search({ hideButtons, searchTerm }) {

    const [{ term }, dispatch] = useStateValue();

    const [input, setInput] = useState("");
    const history = useHistory();

    const search = (e) => {
        e.preventDefault();

        dispatch({
            type: "SET_SEARCH_TERM",
            term: input,
        })

        history.push('/search');
    }

    return (
        <form className="search">
            <div className="search__input">
                <SearchIcon />

                <input type="text"
                    value={input || searchTerm}
                    onChange={e => setInput(e.target.value)}
                />

                <MicIcon />
            </div>
            <div className={`search__button ${hideButtons && "hide__buttons"}`}>
                <Button type="submit" disabled={!input} onClick={search} variant="outlined">Google Search</Button>
                <Button variant="outlined">I'm Feeling Lucky</Button>
            </div>
        </form>
    )
}

export default Search
