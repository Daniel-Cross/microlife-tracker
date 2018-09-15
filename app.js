const express = require('express');
const createActivity = require('./controllers/createActivity');
const getActivities = require('./controllers/getActivities');

const app = express();

app.listen(3000, () => console.log('Micro-life app listening on port 3000'));
app.post('/profile/activities', createActivity);
app.get('/profile/activities', getActivities);
