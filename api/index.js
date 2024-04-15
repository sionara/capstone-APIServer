const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 4000;
const cors = require("cors");

app.use(cors());

//SET UP FOR EASIER FORM DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const registerController = require("../register");
app.post("/register", registerController.register);

const loginController = require("../login");
app.post("/login", loginController.login);

app.listen(port, () => console.log(`Server running on port ${port}`));
