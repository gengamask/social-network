const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

// localhost:3001/api/users
router.use("/users", userRoutes);
// localhost:3001/api/thoughts
router.use("/thoughts", thoughtRoutes);

module.exports = router;