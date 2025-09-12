const express = require("express");
const router = express.Router();
const airController = require("../controllers/airController"); // 컨트롤러 임포트

// POST /air - 데이터 저장
router.post("/", airController.createAir);

// GET /air - 전체 데이터 조회
router.get("/", airController.getAllAirs);

// GET /air/:id - 특정 ID로 데이터 조회
router.get("/:id", airController.getAirById);

module.exports = router;
