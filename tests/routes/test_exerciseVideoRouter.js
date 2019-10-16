const should = require('should');
const supertest = require('supertest');
const app = require('../../app');

const exerciseVideoRepository = require('../../repositories/exerciseVideoRepository');
const missionRepository = require('../../repositories/missionRepository');

// const request = require('../helper').request;

/*
* 1. add tag
*   - check is_converted in mission
*   - check 'time_tag' column
* 2. delete exerciseVideo
*   - check has_video in mission.
*   - check removing exerciseVideo row.
* 3. make new exerciseVideo
*   - check response value
*   - made exerciseVideo row
* */

let makeExerciseVideoDeletedFromTest = {

};

let requestExerciseVideo = {
    id: 2,
    "date": "2019-10-20",
    "videoFormat": "mp4",
    "student_id": 1,
    "trainer_id": 1,
    "mission_id": 1
};

describe('exerciseVideo API test', () => {
    let requestUrl = '/exerciseVideos/';
    let server = null;
    let request = null;

    before(async () => {
        server = app.listen();
        request = supertest.agent(server);
    });

    after(() => {
        server.close();
    });

    it('Add video tags', (done) => {
        let addTagsRequestUrl = requestUrl+'tags/1';
        let timeTags = '["01:30", "05:30"]';
        request
            .put(addTagsRequestUrl)
            .expect(204)
            .send({'time_tag': timeTags})
            .end(async (err, res) => {
                if(err) done(err);
                let exerciseVideoInformation = await exerciseVideoRepository.findCertainExerciseVideo(1);
                exerciseVideoInformation.time_tag.should.be.eql(timeTags);
                let missionInformation = await missionRepository.findMissionUsingMissionId(1);
                missionInformation.is_converted.should.be.eql(true);
                done();
            })
    });

    it('Make new exerciseVideo', (done) => {
        let makeNewExerciseVideoRequestUrl = requestUrl;
        request
            .post(makeNewExerciseVideoRequestUrl)
            .send(requestExerciseVideo)
            .expect(201)
            .end(async (err, res) => {
                if(err) done(err);
                let resResult = JSON.parse(res.text);
                resResult.should.have.property('url');
                resResult.should.have.value('url', 'https://s3.ap-northeast-2.amazonaws.com/coffit');
                resResult.fields.should.have.properties('key', 'bucket', 'Policy', 'X-Amz-Signature');
                resResult.fields.key.should.be.eql('missions/origin/2.mp4');
                done();
            })
    });

    it('Delete exerciseVideo. Has_video column is updated.', (done) => {
        let deleteExerciseVideoRequestUrl = requestUrl + '2';
        request
            .delete(deleteExerciseVideoRequestUrl)
            .query({missionId: 1})
            .end(async (err, res) => {
                if(err) done(err);
                let missionRelated = await missionRepository.findMissionUsingMissionId(1);
                missionRelated.has_video.should.be.eql(false);
                missionRelated.is_converted.should.be.eql(false);
                done();
            })
    })
});