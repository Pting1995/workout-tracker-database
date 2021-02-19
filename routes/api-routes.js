const workout = require("../models/workout.js");
const router = require("express")

module.exports = function (app) {
    
    app.get("/api/workouts", (req, res) => {
        workout.find({})
            //     // .sort({ date: -1 })
            .then(dbworkout => {
                res.json(dbworkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    // router.post("/api/workouts", ({ body }, res) => {
    //     workout.create(body)
    //         .then(dbworkout => {
    //             res.json(dbworkout);
    //         })
    //         .catch(err => {
    //             res.json(err);
    //         });
    // });
}