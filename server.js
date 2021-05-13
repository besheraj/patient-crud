let express = require('express');
let app = express();
let mongoose = require('mongoose');
let port = 8080;
let patients = require('./app/controller/patientsApi');
let auth = require('./app/controller/authApi');
require('dotenv/config');

//db connection      
mongoose.connect(process.env.TEST_DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Json bodyparser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Import Routes
const authRoute = require('./app/controller/authApi');
const patientsRoute = require('./app/controller/patientsApi');

// Route Middlewears
app.use('/api/auth', authRoute).post(auth.post)
app.use('/api/patients', patientsRoute).post(patients.post).get(patients.get)

app.use('/api/patients/:id', patientsRoute).patch(patients.patch)
app.use('/api/patients/:id', patientsRoute).get(patients.get)
app.use('/api/patients/:id', patientsRoute).delete(patients.delete)


app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing