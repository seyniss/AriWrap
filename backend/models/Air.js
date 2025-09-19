const mongoose = require("mongoose");

const airSchema = new mongoose.Schema(
    {
        classId: {
            type: String,
            required: true,
            trim: true,
        },
        // password가 꼭 필요하면 유지, 아니면 제거 가능
        password: {
            type: String,
            required: true,
            select: false,
        },
        temp: {
            type: Number,
            required: true,
        },
        hum: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt 자동 관리
    }
);

const Air = mongoose.model("Air", airSchema);
module.exports = Air;
