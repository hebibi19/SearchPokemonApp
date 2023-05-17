const router = require('express').Router();
const database = require('../db');

/**
 * @apiExample localhost:8888/history
 * @apiExample localhost:8888/history?pokemon='pokemon_name'
 */
router.get('/', async (req, res) => {
    try {
        const { query } = req;
        const { pokemon = '' } = query;

        // return history on a specific pokemon or return all search results
        const results = await database.find('Results', pokemon);
        // display to screen
        res.json(results);

    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;