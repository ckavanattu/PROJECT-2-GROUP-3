const router = require('express').Router();
// require model for data you may want to pass into your handlebar pages

// WORK HERE
// creating routes and endpoints to render the html depedning on what endpoint is visited in the browser url
router.get('/', async (req, res) => {
    res.render("homepage");
});

router.get("/settings", async (req, res) => {
    res.render("settings");
})

router.get("/highscores", async (req, res) => {
    res.render("highscores");
})

module.exports = router;