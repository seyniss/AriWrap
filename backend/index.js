const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const airRoutes = require("./routes/airRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const FRONT_ORIGIN = process.env.FRONT_ORIGIN || "http://localhost:5173";

// 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: FRONT_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB 연결 성공"))
    .catch(err => console.error("DB 연결 실패", err));

// 기본 라우트
app.get("/", (req, res) => res.send("Hello Express"));

// Air 라우트
app.use("/air", airRoutes);

// 에러 핸들링
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ message: error.message || "서버에 문제가 발생했습니다." });
});

// 서버 실행
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
