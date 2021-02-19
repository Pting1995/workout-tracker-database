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
        // console.log(req.body)
        var ex = []
        ex.push(req.body)
        // console.log(ex)
        workout.findOneAndUpdate({_id: req.params.id},
        {$push: {exercises: ex}})
            .then(dbworkout => {
                res.json(dbworkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    
}