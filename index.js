const express = require("express");
const app = express();
const pets = require("./helpers");
// const path = require("path");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`<h1>Adopt A Pet</h1>
  <p>Browse through the links below to find your new furry friend:</p>
  <ul>
  <a href="/animals/dogs"><li>Dogs</li></a>
  <a href="/animals/cats"><li>Cats</li></a>
  <a href="/animals/rabbits"><li>Rabbits</li></a>
  </ul>
  `);
});

app.get("/animals", (req, res) => {
  const allPets = Object.keys(pets);
  let allNames = "";
  allPets.forEach((name) =>
    pets[name].forEach(
      (pet, index) =>
        (allNames += `<a href=/animals/${name}/${index}><li>${pet.name}</li></a>`)
    )
  );
  res.send(allNames);
});

app.get("/animals/:pet_type", (req, res) => {
  const { pet_type } = req.params;
  let petsList = "";
  pets[pet_type].forEach((animal, index) => {
    petsList += `<li><a href="${pet_type}/${index}">${animal.name}</a></li>`;
  });
  res.send(`<ul>${petsList}</ul>`);
});

app.get("/animals/:pet_type/:pet_id", (req, res) => {
  const { pet_type, pet_id } = req.params;
  // const pet = pets[pet_type][pet_id];
  //   const t = req.params.pet_type;
  //   const i = req.params.pet_id;

  const petArray = pets[pet_type];
  const pet = petArray[pet_id];

  let html = `${pet.name}'s page!
  <img src="${pet.url}" alt=${pet.name} />
  <p> ${pet.description}</p>
  <ul>
  <li>${pet.breed}</li>
  <li>${pet.age}</li>
  </ul>`;

  res.send(html);
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
