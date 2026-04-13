const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 4000;
const cors = require("cors");

const corsOptions = {
  origin: 'https://capstone-game-ui.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); //Handle Pre-flight errors

//SET UP FOR EASIER FORM DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const registerController = require("../register");
app.post("/register", registerController.register);

const loginController = require("../login");
app.post("/login", loginController.login);

//app.listen(port, () => console.log(`Server running on port ${port}`));

// 04-13 2026 - vercel deployment CORS error
module.exports = app;
