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
        const { pageSize = 10, pokemon = ''} = query;

        // searches for the pokemon
        const searchOptions = await pokemonAPI.searchByName(pokemon, pageSize);
        // if no pokemon found, this gets returned
        if (searchOptions.length === 0) {
            res.json(`No results found for '${pokemon}'.`);
            return;
        }
        // called _chooseOption to display the 10 available options
        const Options = await _chooseOption(searchOptions);
       
        // results object
        const results = {
            searchTerm: pokemon,
            results: Options
        };

        // displays results to localhost:8888 page
        res.json(results);

        // saves to MongoDB
        database.save('Results', pokemon, {searchTerm:pokemon, pageSize, lastSearched: new Date()});

    } catch (error) {
        res.status(500).json(error.toString());
    }

});


/**
 * ENDPOINT GET /search/:id/details
 * @apiExample localhost:8888/search/:id/details?pokemon='pokemon_name'
 * {String} :id -> unique identifier for pokemon card
 * {String} searched -> the name of the pokemon you searched for
 * 
 */
router.get('/:id/details', async (req, res) => {
    try {
        const { params, query } = req;
        // contains the unique identifier
        const { id } = params;
        // contains the metadata
        const { pokemon = '' } = query;

        // returns the info pertaining to a specific pokemon card
        const finalOption = await pokemonAPI.getInfo(id);

        // displays the information on the screen
        res.json(finalOption);

        // data going into the updated document
        const selections =
            {
                id: id,
                display: finalOption
            };

        // updates the database with new information
        database.update('Results', pokemon, selections);


    } catch (error) {
        res.status(500).json(error.toString());
    }


});



module.exports = router;