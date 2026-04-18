const express = require("express");
const router = express.Router();

//Index-users route
router.get("/", (req, res) => {
  res.send("List of users will be here.");
});

//Show-user route
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Details for user with ID: ${id}`);
});
//Create-user route
router.post("/", (req, res) => {
  res.send("User created successfully!");
});
//delete-user route
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`User with ID: ${id} deleted successfully!`);
});
//Update-user route
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`User with ID: ${id} updated successfully!`);
});

module.exports = router;