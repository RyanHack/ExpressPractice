const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const app = express();

const heroes = require('./data/heroes');
const port = 3000;

app.use(morgan('dev'));
app.use(cors());

app.get('/', (request, response) => {
  response.json({
    data: heroes
  })
})

app.get('/:id', (request, response) => {
  var hero = getHeroById(heroes, request.params.id)
  if (!hero) {
    response.status(404).json({
      error: "No Hero found with that id"
    })
  } else {
    response.json({
      hero: hero
    })
  }
});

app.listen(port, () => {
  console.log('Server running on port 3000');
});

function getHeroById(heroData, id) {
  for (let i = 0; i < heroData.length; i++) {
    if (heroData[i].id == id) {
      return heroData[i]
    }
  }
  return null;
}
