const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend
} = require('../../controllers/usersController');

// /api/users

// GET route for all users
router.route('/').get(getUsers);

// GET route for a single user by it's id
router.route('/:userId').get(getSingleUser);

// POST route to create a new user
router.route('/').post(createUser);

// PUT route to update a user by it's id
router.route('/:userId').put(updateUser);

// DELETE route to remove a user by it's id
router.route('/:userId').delete(deleteUser);


// /api/users/:userId/friends/:friendId

// POST route add a new friend to the users list
router.route('/:userId/friends/:friendId').post(createFriend);

// DELETE route to remove a friend from the users list
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;