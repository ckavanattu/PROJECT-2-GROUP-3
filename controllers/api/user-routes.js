const User = require("../")

router.get('/', async (req, res) => {
    res.render("homepage");
});