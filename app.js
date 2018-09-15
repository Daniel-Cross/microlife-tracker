const express = require('express');
const getActivity = require('./controllers/createActivity');

const app = express();

app.listen(3000, () => console.log('Micro-life app listening on port 3000'));
app.post('/profile/activities', getActivity);
