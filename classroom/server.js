const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());


app.get("/getcookies", (req, res) => {
  res.cookie("username", "wanderlust_user");
  res.send("Cookie has been set!");
});

app.get("/", (req, res) => {
  console.dir(req.cookies);
  res.send("Welcome to the WonderLust API!");
});

app.use("/users", userRoutes);
app.use("/posts", postRoutes);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
