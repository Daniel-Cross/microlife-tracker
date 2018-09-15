const fs = require('fs');
const path = require('path');

const getMicroLifeAdjustment = (req, res) => {
  const userJsonPath = path.join(__dirname, 'user.json');

  fs.readFile(userJsonPath, 'utf8', (userErr, userJson) => {
    if (userErr) throw userErr;

    const activitiesJsonPath = path.join(__dirname, 'activities.json');

    fs.readFile(activitiesJsonPath, 'utf8', (activitiesErr, activitiesJson) => {
      if (activitiesErr) throw activitiesErr;

      const user = JSON.parse(userJson);
      const activities = JSON.parse(activitiesJson).activities;

      const profileActivities = user.profile.activities.map(profileActivity => {
        const getActivityById = activity =>
          activity._id === profileActivity.activityId;
        const matchingActivity = activities.find(getActivityById);

        return Object.assign(matchingActivity, profileActivity);
      });

      const totalAdjustment = (total, activity) =>
        total + activity.effect * activity.quantity;
      const adjustment = profileActivities.reduce(totalAdjustment, 0);

      res.status(200).send({ dayTotal: 48 + adjustment });
    });
  });
};

module.exports = getMicroLifeAdjustment;
