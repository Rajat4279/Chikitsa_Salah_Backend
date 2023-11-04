const mongoose = require("mongoose");

const DB_Connection = () => {
    mongoose.set("strictQuery", false);
    const DB_URI = process.env.MONGO_URI;

    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
    });

    const db = mongoose.connection;

    db.on("error", () => {
        console.log.bind(console, "DB Connection Error");
    });

    db.once("open", () => {
        console.log("Successfully connected with Database");
    });
}

module.exports = DB_Connection;