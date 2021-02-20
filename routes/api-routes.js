const Workout = require("../models/workout.js");


module.exports = function (app) {

    app.get("/api/workouts", (req, res) => {
        Workout.aggregate([
            {
                $addFields: { totalDuration: { $sum: "$exercises.duration" } }
            }
        ])
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.post("/api/workouts", ({ body }, res) => {
        Workout.create(body)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.put("/api/workouts/:id", (req, res) => {
        var exer = []
        exer.push(req.body)
        Workout.findOneAndUpdate({ _id: req.params.id },
            { $push: { exercises: exer } })
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    // app.get("/api/Workouts/range", (req, res) => {
    //     Workout.find({})
    //         .then(dbWorkout => {
    //         })
    // })

    app.get("/api/workouts/range", (req, res) => {
        Workout.find({}).limit(7)
            .then(last7 => {
                res.json(last7)
            })
            .catch(err => {
                res.json(err);
            });
    })
}