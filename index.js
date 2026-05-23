require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Built-in JSON parsing middleware
app.use(express.json());

// BONUS: Custom middleware to log requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    next();
});

// 2. Serve a static HTML page at /
// Note: Create a 'public' folder and put an 'index.html' file inside it.
app.use(express.static(path.join(__dirname, 'public')));

// 3. GET / -> Returns text (If index.html exists, it may override this root route depending on configuration)
app.get('/text-api', (req, res) => {
    res.send("My Week 2 API!");
});

// 4. POST /user -> Accepts {name, email} with 400 error handling
app.post('/user', (req, res) => {
    const { name, email } = req.body;

    // Error handling for missing data
    if (!name || !email) {
        return res.status(400).json({ error: "Missing required fields: name and email are required." });
    }

    res.send(`Hello, ${name}!`);
});

// 5. GET /user/:id -> "User [id] profile"
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ${userId} profile`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
