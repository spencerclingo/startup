export class ChatClient {
    observers = [];
    connected = false;

    constructor() {

        // Adjust the webSocket protocol to what is being used for HTTP
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        // Display that we have opened the webSocket
        this.socket.onopen = (event) => {
            this.notifyObservers('system', 'websocket', 'connected');
            this.connected = true;
        };

        // Display messages we receive from our friends
        this.socket.onmessage = async (event) => {
            const text = await event.data.text();
            const chat = JSON.parse(text);
            this.notifyObservers('received', chat.username, chat.msg);
        };

        // If the webSocket is closed then disable the interface
        this.socket.onclose = (event) => {
            this.notifyObservers('system', 'websocket', 'disconnected');
            this.connected = false;
        };
    }

    // Send a message over the webSocket
    sendMessage(msg) {
        const username = localStorage.getItem('username');
        this.notifyObservers('sent', username, msg);
        this.socket.send(JSON.stringify({ username, msg }));
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers(event, from, msg) {
        this.observers.forEach((h) => h({ event, from, msg }));
    }
}