const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// localhost:3001/api/thoughts
router.route("/").get(getThoughts).post(createThought);

// localhost:3001/api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought).delete(deleteThought).put(updateThought);

// localhost:3001/api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction);

// alocalhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;