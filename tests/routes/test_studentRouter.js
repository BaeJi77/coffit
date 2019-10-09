const should = require('should');
const supertest = require('supertest');
const app = require('../../app');
const {Student} = require('../../models');

/*
* 1. 트레이너 등록이 잘 되는지?
* 1.1 사진을 같이 보냈을 경우
* 1.2 사진을 안보냈을 경우
* 2. 사진 등록이 잘 되는지?
* 2-1. 프로필 사진이 잘 들어가는지?
* 2-3. 사진 URL이 정확한지? 들어가서 접속 가능한건지?
* 3. token 등록이 잘 되는지?
* 4. 트레이너 사진 업데이트 후 url 정보가 잘 바뀌었는지 체크?
* */


const studentRepository = require('../../repositories/studentRepository');
const s3Operation = require('../../modules/s3_operator');
const extractKeyName = require('../../modules/extract_keyName');

describe('studentRouter API test', function() {
    let newTestStudent = null;
    let server = null;
    let request = null;

    before(async () => {
        server = app.listen();
        request = supertest.agent(server);
        newTestStudent = await studentRepository.createStudent({username: '소마인'});
    });

    after(() => {
        Student.destroy({
            where: {
                id: newTestStudent.id
            },
        }).then(res => {
            server.close();
        });
    });

    it('should success when making new student without profilePicture', (done) => {
        request
            .post('/students')
            .send({username: "아무정보없는학생"})
            .expect(201)
            .end((err, res) => {
                if(err) done(err);
                let resResult = JSON.parse(res.text);
                resResult.should.have.value('username', '아무정보없는학생');
                Student.destroy({where: {id: resResult.id}});
                done();
            })
    });

    it('should success when making new student with profilePicture', (done) => {
        request
            .post('/students')
            .attach('profilePicture', __dirname+'/../profilePicture.jpg')
            .field('username', '소마인22')
            .end((err, res) => {
                if(err) done(err);
                let resResult = JSON.parse(res.text);
                resResult.should.have.value('username', '소마인22');
                resResult.should.have.property('picture_url');
                Student.destroy({where: {id: resResult.id}});
                let keyName = 'images/origin/' + extractKeyName(resResult.picture_url);
                s3Operation.deleteS3Object(keyName, '');
                done();
            });
    });


    it('should success student update fcm_token', (done) => {
        let requestUrl = '/students/' + newTestStudent.id + '/token';  // student having id 1 name is '신민욱'
        let newFcmToken = "helloWorld";
        request
            .post(requestUrl)
            .send({fcm_token: newFcmToken})
            .expect(201)
            .end(async (err, res) => {
                if(err) done(err);
                let updateTestStudent = await studentRepository.findStudentUsingStudentId(newTestStudent.id);
                console.log(updateTestStudent);
                updateTestStudent.fcm_token.should.be.eql(newFcmToken);
                done();
            })
    });

    //TODO: 사진 업로드 관련 테스트 코드 작성
});
