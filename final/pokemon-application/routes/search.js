const router = require('express').Router();
const database = require('../db');
const pokemonAPI = require('pokemon-api');

// Choose Option Function
// Parameters: takes in an array of pokemon card objects
const _chooseOption = async (options) => {
    return options.map((option) => {
        return {
        // what the options look like, our unique identifer that will be used later
            display: `${option.name} from Set: ${option.set.name}`, id: option.id
        };
    });
};

/**
 * ENDPOINT GET /search
 * @apiExample localhost:8888/search?pokemon=
 * {String} pokemon -> name of pokemon that is being searched for
 * 
 */
router.get('/', async (req, res) => {
    try {
        const { query } = req;
        const { pageSize = 10, pokemon = '' } = query;

        // searches for the pokemon
        const searchOptions = await pokemonAPI.searchByName(pokemon, pageSize);
        // if no pokemon found, this gets returned
        if (searchOptions.length === 0) {
            res.json(`No results found for '${pokemon}'.`);
            return;
        }
        // called _chooseOption to display the 10 available options
        const chosenOption = await _chooseOption(searchOptions);
       
        // results object
        const results = {
            searchTerm: pokemon,
            results: chosenOption
        };

        // displays results to localhost:8888 page
        res.json(results);

    } catch (error) {
        res.status(500).json(error.toString());
    }

});


/**
 * ENDPOINT GET /search/:id/details
 * @apiExample localhost:8888/search/:id/details?searched='pokemon_name'
 * {String} :id -> unique identifier for pokemon card
 * {String} searched -> the name of the pokemon you searched for
 * 
 */
router.get('/:id/details', async (req, res) => {



});



module.exports = router;