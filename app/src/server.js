const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { pool } = require('./db');
const authRouter = require('./routes/auth');
const todosRouter = require('./routes/todos');
const { authMiddleware } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

// API routes
app.use('/api/auth', authRouter);
app.use('/api/todos', authMiddleware, todosRouter);

// Page routes — serve HTML
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'dashboard.html'));
});

app.get('/todos', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'todos.html'));
});

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.listen(PORT, () => {
  console.log(`TODO app running on http://localhost:${PORT}`);
});
