var expect = require('chai').expect;

it('hello test', function () {
    expect(true).to.equal(true);
});

it('true is true', function () {
    console.log('test 2');
    expect(true).to.equal(true);
})