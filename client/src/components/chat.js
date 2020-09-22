import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import Popup from "reactjs-popup";
import { AiOutlineWechat } from 'react-icons/ai';
import ScrollableFeed from 'react-scrollable-feed'

import { userMessage, sendMessage } from "../actions/watson";



const Chat = ({chat, userMessage, sendMessage}) => {

    const [message, setMessage] = useState("");
    // const endOfMessages = useRef(null);

    //         useEffect(() => {
    //             endOfMessages.current.scrollIntoView ({ block: 'end'});
    //         });
    
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
         <Popup trigger={<button className="popup">
          <AiOutlineWechat />
          </button>} 
          position="bottom left"
         >
         
            <div className='chat'>
                <h1>Assistente Virtual SOS Ecoponto</h1>
                
                
                <div className="historyContainer">
                <ScrollableFeed>
                <p>Olá. Como posso ajudá-lo ?</p>
                {chat.length === 0 ? "" 
                : chat.map ((msg)=> <div className={msg.type}>
                {msg.message}</div>)}
                </ScrollableFeed>
                </div>
                <div className="input">
                <input id='chatBox'
                onChange={(e)=> setMessage(e.target.value)} 
                onKeyPress={handleClick}
                value={message}>
                </input>
                </div>
            </div>
         </Popup>
    );
};

const mapStateToProps = (state) => ({
    chat: state.watson.messages,
});

export default connect(mapStateToProps, { userMessage, sendMessage }) (Chat);
