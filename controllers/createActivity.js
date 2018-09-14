const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v5');

const createActivity = (req, res) => {
  fs.readFile(filePath, 'utf8', (readError, userJson) => {
    if (readError) throw readError;
    const user = JSON.parse(userJson);
    const activityId = uuid();
    const activity = Object.assign({}, req.body, { _id: activityId });
    user.profile.activities.push(activity);

    fs.writeFile(filePath, JSON.stringify(user), writeError => {
      if (writeError) throw writeError;

      res.status(200).send({ profileActivityId: activityId });
    });
  });
};

module.exports = createActivity;
