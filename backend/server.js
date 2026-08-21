require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysqlPool = require('./db/mysql');
require('./db/mongo');
const { askQwen } = require('./services/ai');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/gloss', async (req, res) => {
  const gloss = await askQwen(`Convert to ISL gloss: ${req.body.text}`);
  res.json({ gloss });
});
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
app.listen(5000, () => console.log('Backend on :5000'));