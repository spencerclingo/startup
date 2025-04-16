import React from 'react';

export function Chat({ webSocket }) {
    const [name, setName] = React.useState('');

    const username = localStorage.getItem('username');

    return (
        <main>
            {/*<Name updateName={setName} />*/}
            <Message name={username} webSocket={webSocket} />
            <Conversation webSocket={webSocket} />
        </main>
    );
}
export function Message({ name, webSocket }) {
    const [message, setMessage] = React.useState('');

    function doneMessage(e) {
        if (e.key === 'Enter') {
            sendMsg();
        }
    }

    function sendMsg() {
        webSocket.sendMessage(message);
        setMessage('');
    }

    return (
        <main>
            <fieldset id='chat-controls'>
                <legend>Chat</legend>
                <input onKeyDown={(e) => doneMessage(e)} value={message} onChange={(e) => setMessage(e.target.value)} type='text' />
                <button onClick={sendMsg}>
                    Send
                </button>
            </fieldset>
        </main>
    );
}
export function Conversation({ webSocket }) {
    const [chats, setChats] = React.useState([]);
    React.useEffect(() => {
        webSocket.addObserver((chat) => {
            setChats((prevMessages) => [...prevMessages, chat]);
        });
    }, [webSocket]);

    const chatEls = chats.map((chat, index) => (
        <div key={index}>
            <span className={chat.event}>{chat.from}</span> {chat.msg}
        </div>
    ));

    return (
        <main>
            <div id='chat-text'>{chatEls}</div>
        </main>
    );
}