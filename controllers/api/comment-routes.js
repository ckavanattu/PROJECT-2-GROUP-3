const router = require('express').Router();

const { Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
    })
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
})

router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(commentData => {
        if(!commentData) {
            res.status(404).json({ message: 'no comment found'})
            return;
        }
        res.json(commentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;