const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser"); // 쿠키 파서 미들웨어 제거
const airRoutes = require("./routes/airRoutes"); // 라우트 임포트

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("DB 연결 성공");
}).catch((error) => {
    console.error("DB 연결 실패", error);
});

// 기본 라우트
app.get("/", (req, res) => {
    res.send("Hello Express");
});

// air 라우트 연결
app.use("/air", airRoutes); // /air 경로에 대한 라우트 연결

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// 에러 핸들링 미들웨어
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message || "서버에 문제가 발생했습니다.",
    });
});
