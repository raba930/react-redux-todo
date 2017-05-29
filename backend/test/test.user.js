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
        /*eslint no-console: false*/
        console.log('Database name -> ', mongoose.connection.name ,' \n  Env mode -> ', process.env.TD_ENV, '\n')
        // set port
        app.set('port', port);
        // start app server
        server.listen(port);
        request = supertest('http://localhost:' + port);
        db = mongoose.connection;
        db.once('open', () => {
            done();
        });
    });

    after(done => {
        Account.remove(() => {
            mongoose.connection.close();
            server.close();
            done()
        });
    });

    beforeEach(done => {
        Account.remove(done);
    });

    describe('Registration', () => {
        const user = {
            username: 'testUser',
            password: 'testPassword'
        };
        it('should create a new user account', done => {
            request
                .post('/api/register')
                .send(user)
                .expect(200)
                .end((err, res) => {
                    should.not.exist(err);
                    Account.find({}, (err, docs) => {
                        should.not.exist(err);
                        // check saved username
                        docs[0].username.should.equal(user.username);
                        done();
                    });
                });
        });
        it('should save & return the same token', done => {
            request
                .post('/api/register')
                .send(user)
                .expect(200)
                .end((err, res) => {
                    should.not.exist(err);
                    const token = res.body.token;
                    Account.find({}, (err, docs) => {
                        should.not.exist(err);
                        // check returned token
                        docs[0].token.should.equal(token);
                        done();
                    });
                });
        });
        it('should fail & return 400 when body is empty', done => {
            request
                .post('/api/register')
                .send(_.omit(user, 'password'))
                .expect(400)
                .end(done);
        });
        it('should fail & return 400 when username is not provided', done => {
            request
                .post('/api/register')
                .send(_.omit(user, 'username'))
                .expect(400)
                .end(done);
        });
        it('should fail & return 400 when password is not provided', done => {
            request
                .post('/api/register')
                .send(_.omit(user, 'password'))
                .expect(400)
                .end(done);
        });
    })
});
