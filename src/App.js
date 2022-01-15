import React, {useEffect, useState, useRef} from "react";
import {io} from "socket.io-client";

var socket = io("ws://127.0.0.1:5000")

const App = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [messagesHTML, setMessagesHTML] = useState([]);
    const lastestMessages = useRef(null);

    lastestMessages.current = messages;

    useEffect(() => {

        setMessagesHTML([messages.map((el) => {return renderMessage(el)}) ])
        }, [messages]);


    useEffect(() => {
        const addElements = () => { socket.on("message", msg => {
            console.log(msg)
            setMessages([...lastestMessages.current, msg])});
        };
        addElements();
    },[]);


// https://stackoverflow.com/questions/54824036/useeffect-hook-with-socket-io-state-is-not-persistent-in-socket-handlers

    const onClick = () => {
        if (message.length > 2){   
            socket.emit("message", message);
            setMessage("")
        }
        else{
            alert('Message to short')
        }
    }

    const onChange = (e) => {
        setMessage(e.target.value)
    }

    const renderMessage= (msg) =>{return (<div key={msg}><p>{msg}</p></div>)}

    return (
        <div>
            {messagesHTML}
            <input value = {message} name = "message" onChange={e => onChange(e) }/>
            <button onClick={() => onClick()}>Send Message</button>
            <p></p>
        </div>
    );
};

export default App;
