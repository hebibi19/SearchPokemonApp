// Require in the Pokemon API
const pokemon = require('pokemontcgsdk');
pokemon.configure({apiKey: '70816915-90d9-4b55-bfe0-9b438e85bbb3'});


// Search Pokemon By Name Function
// parameters: pokemon name, number of options to display
const searchByName = async (pName, pageSize) => {
    try {
        // This is the information that will be passed into the pokemon.card function
        const query = {
            q: `name:${pName}`,
            pageSize: pageSize
        };
        // This line does the searching using the API
        const res = await pokemon.card.where(query);
        // Returns an array of pokemon card objects to the app.js file
        return res.data;

    } catch (error) {
        console.log(error);
    }
};

// Get Information Function
// parameters: the unique pokemon identifer
const getInfo = async (pID) => {
    try {
        // This function searches for a single card using only the unique identifer
        const res = await pokemon.card.find(pID);
        
        // This is what we will be returning after locating the correct pokemon
        // 
        return {
            Name: `${res.name} from Set: ${res.set.name}`,
            Release_Date: res.set.releaseDate,
            Card_Artist: res.artist,
            HP: res.hp,
            Types: res.types,
            Evolution: res.evolvesTo,
            Series: res.set.series,
            Pokedex_Number: res.nationalPokedexNumbers

        };

    } catch (error) {
        console.error(error);
    }
};


module.exports = {
    searchByName,
    getInfo
};