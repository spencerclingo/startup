const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const WebSocket = require('ws');

const app = express();

const { MongoClient } = require('mongodb')
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/?retryWrites=true&w=majority&appName=Cluster0`

// Connect to DB Cluster
const client = new MongoClient(url);

async function testConnection() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}
testConnection();

const db = client.db('dayflow');
const collectionUsers = db.collection('users');
const collectionEvents = db.collection('events');
const collectionTasks = db.collection('tasks');

const authCookieName = 'token';

// The events and users are saved in memory and disappear whenever the service is restarted.
let users = [];
let events = [];
let tasks = [];

// I can't access APIs without this for some reason
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
const path = require('path');
const {WebSocketServer} = require("ws");
app.use(express.static(path.join(__dirname, 'public')));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    // console.log("attempting create");

    const body = req.body;
    if (await findUser('username', body.username)) {
        // console.log("user already exists");

        res.status(409).send({ msg: 'User already exists' });
    } else {
        const user = await createUser(body.username, body.password);

        setAuthCookie(res, user.token);

        // console.log("successful create");

        res.send({ username: user.username });
    }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    // console.log("attempting login");
    const body = req.body;
    // console.log(`Username in /auth/login: ${req.body.username}`);

    const user = await findUser('username', body.username);
    if (user) {
        if (await bcrypt.compare(body.password, user.password)) {
            // Generate new token
            user.token = uuid.v4();

            // Update token in MongoDB
            await collectionUsers.updateOne(
                { username: user.username },
                { $set: { token: user.token } }
            );

            setAuthCookie(res, user.token);
            res.send({ username: user.username });
            // console.log("successful login");
            return;
        }
    }
    // console.log("unsuccessful login");
    res.status(401).send({ msg: 'Unauthorized' });
});


// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    // console.log("verifyAuth");
    const user = await findUser('token', req.cookies[authCookieName]);

    if (user) {
        // console.log(`user retrieved via token: ${user.token}`);
        req.user = user;
        next();
    } else {
        // console.log(`user not returned from findUser`);
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

apiRouter.get('/auth/user', verifyAuth, async (req, res) => {
    res.status(200).send("Authenticated")
});

// GetScores
apiRouter.get('/events', verifyAuth, async (req, res) => {
    // console.log("Attempting to get events")
    const userEvents = await collectionEvents.find({username: req.user.username}).toArray();
    //
    // console.log(userEvents);
    res.send(userEvents);
});

// SubmitScore
apiRouter.post('/event', verifyAuth, async (req, res) => {
    const body = req.body;

    const newEvent = {
        event_name: body.event_name,
        start_time: body.start_time,
        end_time: body.end_time,
        username: body.username
    }
    await collectionEvents.insertOne(newEvent);
    // events.push(newEvent)
    res.send(newEvent);
});

apiRouter.delete('/events', verifyAuth, async (req, res) => {
    // const username = req.user.username;

    const result = await collectionEvents.deleteMany({username: req.user.username})
    // console.log(`Deleted ${result.deletedCount} events`);

    res.status(200).send({msg: 'Events deleted'});
})

apiRouter.post('/task', verifyAuth, async (req, res) => {
    const body = req.body;

    const newTask = {
        title: body.title,
        username: body.username
    }
    const result = await collectionTasks.insertOne(newTask);
    // console.log(`Added? ${result.acknowledged}`);
    // tasks.push(newTask);
    res.send(newTask);
});

apiRouter.get('/tasks', verifyAuth, async (req, res) => {
    // console.log("Attempting to get tasks")
    const result = await collectionTasks.find({ username: req.user.username }).toArray();
    // console.log(result);
    res.send(result);
});

apiRouter.delete('/task', verifyAuth, async (req, res) => {
    const deleteTask = req.body.title;
    const username = req.body.username;
    // console.log("Attempting to delete: ", deleteTask, username)
    // console.log(req.body)

    const result = await collectionTasks.deleteOne({username: req.body.username, title: req.body.title})
    if (result.acknowledged) {
        if (result.deletedCount === 0) {
            res.status(404).send({msg: 'Task not found'});
            // console.log("failed to delete task");
        } else {
            res.status(200).send({msg: 'Task deleted'});
            // console.log("success in deletion")
        }
    }
});

apiRouter.get('/inspiration', async (req, res) => {
    try {
        const response = await fetch('https://api.quotable.io/random');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        res.json({ quote: data.content, author: data.author });
    } catch (error) {
        // console.error('API Error:', error);
        res.status(500).json({ error: 'Failed to fetch quote' + error.msg });
    }
});

// Handle client-side routing - return index.html for all unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
    };
    await collectionUsers.insertOne(user);

    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    const query = {};
    // console.log(`value: ${value}`);
    query[field] = value;
    // console.log(`query: `, query);

    const result = await collectionUsers.findOne( query );

    // console.log(`result: `, result);
    return result;
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const socketServer = new WebSocketServer({ server });

socketServer.on('connection', (socket) => {
    console.log("new connection");
    socket.isAlive = true;

    // Forward messages to everyone except the sender
    socket.on('message', function message(data) {
        socketServer.clients.forEach(function each(client) {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });

    // Respond to pong messages by marking the connection alive
    socket.on('pong', () => {
        socket.isAlive = true;
    });
});

// Periodically send out a ping message to make sure clients are alive
setInterval(() => {
    socketServer.clients.forEach(function each(client) {
        if (client.isAlive === false) return client.terminate();

        client.isAlive = false;
        client.ping();
    });
}, 10000);
