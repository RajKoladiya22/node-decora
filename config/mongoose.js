//db.js

const mongoose = require('mongoose')

const url = `mongodb+srv://decoraevnt:decoraevnt@decora.s2aup1m.mongodb.net/decora`;

const db = mongoose.connect(url)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

module.exports = db; 
