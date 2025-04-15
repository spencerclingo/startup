const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
// const {useState, useEffect} = require("react");
const app = express();

const authCookieName = 'token';

// The events and users are saved in memory and disappear whenever the service is restarted.
let users = [];
let events = [];
let tasks = [];

// I can't access APIs without this for some reason
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

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

    const user = await findUser('username', body.username);
    if (user) {
        if (await bcrypt.compare(body.password, user.password)) {
            user.token = uuid.v4();
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
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

apiRouter.get('/auth/user', verifyAuth, async (req, res) => {
    res.status(200).send("Authenticated")
});

// GetScores
apiRouter.get('/events', verifyAuth, (req, res) => {
    console.log("Attempting to get events")
    const userEvents = events.filter(event => event.username === req.user.username);
    console.log(userEvents);
    res.send(userEvents);
});

// SubmitScore
apiRouter.post('/event', verifyAuth, (req, res) => {
    const body = req.body;

    const newEvent = {
        event_name: body.event_name,
        start_time: body.start_time,
        end_time: body.end_time,
        username: body.username
    }
    events.push(newEvent)
    res.send(newEvent);
});

apiRouter.delete('/events', verifyAuth, (req, res) => {
    const username = req.user.username;

    events = events.filter(event => event.username !== username);

    res.status(200).send({ msg: 'Events deleted' });
})

apiRouter.post('/task', verifyAuth, (req, res) => {
    const body = req.body;

    const newTask = {
        title: body.title,
        username: body.username
    }
    tasks.push(newTask)
    res.send(newTask);
    console.log(tasks)
});

apiRouter.get('/tasks', verifyAuth, (req, res) => {
    console.log("Attempting to get tasks")
    const userTasks = tasks.filter(task => task.username === req.user.username);
    console.log(userTasks);
    res.send(userTasks);
});

apiRouter.delete('/task', verifyAuth, (req, res) => {
    const deleteTask = req.body.title;
    const username = req.body.username;
    console.log("Attempting to delete: ", deleteTask, username)
    console.log(req.body)

    const index = tasks.findIndex(
        task => task.title === deleteTask && task.username === username
    );

    if (index !== -1) {
        tasks.splice(index, 1);
        res.status(200).send({ msg: 'Task deleted' });
        console.log("success in deletion")
    } else {
        res.status(404).send({ msg: 'Task not found' });
    }
});

apiRouter.get('/inspiration', async (req, res) => {
    try {
        // console.log(1)
        const response = await fetch('https://api.quotable.io/random');
        // console.log(2)
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        // console.log(3)
        const data = await response.json();
        // console.log(4)
        res.json({ quote: data.content, author: data.author });
        // console.log(5)
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Failed to fetch quote' + error.msg });
    }
});

// Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    console.log("Requested Path:", _req.path); // Logs the path of the request
    console.log("Request Body:", _req.body);  // Logs the body of the request (if applicable)
    console.log("Request method: ", _req.method);

    res.send("Request logged");
});


async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
    };
    users.push(user);

    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
