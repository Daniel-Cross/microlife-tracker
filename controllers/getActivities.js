const fs = require('fs');
const path = require('path');

const getActivities = (req, res) => {
  const filePath = path.join(__dirname, 'user.json');

  fs.readFile(filePath, 'utf8', (readError, userJson) => {
    if (readError) throw readError;

    const user = JSON.parse(userJson);

    res.status(200).send(user.profile.activities);
  });
};

module.exports = getActivities;
