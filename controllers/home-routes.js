const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/game', (req, res) => {
  res.render('game');
});


module.exports = router;