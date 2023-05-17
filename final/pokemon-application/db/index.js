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
    async function update(collectionName, pokemon, data) {
        try {
            const collection = db.collection(collectionName);

            // if searchterm exists in mongodb and if 'selections' exists in that search
            if (await collection.count({searchTerm: pokemon, selections:{$exists:true}}) == 1) {
                // add new data into the selections array
                await collection.updateOne(
                    {searchTerm: pokemon, selections:{$exists:true}},
                    // push in data to the back of the array
                    {$push: {selections: data}}
                );
            }
            else {
                // if 'selections' does not exist in the search, create a new 'selections' field and add data into it
                await collection.updateOne(
                    {searchTerm: pokemon, selections:{$exists:false}},
                    // add in a new array 'selections' containing the data
                    {$set: {selections:[data]}}
                );
            }

        } catch (error) {
            console.log(error);
        }

    }

    /**
     * finds the history for one specfifc searchTerm or returns all history in the Results database
     */
    async function find(collectionName, pokemon='') {
        try {
            const collection = db.collection(collectionName);

            if (pokemon) {
                // if a pokemon name was entered, find that entry and return it
                return await collection.find({ searchTerm: pokemon }).next();
            }
            else {
                // if there was no specification, return all results
                return await collection.find({}).toArray();
            }

        } catch (error) {
            console.log(error);
        }
    }

    return {
        connect,
        save,
        update,
        find
    };
};

module.exports = mongo();