const express = require("express");
const DoctorModal = require("../models/doctor_model");

const getDoctors = async (req, res) => {
    try {
        const allDoctors = await DoctorModal.find();

        if (allDoctors.length === 0) {
            return res.status(401).json({
                success: false,
                message: "No doctors found",
            });
        }

        return res.status(200).json({
            success: true,
            data: allDoctors,
        })
    } catch (e) {
        console.log(e);
    }
};

module.exports = getDoctors;