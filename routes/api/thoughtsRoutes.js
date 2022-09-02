const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

// /api/thoughts

// GET route for all thoughts
router.route('/').get(getThoughts);

// GET route for a single thought by id
router.route('/:thoughtId').get(getSingleThought);

// POST route to create a new thought
router.route('/').post(createThought);

// PUT route to update a thought by it's id
router.route('/:thoughtId').put(updateThought);

// DELETE route to remove a thought by it's id
router.route('/:thoughtId').delete(deleteThought);


// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field
router.route('/:thoughtId/reactions').post(createReaction);

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);


module.exports = router;