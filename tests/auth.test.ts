import App from '../src/app';
import environment from '../src/config/environment'
import 'dotenv/config'

import chai from 'chai'
import chaiHttp from 'chai-http'
import {describe, it} from 'mocha'

const app = new App(Number(environment.PORT), environment.DB_URL);

const should = chai.should();

chai.use(chaiHttp);

// Agent that will keep track of our cookies
const agent = chai.request("http://localhost:4000");


describe('login', function () {
  const data:any = { email: 'masterawssNOT@gmail.com', password: '1234' }
  it('should not be able to login if they have not registered', function (done) {
    agent
      .post('/auth/local/login')
      .send(data)
      .end( (err, res) => {
        res.should.have.status(400);
        done();
    });
  });

  const dataCorrect:any = { email: 'masterawss@gmail.com', password: '1234' }
  it('should be able to login', function (done) {
    agent
      .post('/auth/local/login')
      .send(dataCorrect)
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });
});