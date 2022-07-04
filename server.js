const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

//                         <------path-------->
//const sequelize = require('./config/connection');

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//require the controller folder because there is an index file in the folder that exports all files within it
//             <------path------>
app.use(require('./controllers'));

//sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
//});

// homepage with click to game

// game over screen with loop option to restart or quit

// settings page with audio options 

// high scores

