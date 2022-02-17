const router = require('express').Router();

//import methods from the controller
const {
    addComment,
    removeComment,
    addReply,
    removeReply
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
    .put(addReply)
    .delete(removeComment);

// DELETE route to handle removeReply, need th id od the individual reply and also the comment id
router
    .route('/:pizzaId/:commentId/:replyId')
    .delete(removeReply);


module.exports = router;