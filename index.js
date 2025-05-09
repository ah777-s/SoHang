require('dotenv').config();  // .env 파일을 로드하기 위해 dotenv 패키지를 사용

const express = require('express');
const { Pool } = require('pg');  // PostgreSQL에 연결하기 위해 pg 패키지를 사용

const app = express();

// PostgreSQL 연결 설정
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중`);
});