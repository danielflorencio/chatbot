import express from 'express';
import { loadMessages, sendMessage } from './endpoints/messages';
import { authenticateToken } from './authMiddleware';
import { login, register } from './endpoints/auth';
import { newConversation } from './endpoints/conversation';

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post('/api/register', register);
app.post('/api/login', login);
app.get('/api/messages', authenticateToken, loadMessages);
app.post('/api/messages', authenticateToken, sendMessage);
app.post('/api/newConversation', authenticateToken, newConversation);

module.exports = { app };