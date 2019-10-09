const should = require('should');
const supertest = require('supertest');
const app = require('../../app');
const assert = require('assert');
const {Trainer} = require('../../models');

/*
* 1. trainer 이름 강제로 넣고 그거 대하여 잘 찾는지
* 2. 아무것도 넣지 않았을 때 아무것도 못찾아야 함.
* */

const trainerRepository = require('../../repositories/trainerRepository');

describe('homeRouter API test', function() {
    let request = null;
    let server = null;
    let newTestTrainerId = null;

    before(() => {
        server = app.listen();
        request = supertest.agent(server);
        trainerRepository.createTrainer({username: "개발자"})
            .then(res => {
                newTestTrainerId = res.id;
            });
    });

    after(() => {
        Trainer.destroy({
            where: {
                id: newTestTrainerId
            },
        }).then(res => {
            server.close();
        });
    });

    it('should success get the trainer list and banner', (done) => {
        request
            .get('/home')
            .expect(200)
            .end((err, res) => {
                if(err) done(err);
                let resResult = JSON.parse(res.text);
                resResult.should.have.properties(['trainer_list', 'banner']);
                done();
            });
    });

    it('should fail search trainer name. So, trainer_list size is zero', (done) => {
        request
            .get('/home')
            .query({trainerName: '길동이'})
            .expect(200)
            .end((err, res) => {
                if(err) done(err);
                let resResult = JSON.parse(res.text);
                resResult.trainer_list.should.have.length(0);
                done();
            });
    });

    it('should success finding trainer name that is "개발자". So, trainer_list size is one', (done) => {
        request
            .get('/home')
            .query({trainerName: '개발자'})
            .expect(200)
            .end((err, res) => {
                if(err) done(err);
                let resResult = JSON.parse(res.text);
                resResult.trainer_list.should.have.length(1);
                done();
            });
    })
});