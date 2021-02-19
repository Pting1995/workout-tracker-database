const workout = require("../models/workout.js");


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
        workout.findOneAndUpdate({_id: req.params.id},
        {$push: {exercise: req.body}})
            .then(dbworkout => {
                res.json(dbworkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.get("/api/workouts/range", (req, res) => {

        workout.find({})
            .then(dbworkout => {
                console.log(dbworkout[0])
                res.json(dbworkout.aggregate([
                    {
                        $group:
                        {
                            _id: { day: { $dayOfYear: "$date" }},
                            totalDuration: { $sum: "duration" },
                            // count: { $sum: 1 }
                        }
                    }
                ]));
            })
            .catch(err => {
                res.json(err);
            });

        // workout.aggregate([
        //     {
        //         $group:
        //         {
        //             _id: { day: { $dayOfYear: "$date" }},
        //             totalDuration: { $sum: "duration" },
        //             // count: { $sum: 1 }
        //         }
        //     }
        // ])
    });
}