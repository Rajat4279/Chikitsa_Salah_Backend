const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//Database Connection
const DB_Connection = require("./dbConnection");

//enabling cross origin resource transfer
const cors = require("cors");

//Establishing the connection with database
DB_Connection();

const corsOption = {
    origin: true,
}

app.use(express.json());
app.use(cors(corsOption));

const port = 8000;

const chatApi = require("./routes/chatApi");
const recommendedDoctors = require("./routes/recommendedDoctors");
const getDoctors = require("./routes/getDoctors");

app.get("/", (req, res) => {
    res.send("Server is up and running");
});

app.post("/chat", chatApi);

app.get("/getDoctors", getDoctors);

app.post("/doctors", recommendedDoctors);

app.get("*", (req, res) => {
    res.send("404 Page not found!");
});

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});