/* eslint no-console: "off" */
const mongoose = require('mongoose');

module.exports = function(dbUri){

    const promise = mongoose.connect(dbUri);

    //CONNECTION EVENTS
    //When successfully connected

    mongoose.connection.on('connected', () => {
        console.log('Mongoose default connection open to ' + dbUri);
    });

    //if the connection throws error
    mongoose.connection.on('error', (err) => {
        console.log('Mongoose default connection error: ' + err);
    });

    //when the connection is disconnected
    mongoose.connection.on('disconnected', () => {
        console.log('mongoose default connection disconnected');
    });

    //if node process ends, close the mongoose connection
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    return promise;
};