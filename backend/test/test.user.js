import should from 'should';
import mongoose from 'mongoose';
import supertest from 'supertest';
import Account from '../models/Account'
let db, request;

describe('Account', () => {

    before(done => {
        mongoose.connect('mongodb://localhost/test');
        db = mongoose.connection;
        db.once('open', function() {
            request = supertest('http://localhost:3000')
            Account.remove({}, err => {
                if (err) done(err);
                done();
            });
        });
    });

    after(done => {
        mongoose.connection.close();
        done();
    });


    it('should create a new user account', done => {
        request
            .post('/api/register')
            .send({
                username: 'testUser',
                password: 'testPassword'
            })
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                console.log('HEREEEE ', err, res.body)
                done()
            })
    });
});
