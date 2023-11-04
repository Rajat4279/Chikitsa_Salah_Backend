const express = require("express");
const DoctorModal = require("../models/doctor_model");

const recommendedDoctors = async (req, res) => {

    try {
        const allDoctors = await DoctorModal.find();
        if (allDoctors.length === 0) {
            return res.status(200).json({
                success: false,
                message: "No Doctor is found!",
            });
        }

        const paragraph = req.query.paragraph;
        const Doctors = [];

        await allDoctors.forEach(Doctor => {
            const Keywords = Doctor.keywords;

            for (const keyword of Keywords) {
                // Case-insensitive whole word match
                const keywordRegex = new RegExp(`\\b${keyword}\\b`, 'i');
                // console.log(keywordRegex);
                if (keywordRegex.test(paragraph)) {
                    Doctors.push(Doctor);
                    break;
                }
            }
        });

        if (!Doctors || Doctors.length == 0) {
            return res.status(401).json({
                success: false,
                message: "no doctors are available"
            });
        }
        return res.status(200).json({
            success: true,
            data: Doctors,
        });

    } catch (e) {
        console.log(e);
    }
};

module.exports = recommendedDoctors;