import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Popup from "reactjs-popup";

import { userMessage, sendMessage } from "../actions/watson";

const Chat = ({chat, userMessage, sendMessage}) => {
    const [message, setMessage] = useState("");
    const endOfMessages = useRef(null);

    const handleClick = async (e) => {
        const code = e.keyCode || e.which;

        if (code === 13) {
            console.log(message)
            userMessage(message);
            sendMessage(message);
            setMessage("");
        }
    };

    return (
        <Popup trigger={<button className="popup">Chat</button>} position="bottom left">
        <div className='chat'>
            <h1>Assistente virtual SOS Ecoponto</h1>
            
            <div className="historyContainer">
            <p>Olá. Como posso ajudá-lo ?</p>
            {chat.length === 0 ? "" 
            : chat.map ((msg)=> <div className={msg.type}>
            {msg.message}</div>)}
            <div ref={endOfMessages}></div>
            </div>
            
            <input id='chatBox'
             onChange={(e)=> setMessage(e.target.value)} 
             onKeyPress={handleClick}
             value={message}>
             </input>
        </div>
        </Popup>
    );
};

const mapStateToProps = (state) => ({
    chat: state.watson.messages,
});

export default connect(mapStateToProps, { userMessage, sendMessage }) (Chat);
