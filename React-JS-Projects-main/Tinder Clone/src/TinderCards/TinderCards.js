import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card';
import database from '../firebase';

import './TinderCards.css'
function TinderCards() {

    const [people, setPeople] = useState([]);

    useEffect(() => {
        database.collection('people').onSnapshot(snapshot => (
            setPeople(snapshot.docs.map(doc => doc.data()))
        ))
    }, []);

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    return (
        <div className="tinderCards">

            <div className="tinderCard__cardContainer">
                <div className="swipe">
                    <h2>No More Match</h2>
                </div>
                {shuffle(people).map(person => (
                    <TinderCard className="swipe" key={person.name} preventSwipe={['up', 'down']}>
                        <div
                            style={{ backgroundImage: `url(${person.url})` }}
                            className="card">
                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>))
                }
            </div>

        </div>
    )
}

export default TinderCards
