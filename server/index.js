const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");

const app = express();

// dotenv package to access data present inside env file
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(cors());
//to get data in backend from frontend in json format
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("CHAT APPLICATION");
});

app.use("/auth", authRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
