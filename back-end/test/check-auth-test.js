const expect = require('chai').expect;
const jwt = require("jsonwebtoken");
const checkAuth = require('../middlewaree/check-auth')
const sinon = require("sinon");

describe('check-auth', () => {
it('should throw an error if no authorization header is present', function() {
    const req = {
        get: function(header) {
            return null;
        }
    }
    expect(checkAuth.bind(this, req, {}, () => {})).to.throw('Not authenticated');
})

it('should throw an error if the authorization header is only one string', function() {
    const req = {
        get: function(header) {
            return 'baller'
        }
    };
    expect(checkAuth.bind(this, req, {}, () => {})).to.throw('Authentication failed')
})

it('should yeild a userdata after decoding the token', () => {
    const req = {
        get: function(header) {
            return 'Bearer xdfdfdfsddyz';
        }
    };
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({userId: 'abc'})
    checkAuth(req, {}, () => {});
    expect(req).to.have.property('userData');
    jwt.verify.restore();
})

it('should throw an error if the token cannot be verified', () => {
    const req = {
        get: function(header) {
            return 'Bearer xyz';
        }
    }
    expect(checkAuth.bind(this, req, {}, () => {})).to.throw("Authentication failed at server")
})


})