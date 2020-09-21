const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughts-controller')

// api/thoughts
router
    .route('/')
    .get(getAllThoughts);

router
    .route('/:userId')
    .post(addThought);

// api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// api/thought/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// api/thought/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

module.exports = router;