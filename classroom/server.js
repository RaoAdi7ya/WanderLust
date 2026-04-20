const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// Middleware
app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true,
}));
app.use(cookieParser());
app.use(express.json());  

app.get("/test", (req, res) => {
  res.send("Welcome to the Classroom API");
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
