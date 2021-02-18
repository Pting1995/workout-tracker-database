const router = require("express").Router();
const workout = require("../models/workout.js");

module.exports = function (app) {
    router.get("/api/workouts", (req, res) => {
        workout.find({})
            // .sort({ date: -1 })
            .then(dbworkout => {
                res.json(dbworkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    router.post("/api/workouts/:id", ({ body }, res) => {
        workout.create(body)
            .then(dbworkout => {
                res.json(dbworkout);
            })
            .catch(err => {
                res.json(err);
            });
    });
}



// module.exports = router;