// index.js
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// PostgreSQL 연결
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// 서버 설정
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// 홈 페이지 (사용자가 입력할 수 있는 폼 제공)
app.get('/', (req, res) => {
  res.render('index');
});

// 데이터베이스에 사용자 정보 저장
app.post('/saveData', async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
    res.render('success', { user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('데이터 저장에 실패했습니다.');
  }
});

// 데이터베이스에서 사용자 정보 조회
app.get('/viewData', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.render('view', { users: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('데이터 조회에 실패했습니다.');
  }
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중`);
});
