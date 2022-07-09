const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.loggedIn
  });
});

router.get('/game', (req, res) => {
  res.render('game');
});


module.exports = router;