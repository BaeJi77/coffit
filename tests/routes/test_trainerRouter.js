var expect = require('chai').expect;

const trainerService = require('../../services/trainerService');
const {Trainer} = require('../../models');

let requestTrainerInformation = {
    username: '소마인',
    price: '10000',
    carrer: '운동은 습관이다!!',
    phone_number: '301-229-7384'
};

let requestTrainerPictures = {
    profilePicture: [
        {
            fieldname: 'profilePicture',
            originalname: '나의 책상.jpeg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            size: 438960,
            bucket: 'coffit',
            key: 'images/origin/1566179452216',
            acl: 'public-read',
            contentType: 'image/jpeg',
            contentDisposition: null,
            storageClass: 'STANDARD',
            serverSideEncryption: null,
            metadata: null,
            location: 'https://coffit.s3.ap-northeast-2.amazonaws.com/images/origin/1566179452216',
            etag: '"43959bdae73119c5a23df6381d44a029"',
            versionId: undefined
        }
    ],
    activityPictures: [
        {
            fieldname: 'activityPictures',
            originalname: '스크린샷 2019-07-21 오후 7.28.14.png',
            encoding: '7bit',
            mimetype: 'image/png',
            size: 436796,
            bucket: 'coffit',
            key: 'images/origin/1566179452221',
            acl: 'public-read',
            contentType: 'image/png',
            contentDisposition: null,
            storageClass: 'STANDARD',
            serverSideEncryption: null,
            metadata: null,
            location: 'https://coffit.s3.ap-northeast-2.amazonaws.com/images/origin/1566179452221',
            etag: '"ec9c7fc23b2d355d3fdbac0eaca0d1b6"',
            versionId: undefined
        }
    ]
};

describe('trainerRouter test', function() {
    let allTrainer;
    before(async () => {
        allTrainer = await trainerService.findAllTrainersOrderByRecognition();
    });

    it('should trainer list is array', async () => {
        expect(allTrainer).to.a('array');
    });

    it('should success get trainer detail when requesting good trainer id', async () => {
        let goodTrainerInformation = await trainerService.findCertainTrainer(1);
        expect(goodTrainerInformation).to.include({'id': 1});
    });

    it('should fail get trainer detail when requesting bad trainer id', async () => {
        let trainerInformationWhenRequestingBadId = await trainerService.findCertainTrainer(-1);
        expect(trainerInformationWhenRequestingBadId).to.be.a('null');
    });


    it('should success create new trainer', async () => {
        let newTrainer = await trainerService.registerNewTrainer(requestTrainerInformation, requestTrainerPictures);
        expect(newTrainer).to.be.a('object');
        await Trainer.destroy({
            where: {
                id: newTrainer.id
            }
        });
    });
});