const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    // getting thougts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((e) => res.status(500).json((e)));
    },
    // getting single though
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-___V')
        .then((thought) =>
            !thought
                ? res.status(404).json({ message:'Thought is not applicable within the ID that is given' })
                : res.json(thought)
        )
            .catch((e) => res.status(500).json(e))
    },
    // creating a new thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) =>  {
            return User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );
        })
        .then((username) => 
        !username
            ? res.status(404).json({ message: 'No specific ID has been attached to the thought' })
            : res.json('Thought has been successfully created.'))
        .catch((e) => {res.status(500).json(e)})
    },
    // updating a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => 
        !thought
            ? res.select(404).json({ message: 'No such an ID has been found with this ID.' })
            : res.json(thought))
        .catch((e) => {res.select(500).json(e)})
    },
    // deleting a thought
    deleteThought(req, res){
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) => {
            if(!thought){
                res.status(404).json({ message: 'No specific thought has been found within the ID that is given' })
            } else {
                Reaction.deleteMany({ _id: { $in: thought.reactions} })
            }
        })
        .then(()=> res.json({ message: 'Thought has been successfully deleted.' }))
        .catch((e) => res.status(500).json(e))
    },
    // creating a reaction to a thought
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought has been found within a given ID' })
            : res.json(thought)
        )
        .catch((e) => res.status(500).json(e));
    },
    // deleting a reaction from a thought
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: {reactions:{reactionId: req.params.reactionId}} },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        ! thought
            ? res.status(404).json({ message: 'No thought has been found within a given ID'
        })
        : res.json(thought)
        )
        .catch((e) =>{
            console.log(e);
            res.status(500).json(e);
        })
    }
}