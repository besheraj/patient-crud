// Endpoint testing with mocha and chai and chai-http

// Import libraries 
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

var mongoose = require("mongoose");

// Import server
var server = require('../../server');

// Import Todo Model   
var Patient = require("../models/Patient");
var Auth = require("../models/Auth");

// use chaiHttp for making the actual HTTP requests   
chai.use(chaiHttp);

describe('Patients Profile API', function () {
    let patient = {
        "mrn": "PT0050225",
        "firstName": "Jonathan",
        "lastName": "Keith",
        "dob": "19-02-1988",
        "gender": "M",
        "contactNo": "0193393332",
        "email": "john123@test.com",
        "address": {
            "one": "142 Jalan Cerdas",
            "two": "Taman Kek Lok Si",
            "postcode": "45000",
            "state": "Selangor"
        },
        "nextOfKin": {
            "firstName": "Mary",
            "lastName": "Jane",
            "contactNo": "0132249595",
            "email": ""
        }
    }
    beforeEach(function (done) {
        var newUser = new Auth({
            'email': 'patient1@test.com',
            'password': 'pass123',
            'password_confirmation': 'pass123'
        });
        newUser.save(function (err) {
            done();
        });
    });

    afterEach(function (done) {
        Patient.collection.drop()
        Auth.collection.drop().then(function () {
        }).catch(function () {
            console.warn(' collection may not exists!');
        })
        done();
    });

    describe('Post Profile API with Auth', function () {
        it('Post Profile API with Auth', function (done) {
            chai.request(server)
                .post('/api/auth/login')
                .send({
                    'email': 'patient1@test.com',
                    'password': 'pass123'
                }).end((err, res) => {
                    console.log(res)
                    res.should.have.status(200);
                    res.body.results.should.have.property('access_token');
                    var token = res.body.results.access_token;
                    chai.request(server)
                        .get('/api/patients')
                        .end(function (err, res) {
                            chai.request(server)
                                .post('/api/patients')
                                // we set the auth header with our token
                                .set('access_token', token)
                                .send(patient)
                                .end(function (error, response) {
                                    response.should.have.status(200);
                                    response.body.message.should.equal('Profile Added');
                                    done();
                                });
                        })
                })
        })
    })
    describe('Get Profile API with Auth', function () {
        it('Get all Profiles API with Auth', function (done) {
            chai.request(server)
                .post('/api/auth/login')
                .send({
                    'email': 'patient1@test.com',
                    'password': 'pass123'
                }).end((err, res) => {
                    res.should.have.status(200);
                    res.body.results.should.have.property('access_token');
                    var token = res.body.results.access_token;
                    chai.request(server)
                        .get('/api/patients')
                        .end(function (err, res) {
                            chai.request(server)
                                .get('/api/patients')
                                // we set the auth header with our token
                                .set('access_token', token)
                                .end(function (error, response) {
                                    response.should.have.status(200);
                                    response.body.error.should.equal(false);
                                    done();
                                });
                        })
                })
        })
    })
    describe('Delete Profile API with Auth', function () {
        it('Delete Profile API with Auth', function (done) {
            chai.request(server)
                .post('/api/auth/login')
                .send({
                    'email': 'patient1@test.com',
                    'password': 'pass123'
                }).end((err, res) => {
                    res.should.have.status(200);
                    res.body.results.should.have.property('access_token');
                    var token = res.body.results.access_token;
                    chai.request(server)
                        .post('/api/patients')
                        .set('access_token', token)
                        .send(patient)
                        .end(function (err, res) {
                            chai.request(server)
                                .delete('/api/patients/' + res.body.results._id)
                                .set('access_token', token)
                                .end(function (error, response) {
                                    response.should.have.status(200);
                                    response.body.error.should.equal(false);
                                    done();
                                });
                        })
                })
        })
    })
    describe('PUT update Profile API with Auth', function () {
        it('PUT Profile API with Auth', function (done) {
            chai.request(server)
                .post('/api/auth/login')
                .send({
                    'email': 'patient1@test.com',
                    'password': 'pass123'
                }).end((err, res) => {
                    res.should.have.status(200);
                    res.body.results.should.have.property('access_token');
                    var token = res.body.results.access_token;
                    chai.request(server)
                        .post('/api/patients')
                        .set('access_token', token)
                        .send(patient)
                        .end(function (err, res) {
                            chai.request(server)
                                .patch('/api/patients/' + res.body.results._id)
                                .set('access_token', token)
                                .send({ email: 'johnaaa@gmail.com' })
                                .end(function (error, response) {
                                    response.should.have.status(200);
                                    response.body.error.should.equal(false);
                                    done();
                                });
                        })
                })
        })
    })
})

