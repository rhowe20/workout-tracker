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

router.get('/api/workouts/range', async (req, res) => {
    try {
        const workoutRange = await Workout.aggregate([{
            $addFields: {
                totalDuration: { $sum: '$exercises.duration' },
            }
        }]).limit(5);
        res.json(workoutRange);
    } catch (err) {
        res.status(400);
        res.send(`Failed with: ${err}`);
    }
})
module.exports = router;