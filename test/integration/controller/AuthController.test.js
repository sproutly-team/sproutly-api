require('chai').should()

const request = require('supertest')
const app = require('../../../app')

describe('POST /signup', () => {
  it('should return Sign User successfully', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        email: 'sproutlyowner50@gmail.com',
        firstname: 'sproutly',
        lastname: 'owner',
        password: 'password'
      })
      .expect(200)
      .expect('Content-Type', /json/)

    const { message, data } = response

    message.should.be.eql('Successfully Signed Up')
    data.email.should.eql('sproutlyowner50@gmail.com')
    data.role.should.eql('businessOwner')
    data.authenticated.should.eql(false)
  })
})
