const express = require("express");
const router = express.Router();

//Index-posts route
router.get("/", (req, res) => {
  res.send("List of posts will be here.");
});

//Show-post route
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Details for post with ID: ${id}`);
});
//Create-post route
router.post("/", (req, res) => {
  res.send("Post created successfully!");
});
//delete-post route
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Post with ID: ${id} deleted successfully!`);
});
//Update-post route
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Post with ID: ${id} updated successfully!`);
});

module.exports = router;
