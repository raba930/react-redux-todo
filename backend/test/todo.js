import http from 'http';
import app from '../app';
import should from 'should';
import mongoose from 'mongoose';
import supertest from 'supertest';
import Account from '../models/Account';
import _ from 'underscore';

let db, request, token;
const port = process.env.TD_TEST_PORT || 3001;
const server = http.createServer(app);

describe('Todo', () => {
    before(done => {
        /*eslint no-console: 0*/
        console.log('Database name -> ', mongoose.connection.name ,' \n  Env mode -> ', process.env.TD_ENV, '\n');
        // set port
        app.set('port', port);
        // start app server
        server.listen(port);
        request = supertest('http://localhost:' + port);
        db = mongoose.connection;
        db.once('open', () => {
            // register test user before any test
            request
                .post('/account/register')
                .send({
                    username: 'testUser',
                    password: 'testPass'
                })
                .expect(200)
                .end((err, res) => {
                    should.not.exist(err);
                    token = {
                        token: res.body.token
                    };
                    done();
                });
        });
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
        Account.update(token, { $set: { todos: [] }}, err => {
            if (err) return done(err);
            done();
        });
    });
    describe('Bad requests', () => {
        it('should return 400 for GET request on /todos without token', done => {
            request
                .get('/todo/todos')
                .expect(400)
                .end(done);
        });

        it('should return 400 for PUT request on /add without token', done => {
            request
                .put('/todo/add')
                .expect(400)
                .end(done);
        });

        it('should return 400 for DELETE request on /remove/123 without token', done => {
            request
                .delete('/todo/remove/123')
                .expect(400)
                .end(done);
        });

        it('should return 401 for GET request on /todos with wrong token', done => {
            const wrongToken = _.clone(token);
            wrongToken.token += '123';
            request
                .get('/todo/todos')
                .set(wrongToken)
                .expect(401)
                .end(done);
        });

        it('should return 401 for PUT request on /add with wrong token', done => {
            const wrongToken = _.clone(token);
            wrongToken.token += '123';
            request
                .put('/todo/add')
                .set(wrongToken)
                .expect(401)
                .end(done);
        });

        it('should return 401 for DELETE request on /remove/123 with wrong token', done => {
            const wrongToken = _.clone(token);
            wrongToken.token += '123';
            request
                .delete('/todo/remove/123')
                .set(wrongToken)
                .expect(401)
                .end(done);
        });

        it('should return 400 for PUT request on /add without todos', done => {
            request
                .put('/todo/add')
                .set(token)
                .expect(400)
                .end(done);
        });

        it('should return 400 for PUT request on /add with todo without text', done => {
            const todos = [{
                text: 'first',
                info: 'desc',
                completed: false
            }, {
                info: 'desc',
                completed: true
            }];
            request
                .put('/todo/add')
                .set(token)
                .send({todos: todos})
                .expect(400)
                .end(done);
        });

        it('should return 404 for DELETE request on /remove without id', done => {
            request
                .delete('/todo/remove')
                .set(token)
                .expect(404)
                .end(done);
        });
    });

    it('should return empty todo list', done => {
        request
            .get('/todo/todos')
            .set(token)
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                const todos = res.body.todos;
                todos.length.should.be.equal(0);
                done();
            });
    });
    it('should add a new todo', done => {
        const todos = [{
            text: 'asdf',
            info: 'asdsad',
            completed: false
        }];
        request
            .put('/todo/add')
            .set(token)
            .send({todos: todos})
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                Account.findOne(token, (err, data) => {
                    should.not.exist(err);
                    let db_todo = _.omit(data.todos[0].toObject(), '_id');
                    data.todos.length.should.be.equal(1);
                    db_todo.should.be.eql(todos[0]);
                    done();
                });
            });
    });
    it('should add & return two todos', done => {
        const todos = [{
            text: 'asdf',
            info: 'asdsad',
            completed: false
        }, {
            text: 'second',
            info: 'desc',
            completed: true
        }];
        request
            .put('/todo/add')
            .set(token)
            .send({todos: [todos[0]]})
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                request
                    .put('/todo/add')
                    .set(token)
                    .send({todos: [todos[1]]})
                    .expect(200)
                    .end((err, res) => {
                        should.not.exist(err);
                        request
                            .get('/todo/todos')
                            .set(token)
                            .expect(200)
                            .end((err, res) => {
                                should.not.exist(err);
                                const pairs = _.zip(todos, _.map(res.body.todos, td => _.omit(td, '_id')));
                                res.body.todos.length.should.be.equal(todos.length);
                                _.each(pairs, pair => pair[0].should.be.eql(pair[1]));
                                done();
                            });
                    });
            });
    });
    it('should add & return three todos with one PUT', done => {
        const todos = [{
            text: 'first',
            info: 'desc1',
            completed: false
        }, {
            text: 'second',
            info: 'desc2',
            completed: true
        }, {
            text: 'third',
            info: 'desc3',
            completed: false
        }];
        request
            .put('/todo/add')
            .set(token)
            .send({todos: todos})
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                Account.findOne(token, (err, data) => {
                    should.not.exist(err);
                    const pairs = _.zip(todos, _.map(data.todos, td => _.pick(td, 'text', 'info', 'completed')));
                    data.todos.length.should.be.equal(3);
                    _.each(pairs, pair => pair[0].should.be.eql(pair[1]));
                    request
                        .get('/todo/todos')
                        .set(token)
                        .expect(200)
                        .end((err, res) => {
                            should.not.exist(err);
                            const pairs = _.zip(todos, _.map(res.body.todos, td => _.omit(td, '_id')));
                            res.body.todos.length.should.be.equal(todos.length);
                            _.each(pairs, pair => pair[0].should.be.eql(pair[1]));
                            done();
                        });
                });
            });
    });
});
