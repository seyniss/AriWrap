const mongoose = require("mongoose");
const Air = require("../models/Air"); // Air 모델 임포트

// POST /air - 데이터 저장
exports.createAir = async (req, res) => {
    try {
        const { classId, password, temp, hum } = req.body;

        // 필수 필드 체크
        if (!classId || !password || !temp || !hum) {
            return res.status(400).json({ error: "모든 필드를 입력해야 합니다." });
        }

        // 새로운 Air 객체 생성
        const newAir = new Air({
            classId,
            password,
            temp,
            hum,
        });

        // DB에 저장
        const savedAir = await newAir.save();

        // 저장된 데이터 반환
        res.status(201).json(savedAir);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "서버 오류. 데이터를 저장할 수 없습니다." });
    }
};

// GET /air - 전체 데이터 조회
exports.getAllAirs = async (req, res) => {
    try {
        const airs = await Air.find().sort({ createdAt: -1 });  // 최신 데이터부터 조회
        res.status(200).json(airs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "데이터를 조회할 수 없습니다." });
    }
};

// GET /air/:id - 특정 ID로 데이터 조회
exports.getAirById = async (req, res) => {
    try {
        const { id } = req.params;

        // 유효한 MongoDB ObjectId인지 확인
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "유효하지 않은 ID입니다." });
        }

        const air = await Air.findById(id);
        if (!air) {
            return res.status(404).json({ error: "해당 ID의 데이터가 존재하지 않습니다." });
        }

        res.status(200).json(air);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "데이터를 조회할 수 없습니다." });
    }
};
