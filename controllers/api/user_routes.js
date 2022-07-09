const router = require('express').Router();
const { User } = require('../../models');

//route to get all users
router.get('/', (req, res) => {
    User.findAll({
      attributes: { exclude: ['password']}
    }) 
        .then(userData => res.json(userData))
        .catch(err =>{
            console.log(err);
            res.status(500).json(err);
        });
});;

//route to find user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
          id: req.params.id
        }
      })
        .then(userData => {
          if (!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(userData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

//route to create user
router.post ('/',  (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
        .then(userData => {
          req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username= userData.username;
            req.session.loggedIn = true;

            res.json(userData);
          })
        }) 
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

//route to log in

router.post('/login', (req, res) => {
    User.findOne({
        where: {
          email: req.body.email
        }
      }).then(userData => {

        if (!userData) {
          res.status(400).json({ message: 'No user with that email address!' });
          return;
        }
    
          
        // Verify user
        const validPassword = userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
          }
          
          req.session.save(() => {
            // declare session variables
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'You are now logged in'})
          })    
      });  
})

//route to delete user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;