const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

// Aggregate function to get the total number of thoughts 
const totalThoughts = async () =>
    Thought.aggregate()
        .count('thoughtCount')
        .then((allThoughts) => allThoughts);

module.exports = {

    // getting all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then(async (thoughts) => {
                const thoughtObj = {
                    thoughts,
                    totalThoughts: await totalThoughts(),
                };

                return res.json(thoughtObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // getting a single thought by id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then(async (thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID!' })
                    : res.json({
                        thought
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // creating a new thought
    createThought(req, res) {
        // req.body needs to have userId with it
        Thought.create(req.body)
            // add the thought to the users thoughts array
            .then(dbThought => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { thoughts: dbThought._id } },
                    { new: true });
            })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    // updating a thought by it's id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // removing a thought by it's id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(() => res.status(200).json({ message: 'User deleted successfully' }))
            .catch((err) => res.status(500).json(err));
    },

    // creating a reaction stored in a single thought's reactions array field
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No thought found with that ID!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // removing a reaction by the reaction's reactionId value from the thought
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                console.log(thought)
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No thought found with that ID!' })
                    : res.json(thought)
            }
            )
            .catch((err) => res.status(500).json(err));
    },
};
