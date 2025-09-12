const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const airRoutes = require("./routes/airRoutes"); // 라우트 임포트

const app = express();
const PORT = process.env.PORT || 3000;

// 필수 환경 변수 체크
if (!process.env.MONGO_URI || !process.env.FRONT_ORIGIN) {
    console.error("필수 환경 변수가 설정되지 않았습니다.");
    process.exit(1);  // 환경 변수가 없으면 서버 종료
}

// 미들웨어 설정
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONT_ORIGIN,
    credentials: true  // 쿠키 및 인증 헤더 전송을 허용
}));

// MongoDB 연결 후 서버 실행
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("DB 연결 성공");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("DB 연결 실패", error);
        process.exit(1);  // 연결 실패 시 서버 종료
    });

// 기본 라우트
app.get("/", (req, res) => {
    res.send("Hello Express");
});

// 서버 상태 체크용 라우트
app.get("/status", (req, res) => {
    res.json({ status: "Server is running" });
});

// air 라우트 연결
app.use("/air", airRoutes);

// 에러 핸들링 미들웨어 (라우터 이후에 정의)
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
