const mongoose = require("mongoose");

const { Schema } = mongoose;

const doctorSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // Email validation using the match validator
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        },
        degree: {
            type: String,
            required: true
        },
        specialty: {
            type: String,
            required: true
        },
        experience: {
            type: Number,
            required: true
        },
        phoneNumber: {
            type: Number,
            unique: true,
            required: true
        },
        keywords:{
            type:[String]
        }
    }
);

module.exports = mongoose.model("Doctor", doctorSchema);