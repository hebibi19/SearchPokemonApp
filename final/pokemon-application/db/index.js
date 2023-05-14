const { MongoClient } = require('mongodb');
const config = require('../config.json');

const mongo = () => {
    const mongoURL = `mongodb+srv://${config.username}:${config.password}@cluster0.3wb31dj.mongodb.net/${config.database_name}?retryWrites=true&w=majority`;
    let db = null;

    /**
     * connects to mongo atlas via url and sets db instace
     */
        async function connect() {
            try {
                const client = new MongoClient(mongoURL);
                await client.connect();
    
                db = client.db();
    
                console.log('Connected to Mongo DB');
            } catch (error) {
                console.log(error);
            }
        }

    /**
     * saves entries to the database
     *      - if the entry has not been searched for before, a new entry is created
     *      - if the entry has already been searched for, the entry is updated
     */
    async function save(collectionName, pokemon, data) {
        try {
            const collection = db.collection(collectionName);

            // if the entry already exists in the database
            if (await collection.count({searchTerm: pokemon}) == 1) {
                // update the entry
                await collection.updateOne(
                    { searchTerm: pokemon },
                    // specifically update the lastSearched field
                    { $set: {lastSearched: new Date()} }
                );
            // if the entry does NOT exist in the database
            } else {
                // insert the new entry into the database
                await collection.insertOne(data);
            }

        } catch (error) {
            console.log(error);
        }
    }


    /**
     *  add in code for updating search history object
     */
    async function update( ) {

    }

    return {
        connect,
        save,
        // update,
    };
};

module.exports = mongo();