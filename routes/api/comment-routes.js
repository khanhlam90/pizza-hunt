const router = require('express').Router();
const { 
    addComment, 
    removeComment 
} = require('../../controllers/comment-controller');

// used as POST callback
// /api/comments/<pizzaId>
router
    .route('/:pizzaId')
    .post(addComment);

// used as DELETE callback
// /api/comments/<pizzaId>/<commentId>
router
    .route('/:pizzaId/:commentId')
    .delete(removeComment);

module.exports = router;