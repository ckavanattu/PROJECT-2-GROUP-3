const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.loggedIn
  });
});

router.get('/game', withAuth, (req, res) => {
  res.render('game', {
    loggedIn: req.session.loggedIn
  });
});

router.get('/reviews', withAuth, (req, res) => {
  Comment.findAll({
      attributes: [
          'id',
          'comment_text',
          'created_at'
      ],
      order: [['created_at', 'DESC']],
      include: [
          {
              model: User,
              attributes: ['username']
          }
      ]
  })
  .then(commentData => {
    const review = commentData.map(post => post.get({plain:true}));
    res.render('reviews', { 
      loggedIn: req.session.loggedIn,
      review });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});


module.exports = router;