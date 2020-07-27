const MongoClient = require('mongodb').MongoClient; //mongodb driver to connect to our NodeJS appliaction to the database.
const assert = require('assert');//for checking eqality conditions

const url = 'mongodb://localhost:27017/'; //url of the mongo db database
const dbname = 'conFusion';//name of the document we want to connect to.

//maintaining synchronous programming so that each process is executed only after the previous one has been executed. This is made sure by performing all conscequent functions within the callback function of the preceding function. Simply put, a function is nested withiin another function, so that the outer function completes exceution only after the inner function has been executed.

MongoClient.connect(url,(err,client) => { //connecting to the database
    assert.equal(err,null); //checking for any errors
    console.log('Connected correctly to the server');
    const db = client.db(dbname);//using a variable to address our document
    const collection = db.collection('dishes');//using a variable to address our collection
    collection.insertOne({"name":"Uthappizza","description":"test"},(err,result) => {
        assert.equal(err,null);

        console.log('After insert:\n');
        //printing the in the console the record that has just been inserted after converting it into an Array.
        console.log(result.ops);

        collection.find({}).toArray((err,docs) => {
    //"find({})" is used to display all the collections of the document(or db). Then we are convertng it into an Array.
            assert.equal(err,null);
            console.log('Found:\n');
            //printing in the console all the records that has just been returned after "find" operation which has already been converted into an Array.
            console.log(docs);

            db.dropCollection('dishes', (err,result) => {
                assert.equal(err,null);

                client.close();
            });
        });
    });
});