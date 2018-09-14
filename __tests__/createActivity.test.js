const fs = require('fs');
const path = require('path');
const events = require('events');
const httpMocks = require('node-mocks-http');

const createActivity = require('../controllers/createActivity');

jest.mock('uuid/v5', () => jest.fn(() => 'abc123'));

describe('create activity', () => {
  it('adds an activity to the profile', done => {
    expect.assertions(2);

    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/profile/activities',
      body: {
        activityId: 'short-walk',
        quantity: 1
      }
    });

    const response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    createActivity(request, response);

    response.on('end', () => {
      const filePath = path.join(__dirname, '../controllers', 'user.json');

      fs.readFile(filePath, 'utf8', (error, userJson) => {
        expect(response.statusCode).toEqual(200);

        const user = JSON.parse(userJson);
        const activity = Object.assign(request.body, { _id: 'abc123' });

        expect(user.profile.activities).toContainEqual(
          expect.objectContaining(activity)
        );
        done();
      });
    });
  });
  afterEach(() => {
    const filePath = path.join(__dirname, '../controllers', 'user.json');
    fs.writeFileSync(filePath, '{"profile": {"activities": []}}');
  });
});
