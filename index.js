const MongoClient = require('mongodb').MongoClient; //mongodb driver to connect to our NodeJS appliaction to the database.
const assert = require('assert');//for checking eqality conditions
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/'; //url of the mongo db database
const dbname = 'conFusion';//name of the document we want to connect to.

MongoClient.connect(url).then((client) => { //sending connection request to the database using the mongoDB driver refered using "MongoClient", from which a promise is returned because no callback back function is sent as a parameter.Because the promise is resolved, ".then()" part is executed.

    console.log('Connected correctly to the server');
    const db = client.db(dbname);//using a variable to address our document

    dboper.insertDocument(db,{name:"Vadonut",description:"Test"}, 'dishes')
    //Because the promise is resolved, ".then()" part is executed.
     .then((result) =>{
        console.log('Insert Document:\n',result.ops);

        return dboper.findDocuments(db,'dishes') //Before ending the then part we are calling the next operation.
     })
    //Because the promise of 'findDocuments' is resolved, ".then()" part is executed.
    .then((docs) => {
        console.log('Found Documents:\n',docs);

        return dboper.updateDocument(db,{name:"Vadonut"},{description:'Updated Test'},'dishes') 
     })
    .then((result) => {
        console.log('Updated document:\n',result.result);

        return dboper.findDocuments(db,'dishes')
     })
    .then((docs) => {
        console.log('Found Updated Documents:\n',docs);

        return db.dropCollection('dishes')
    })
    .then((result) => {
         console.log('Dropped Collection:',result);
         client.close();
    })
    .catch((err) => console.log(err));
})
.catch((err) => console.log(err));


//maintaining synchronous programming so that each process is executed only after the previous one has been executed. This is made sure by performing all conscequent functions within the callback function of the preceding function. Simply put, a function is nested withiin another function, so that the outer function completes exceution only after the inner function has been executed. This leads to callback hell.

/*MongoClient.connect(url,(err,client) => { //connecting to the database

    assert.equal(err,null); //checking for any errors

    console.log('Connected correctly to the server');

    const db = client.db(dbname);//using a variable to address our document

    dboper.insertDocument(db,{name:"Vadonut",description:"Test"}, 'dishes', (result) =>{
        console.log('Insert Document:\n',result.ops); //console.log() will use ',' instead of '+' because we want to print a JS object and not a value.

        dboper.findDocuments(db,'dishes',(docs) => {
            console.log('Found Documents:\n',docs);

            dboper.updateDocument(db,{name:"Vadonut"},{description:'Updated Test'},'dishes',(result) => {
                console.log('Updated document:\n',result.result);

                dboper.findDocuments(db,'dishes',(docs) => {
                    console.log('Found Updated Documents:\n',docs);

                    db.dropCollection('dishes', (result) => {
                        console.log('Dropped Coollection:',result);
                    });
            });
         });
      });
    });
    /*collection.insertOne({"name":"Uthappizza","description":"test"},(err,result) => {
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
});*/