import React, { useState, useEffect } from 'react';
import queryString from "query-string";
import io from 'socket.io-client';

// Component
import InfoBar from "../InfoBar/InfoBar.js"
import Input from "../Input/Input.js"
import Messages from "../Messages/Messages.js"
import AllUsers from "../AllUsers/AllUsers.js"

//Stylesheet
import "./Chat.css";

let socket;

const Chat = ({ location }) => {
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState("");

    // Node Server Url
    const ENDPOINT = "https://chaterr-app.herokuapp.com/";

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit("join", { name, room }, (callBack) => {
            setUsers([...users, name]);

            callBack && setError(callBack);

        });


        return () => {
            socket.emit("disconnect");

            socket.off();
        }

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message]);
        });
    });

    const sendMessage = (event) => {
        event.preventDefault();
        message && socket.emit("sendMessage", message, () => setMessage(""));
    };

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <AllUsers users={users} />
        </div>
    );
}

export default Chat;


