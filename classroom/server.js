const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

app.get("/", (req, res) => {
  res.send("Welcome to the WonderLust API!");
});

app.use("/users", userRoutes);
app.use("/posts", postRoutes);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
