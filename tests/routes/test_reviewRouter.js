const should = require('should');
const supertest = require('supertest');
const app = require('../../app');
const assert = require('assert');
const {Review, Trainer} = require('../../models');

/*
* 1. trainer id에 따른 review 수
* 2. review 등록시 제대로 등록되었는지 확인
*  - 트레이너 점수 올라갔는지 + 트레이너 review 수가 올라갔는지
* */

let newReviewObject = {
    title: 'newReviewTitle',
    contents: 'newReviewContents',
    star: 5,
    student_id: 1,
    trainer_id: 1
};

describe('reviewRouter API test', function() {
    let request = null;
    let server = null;

    before(() => {
        server = app.listen();
        request = supertest.agent(server);
    });

    after(() => {
        server.close();
    });

    it('should success get trainer review', (done) => {
        request
            .get('/reviews/1')
            .expect(200)
            .end((err, res) => {
                if(err) done(err);
                let resResult = JSON.parse(res.text);
                resResult.should.be.an.instanceof(Array);
                resResult[0].should.have.value('title', 'reviewTitle');
                resResult[0].should.have.value('star', 5);
                done();
            });
    });

    it('should success making new review and update trainer score', (done) => {
        request
            .post('/reviews')
            .send(newReviewObject)
            .expect(201)
            .end(async (err, res) => {
                let resResult = JSON.parse(res.text);
                console.log(resResult);
                let updatedTrainer = await Trainer.findByPk(1, {raw:true});
                console.log(updatedTrainer);
                updatedTrainer.should.have.value('total_star', 5);
                updatedTrainer.should.have.value('num_review', 1);
                done();
            })
    })
});