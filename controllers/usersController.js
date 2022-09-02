const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

// Aggregate function to get the total number of users 
const totalUsers = async () =>
    User.aggregate()
        .count('userCount')
        .then((allUsers) => allUsers);

module.exports = {

    // getting all users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const usersObj = {
                    users,
                    totalUsers: await totalUsers(),
                };

                return res.json(usersObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // getting a single user by it's id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID!' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // creating a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // updating a user by it's id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // deleting a user by it's id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then(() => res.status(200).json({ message: 'User deleted successfully' }))
            .catch((err) => res.status(500).json(err));
    },

    // add a new friend to the users list
    createFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with that ID!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // remove a friend from the users list
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) => {
                console.log(user)
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with that ID!' })
                    : res.json(user)
            }
            )
            .catch((err) => res.status(500).json(err));
    },
};
