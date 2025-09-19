// models/Air.js
const mongoose = require("mongoose");

const airSchema = new mongoose.Schema(
    {
        classId: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        temp: {
            type: String,
            required: true,
        },
        hum: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date, default: Date.now
        }
    },
    {
        timestamps: true,
    }
);

const Air = mongoose.model("Air", airSchema);
module.exports = Air;
