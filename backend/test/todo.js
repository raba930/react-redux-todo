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
                .get('/todo')
                .expect(400)
                .end(done);
        });
        it('should return 400 for PUT request on /add without token', done => {
            request
                .put('/todo')
                .expect(400)
                .end(done);
        });
        it('should return 400 for DELETE request on /remove/123 without token', done => {
            request
                .delete('/todo/123')
                .expect(400)
                .end(done);
        });
        it('should return 401 for GET request on /todos with wrong token', done => {
            const wrongToken = _.clone(token);
            wrongToken.token += '123';
            request
                .get('/todo')
                .set(wrongToken)
                .expect(401)
                .end(done);
        });
        it('should return 401 for PUT request on /add with wrong token', done => {
            const wrongToken = _.clone(token);
            wrongToken.token += '123';
            request
                .put('/todo')
                .set(wrongToken)
                .expect(401)
                .end(done);
        });
        it('should return 401 for DELETE request on /remove/123 with wrong token', done => {
            const wrongToken = _.clone(token);
            wrongToken.token += '123';
            request
                .delete('/todo/123')
                .set(wrongToken)
                .expect(401)
                .end(done);
        });
        it('should return 400 for PUT request on /add without todos', done => {
            request
                .put('/todo')
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
                .put('/todo')
                .set(token)
                .send({todos: todos})
                .expect(400)
                .end(done);
        });
        it('should return 404 for DELETE request on /remove without id', done => {
            request
                .delete('/todo')
                .set(token)
                .expect(404)
                .end(done);
        });
        it('should return 404 for toggle completed property of not-existing todo item', done => {
            request
                .post('/todo/completed/5981cc56932be96c1d2d4de1')
                .send({completed: true})
                .set(token)
                .expect(404)
                .end(done);
        });
        it('should return 404 for post without id', done => {
            request
                .post('/todo/completed/')
                .send({completed: true})
                .set(token)
                .expect(404)
                .end(done);
        });
        it('should return 400 for toggle completed property of todo item with wrong id', done => {
            request
                .post('/todo/completed/58846badID')
                .send({completed: true})
                .set(token)
                .expect(400)
                .end(done);
        });
        it('should return 400 for post without payload', done => {
            request
                .post('/todo/completed/5981cc56932be96c1d2d4de1')
                .set(token)
                .expect(400)
                .end(done);
        });
        it('should return 400 for post with wrong payload', done => {
            request
                .post('/todo/completed/58846badID')
                .send({completed: 'string'})
                .set(token)
                .expect(400)
                .end(done);
        });
        it('should return 404 for adding info to not-existing todo item', done => {
            request
                .post('/todo/info/5981cc56932be96c1d2d4de1')
                .send({info: 'text'})
                .set(token)
                .expect(404)
                .end(done);
        });
        it('should return 404 for post on todo/info/ without id', done => {
            request
                .post('/todo/info/')
                .send({info: 'text'})
                .set(token)
                .expect(404)
                .end(done);
        });
        it('should return 400 for adding info to todo item with wrong id', done => {
            request
                .post('/todo/info/58846badID')
                .send({info: 'text'})
                .set(token)
                .expect(400)
                .end(done);
        });
        it('should return 400 for post on todo/info/ without payload', done => {
            request
                .post('/todo/info/5981cc56932be96c1d2d4de1')
                .set(token)
                .expect(400)
                .end(done);
        });
        it('should return 400 for post on todo/info/ with wrong payload type', done => {
            request
                .post('/todo/info/58846badID')
                .send({info: 3.14})
                .set(token)
                .expect(400)
                .end(done);
        });
        it('should return 400 for adding info to todo item with payload without info prop', done => {
            request
                .post('/todo/info/5981cc56932be96c1d2d4de1')
                .send({notinfo: 'text'})
                .set(token)
                .expect(400)
                .end(done);
        });
    });
    it('should return empty todo list', done => {
        request
            .get('/todo')
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
            .put('/todo')
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
            .put('/todo')
            .set(token)
            .send({todos: [todos[0]]})
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                request
                    .put('/todo')
                    .set(token)
                    .send({todos: [todos[1]]})
                    .expect(200)
                    .end((err, res) => {
                        should.not.exist(err);
                        request
                            .get('/todo')
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
            .put('/todo')
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
                        .get('/todo')
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
    it('should add a few todos & flag one as completed', done => {
        const todos = [{
            text: 'asdf',
            info: 'asdsad',
            completed: false
        }, {
            text: 'bassd',
            info: 'asdsad',
            completed: false
        }, {
            text: 'casdasd',
            info: 'asdsad',
            completed: false
        }];
        request
            .put('/todo')
            .set(token)
            .send({todos: todos})
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                const id = res.body.todos[0]._id;

                request
                    .post('/todo/completed/' + id)
                    .send({completed: true})
                    .set(token)
                    .expect(200)
                    .end((err, res) => {
                        should.not.exist(err);
                        Account.findOne(token, (err, data) => {
                            should.not.exist(err);
                            data.todos.forEach(t => {
                                if (t._id.toString() === id)
                                    t.completed.should.be.equal(true);
                                else
                                    t.completed.should.be.equal(false);
                            });
                            done();
                        });
                    });
            });
    });
    it('should add a few todos & flag one as not completed', done => {
        const todos = [{
            text: 'asdf',
            info: 'asdsad',
            completed: true
        }, {
            text: 'bassd',
            info: 'asdsad',
            completed: true
        }, {
            text: 'casdasd',
            info: 'asdsad',
            completed: true
        }];
        request
            .put('/todo')
            .set(token)
            .send({todos: todos})
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                const id = res.body.todos[0]._id;

                request
                    .post('/todo/completed/' + id)
                    .send({completed: false})
                    .set(token)
                    .expect(200)
                    .end((err, res) => {
                        should.not.exist(err);
                        Account.findOne(token, (err, data) => {
                            should.not.exist(err);
                            data.todos.forEach(t => {
                                if (t._id.toString() === id)
                                    t.completed.should.be.equal(false);
                                else
                                    t.completed.should.be.equal(true);
                            });
                            done();
                        });
                    });
            });
    });
    it('should add a few todos & add info to one of them', done => {
        const todos = [{
            text: 'asdf',
            info: '',
            completed: false
        }, {
            text: 'bassd',
            info: '',
            completed: false
        }, {
            text: 'casdasd',
            info: '',
            completed: false
        }];
        request
            .put('/todo')
            .set(token)
            .send({todos: todos})
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                const id = res.body.todos[0]._id;
                const payload = {
                    info: 'infoText'
                };
                request
                    .post('/todo/info/' + id)
                    .send(payload)
                    .set(token)
                    .expect(200)
                    .end((err, res) => {
                        should.not.exist(err);
                        Account.findOne(token, (err, data) => {
                            should.not.exist(err);
                            data.todos.forEach(t => {
                                if (t._id.toString() === id)
                                    t.info.should.be.equal(payload.info);
                            });
                            done();
                        });
                    });
            });
    });
    it('should add a few todos & remove completed', done => {
        const todos = [{
            text: 'asdf',
            info: '',
            completed: false
        }, {
            text: 'bassd',
            info: '',
            completed: true
        }, {
            text: 'casdasd',
            info: '',
            completed: false
        }, {
            text: 'zz',
            info: '',
            completed: false
        }, {
            text: 'ee',
            info: '',
            completed: true
        }];
        request
            .put('/todo')
            .set(token)
            .send({todos: todos})
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                request
                    .delete('/todo/completed')
                    .set(token)
                    .expect(200)
                    .end((err, res) => {
                        should.not.exist(err);
                        Account.findOne(token, (err, data) => {
                            should.not.exist(err);
                            const expectedTodos = todos.filter(todo => !todo.completed);
                            const actualTodos = data.todos.map(todo => _.pick(todo, ['text', 'info', 'completed']));
                            actualTodos.should.be.eql(expectedTodos);
                            done();
                        });
                    });
            });
    });
});
