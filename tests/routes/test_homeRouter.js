var expect = require('chai').expect;

const homeService = require('../../services/homeService');

describe('homeRouter test', function() {
    let trainerListAndBanners;
    before(async () => {
        trainerListAndBanners = await homeService.findAllTrainerAndAdvertisingBanner();
    });
    it('should success get the trainer list and banner', async () => {

        expect(trainerListAndBanners).to.include(Object);
    });

    it('should success get detail trainer_list', async () => {
        expect(trainerListAndBanners.trainer_list[0]).to.include({'id': 1});
    });

    it('should banner detail picture_url is ULR?', async () => {
        expect(trainerListAndBanners.banner[0].picture_url).to.a('string');
    });
});