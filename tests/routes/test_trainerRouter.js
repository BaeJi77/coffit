const should = require('should');
const supertest = require('supertest');
const app = require('../../app');

const {Trainer} = require('../../models');
const trainerRepository = require('../../repositories/trainerRepository');

/*
* 1. 트레이너 등록이 잘 되는지?
* 2. 사진 등록이 잘 되는지?
* 2-1. 프로필 사진이 잘 들어가는지?
* 2-2. 활동 사진이 잘 올라가는지?
* 2-3. 사진 URL이 정확한지? 들어가서 접속 가능한건지?
* 3. token 등록이 잘 되는지?
* 4. 트레이너 사진 업데이트 후 url 정보가 잘 바뀌었는지 체크?
* */

let requestTrainerInformation = {
    username: '소마인',
    price: '10000',
    carrer: '운동은 습관이다!!',
    phone_number: '301-229-7384'
};


describe('trainerRouter API test', function() {
    let newTestTrainer = null;
    let server = null;
    let request = null;

    before(async () => {
        server = app.listen();
        request = supertest.agent(server);
        await trainerRepository.createTrainer(requestTrainerInformation)
            .then(res => {
                newTestTrainer = res;
            });
    });

    after(() => {
        Trainer.destroy({
            where: {
                id: newTestTrainer.id
            },
        }).then(res => {
            server.close();
        });
    });

    it('should exist one trainer object that username is "소마인"', (done) => {
        let requestUrl = '/trainers/' + newTestTrainer.id;
        request
            .get(requestUrl)
            .expect(200)
            .end((err, res) => {
                if(err) done(err);
                let resResult = JSON.parse(res.text);
                resResult.should.have.value('username', '소마인');
                done();
            })
    });

    it('should success trainer update fcm_token', (done) => {
        let requestUrl = '/trainers/' + newTestTrainer.id + '/token';
        let newFcmToken = "helloWorld";
        request
            .post(requestUrl)
            .send({fcm_token: newFcmToken})
            .expect(201)
            .end(async (err, res) => {
                if(err) done(err);
                let updateTestTrainer = await trainerRepository.findTrainerUsingTrainerId(newTestTrainer.id);
                updateTestTrainer.fcm_token.should.be.eql(newFcmToken);
                done();
            })
    });

    //TODO: 사진 업로드 관련 테스트 코드 작성
});