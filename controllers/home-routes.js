const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.loggedIn
  });
});

router.get('/game', (req, res) => {
  res.render('game', {
    loggedIn: req.session.loggedIn
  });
});


module.exports = router;