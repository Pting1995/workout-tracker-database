const workout = require("../models/workout.js");


module.exports = function (app) {

    app.get("/api/workouts", (req, res) => {
        workout.aggregate([
            {
                $addFields: { totalDuration: { $sum: "$exercises.duration" } }
            }
        ])
            .then(dbworkout => {
                res.json(dbworkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.post("/api/workouts", ({ body }, res) => {
        workout.create(body)
            .then(dbworkout => {
                res.json(dbworkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.put("/api/workouts/:id", (req, res) => {
        var exer = []
        exer.push(req.body)
        workout.findOneAndUpdate({ _id: req.params.id },
            { $push: { exercises: exer } })
            .then(dbworkout => {
                res.json(dbworkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    // app.get("/api/workouts/range", (req, res) => {
    //     workout.find({})
    //         .then(dbworkout => {
    //         })
    // })

    app.get("/api/workouts/range", (req, res) => {
        workout.find({}).limit(7)
            .then(last7 => {
                res.json(last7)
            })
            .catch(err => {
                res.json(err);
            });
    })
}