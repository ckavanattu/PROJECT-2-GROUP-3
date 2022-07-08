const router = require('express').Router();
// require model for data you may want to pass into your handlebar pages

// WORK HERE
// creating routes and endpoints to render the html depedning on what endpoint is visited in the browser url
router.get('/homepage', async (req, res) => {
    res.render("homepage");
});

router.get("/demo", async (req, res) => {
    res.render("demo");
})

router.get("/highscores", async (req, res) => {
    res.render("highscores");
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
})
module.exports = router;