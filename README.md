# SearchPokemonApp
Users are able to search through different card sets pertaining to a specific Pokémon in order to find a singular card. App can return either the details of the chosen card or the search history.

## About the Project

## Features
Prior to Working with the Application:
- Run 'npm install' on pokemon-api
- Run 'npm install' on pokemon-application
- Run 'npm run dev' comamand to start the application


### Search Pokemon Endpoint
##### localhost:8888/search?pokemon='pokemon_name'
example: localhost:8888/search?pokemon=ninetales
Endpoint returns a JSON response of different cards from different sets. The browser displays the card name + the set it's from and the unique identifer. 
<p align='center'>
  <img src='readmeFiles/search.png' width='830'>
  <img src='readmeFiles/newentry.png' width='630'>
</p>

### Pokemon Details Endpoint
##### localhost:8888/search/id/details?pokemon='pokemon_name'
example: localhost:8888/search/sm9-16/details?pokemon=ninetales
Endpoint returns a JSON response of the details pertaining to one specifc card. The broswer displays lots of minor details pertaining to the card.
<p align='center'>
  <img src='readmeFiles/details.png' width='830'>
  <img src='readmeFiles/selected.png' width='630'>
</p>


### Search History - One Pokemon
##### localhost:8888/history?pokemon='pokemon_name'
example: localhost:8888/history?pokemon=ninetales
Endpoint returns a JSON response of all the search history on the database pertaining to a specific pokemon.
<p align='center'>
  <img src='readmeFiles/history.png' width='830'>
</p>


### Search History - General
##### localhost:8888/history
example: localhost:8888/history
Endpoint returns a JSON response of all the search history on the database.
<p align='center'>
  <img src='readmeFiles/phistory.png' width='830'>
</p>



## Built Using
- JavaScript
- NodeJS
- Express.JS
- MongoDB
- SearchPokemonAPI (personally created)
- VSCode
