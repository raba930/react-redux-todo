import http from 'http';
import app from '../app';
import should from 'should';
import mongoose from 'mongoose';
import supertest from 'supertest';
import Account from '../models/Account';
import _ from 'underscore';

let db, request;
const port = process.env.TD_TEST_PORT || 3001;
const server = http.createServer(app);

describe('Account', () => {

    before(done => {
        /*eslint no-console: 0*/
        console.log('Database name -> ', mongoose.connection.name ,' \n  Env mode -> ', process.env.TD_ENV, '\n');
        // set port
        app.set('port', port);
        // start app server
        server.listen(port);
        request = supertest('http://localhost:' + port);
        db = mongoose.connection;
        db.once('open', done);
    });

    after(done => {
        Account.remove(() => {
            mongoose.connection.close();
            server.close();
            done();
        });
    });

    beforeEach(function(done) {
        console.log('\x1b[36m', this.currentTest.title);
        Account.remove(done);
    });

    describe('Registration', () => {
        const user = {
            username: 'testUser',
            password: 'testPassword'
        };
        it('should create a new user account', done => {
            request
                .post('/account/register')
                .send(user)
                .expect(200)
                .end((err, res) => {
                    should.not.exist(err);
                    Account.find({}, (err, docs) => {
                        should.not.exist(err);
                        // check saved username
                        docs[0].username.should.be.equal(user.username);
                        done();
                    });
                });
        });
        it('should save & return the same token', done => {
            request
                .post('/account/register')
                .send(user)
                .expect(200)
                .end((err, res) => {
                    should.not.exist(err);
                    const token = res.body.token;
                    Account.find({}, (err, docs) => {
                        should.not.exist(err);
                        // check returned token
                        docs[0].token.should.be.equal(token);
                        done();
                    });
                });
        });
        it('should fail to register user with existing username', done => {
            request
                .post('/account/register')
                .send(user)
                .expect(200)
                .end((err, res) => {
                    should.not.exist(err);
                    request
                        .post('/account/register')
                        .send(user)
                        .expect(409)
                        .end((err, res) => {
                            should.not.exist(err);
                            res.body.name.should.be.equal('UserExistsError');
                            done();
                        });

                });
        });
        it('should fail & return 400 when body is empty', done => {
            request
                .post('/account/register')
                .send(_.omit(user, 'password'))
                .expect(400)
                .end(done);
        });
        it('should fail & return 400 when username is not provided', done => {
            request
                .post('/account/register')
                .send(_.omit(user, 'username'))
                .expect(400)
                .end(done);
        });
        it('should fail & return 400 when password is not provided', done => {
            request
                .post('/account/register')
                .send(_.omit(user, 'password'))
                .expect(400)
                .end(done);
        });
    });
    describe('login', () => {
        const user = {
            username: 'testUser',
            password: 'testPass'
        };
        const registerUser = returnToken => {
            return new Promise((resolve, reject) => {
                request
                    .post('/account/register')
                    .send(user)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return reject(err);
                        if (returnToken)
                            resolve(res.body.token);
                        else
                            resolve();
                    });
            });
        };
        it('should login user', done => {
            registerUser()
                .then(() => {
                    request
                        .post('/account/login')
                        .send(user)
                        .expect(200)
                        .end(done);
                })
                .catch(err => done(err));
        });
        it('should get logged in only resource', done => {
            registerUser(true)
                .then((token) => {
                    request
                        .post('/account/token')
                        .set({token: token})
                        .expect(200)
                        .end(done);
                })
                .catch(err => done(err));
        });
        it('should return right token', done => {
            registerUser(true)
                .then((token) => {
                    request
                        .post('/account/login')
                        .send(user)
                        .expect(200)
                        .end((err, res) => {
                            should.not.exist(err);
                            res.body.token.should.be.equal(token);
                            done();
                        });
                })
                .catch(err => done(err));
        });
        it('should fail to get logged in only resource with wrong token', done => {
            registerUser(true)
                .then((token) => {
                    // change correct token
                    token = token + 'tt';
                    request
                        .post('/account/token')
                        .set({token: token})
                        .expect(401)
                        .end(done);
                })
                .catch(err => done(err));
        });
        it('should fail to login unregistred user', done => {
            request
                .post('/account/login')
                .send(user)
                .expect(401)
                .end(done);
        });
        it('should fail to login user without password', done => {
            request
                .post('/account/login')
                .send(_.omit(user, 'password'))
                .expect(400)
                .end(done);
        });
        it('should fail to login user without username', done => {
            request
                .post('/account/login')
                .send(_.omit(user, 'username'))
                .expect(400)
                .end(done);
        });
    });
});
