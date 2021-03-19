const Workout = require('../models/workout')
const router = require('express').Router();

router.get("/workouts", (req, res) => {
    Workout.find({}, (err, docs) =>{
        res.json(docs)
    })
});

router.post("/workouts", (req, res) => {
    Workout.create(req.body, (err, docs) =>{
        res.json(docs)
    })
});

router.put("/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate({_id: req.params.id}, {$push: {exercises: req.body}}, (err, docs) => {
        res.json(docs)
    })
});

router.get("/workouts/range", async (req, res) =>{
try{
const agg = await Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
            $sum: "$exercises.duration"
        },
      },
    },
  ]).sort({_id: -1})
  console.log(agg);
  res.json(agg);
    } catch (err) {
  console.log(err);
  res.send(err.message);
}
})

module.exports = router;