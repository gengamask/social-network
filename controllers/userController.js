const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
    // getting all the users
    getUsers(req, res) {
        User.find()
            .then((users) => {res.status(200).json(users)})
            .catch((e) => res.status(500).json(e));
    },
    // getting single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-___V')
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user has been found within a given ID.' })
                : res.json(user)
        )
        .catch((e) => res.status(500).json(e));
    },
    // creating a user
    createUeer(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((e) => res.status(500).json(e));
    },
    // updating a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new:true }
        )
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user has been found within a given ID.' })
            : res.json(user))
        .catch((e) => res.status(500).json(e));
    },
    // deleting a user
    deleteUser(req, res) {
        User.findOneAndDelete( { _id: req.params.userId })
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user has been found within a given ID.' })
                : Thought.deleteMany({ _id: { $in: user.thoughts }} ))
        .then(() => res.json({ message: 'User with given ID has been successfully deleted.' }))
        .catch((e) => res.status(500).json(e));
    },
    // adding a friend
    addFriend(req, res) {
        User.findOneAndUpdate (
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new:true }
        )
        .then((user) =>
            !user 
                ? res.status(404).json({ message: "No user has been found within a given ID." })
                : res.json(user)
        )
        .catch((e) => res.status(500).json(e));
    },
    // deleting a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: "No user has been found within a given ID." })
                : res.json(user)
        )
        .catch((e) => res.status(500).json(e));
      }
}