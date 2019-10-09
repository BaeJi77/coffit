const should = require('should');
const supertest = require('supertest');
const app = require('../../app');

const {Mission} = require('../../models');

/*
* exercise video row를 하나 만들어봐야겠구나. -> 어떻게 연결하지...?
* 1. 미션 등록시
*   - 삭제랑 ptId 잘 뽑아내는지 + 삭제한 내용 숫자가 맞는지.
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

describe('mission API test', function() {
    let server = null;
    let request = null;
    let requestUrl = '/missions/';


});