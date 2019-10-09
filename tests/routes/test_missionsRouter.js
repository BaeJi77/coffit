const should = require('should');
const supertest = require('supertest');
const app = require('../../app');

const {Mission} = require('../../models');
const missionRepository = require('../../repositories/missionRepository');

/*
* exercise video row를 하나 만들어봐야겠구나. -> 어떻게 연결하지...?
* 1. 미션 등록시
*   - 삭제랑 ptId 잘 뽑아내는지 + 삭제한 내용 숫자가 맞는지. // 똑같은 날짜로 해서 mission이 하나만 있는 것을 체크
* 2. 미션 detail
*   - preSingedUrl 가져올 수 있는지.
*     - exerciseVideo가 있을 때
*     - exerciseVideo가 없을 때
*   - exerciseVideo 잘 넘어노는지
* 3. update rate and comment about mission
*   - 업데이트 되었는지
* 4. missions of student
*   - student에 등록되어진 mission 수가 맞는지.
*   - 정확한 그 mission 들을 가지고 있는지 -> id 체크
* */

let requestNewMission = {
    "missions": [
        {
            "id": 2,
            "contents": "newMission",
            "date": "2019-10-20",
            "pt_id": 1,
            "trainer_id": 1,
            "student_id": 1
        }
    ]
};

describe('mission API test', function() {
    let server = null;
    let request = null;
    let requestUrl = '/missions/';
    let newTestMission = null;

    before(async () => {
        server = app.listen();
        request = supertest.agent(server);
        // newTestMission = await missionRepository.createNewMission(requestNewM)
    });

    after(() => {
        server.close();
    });

    it('should success when requesting getMissionDetail.', (done)=> {
        let getMissionDetailUrl = requestUrl + '1';
        request
            .get(getMissionDetailUrl)
            .expect(200)
            .end((err, res) => {
                if(err) done(err);
                let resResult = JSON.parse(res.text);
                resResult.should.have.value('contents', 'oldMission');
                resResult.should.have.properties('preSignedUrl');
                done();
            })
    });

    it('should success when updating contents and rate', (done => {
        let updateMissionUrl = requestUrl + '1';
        request
            .put(updateMissionUrl)
            .expect(204)
            .send({rate: 5, comment: "testComment"})
            .end(async (err, res) => {
                if(err) done(err);
                let updateMission = await missionRepository.findMissionUsingMissionId(1);
                updateMission.comment.should.be.eql('testComment');
                updateMission.rate.should.be.eql(5);
                done();
            })
    }));

    it('should there is one mission of student', (done) => {
        let getMissionOfStudentUrl = requestUrl + 'students/1';
        request
            .get(getMissionOfStudentUrl)
            .expect(200)
            .end((err, res) =>{
                if(err) done(err);
                let resResult = JSON.parse(res.text);
                resResult.should.have.length(1);
                resResult[0].should.have.value('contents', 'oldMission');
                done();
            })
    });

    it('should make new mission. So, remove same date, ptId mission', (done) => {
        let makeNewMissionUrl = requestUrl;
        request
            .post(makeNewMissionUrl)
            .expect(201)
            .query({ptId: 1})
            .send(requestNewMission)
            .end(async (err, res) => {
                if(err) done(err);
                let missionOfStudent = await missionRepository.findAllMissionOfStudent(1);
                missionOfStudent.should.have.length(1);
                missionOfStudent[0].contents.should.be.eql('newMission');
                done();
            })
    })
});
