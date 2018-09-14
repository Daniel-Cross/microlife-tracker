const express = require('express');
const createActivity = require('./controllers/createActivity');
const getActivities = require('./controllers/getActivities');

const app = express();

app.post('/profile/activities', createActivity);
app.get('/profile/activities', getActivities);

app.listen(3000, () => console.log('App listening on port 3000'));
