const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// localhost:3001/api/users
router.route("/").get(getUsers).post(createUser);

// localhost:3001/api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

// localhost:3001/api/users/:userId/:friendId
router.route("/:userId/friends/:friendId").post(addFriend);

// localhost:3001/api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;