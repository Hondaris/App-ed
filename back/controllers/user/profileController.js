// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private

import asyncHandler from 'express-async-handler'
import ExerciseLog from '../../models/exerciseLogModel.js'
import User from '../../models/userModel.js'
import WorkoutLog from '../../models/workoutLogModel.js'

export const getUsersProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password').lean()

  if (!user) {
    res.status(404)
    throw new Error('Пользователь не найден!')
  }

  const exerciseLogByUser = await ExerciseLog.find({
    user: user._id,
    completed: true,
  })

  let countExerciseTimesCompleted = 0
  let countWeight = 0

  exerciseLogByUser.forEach((log) => {
    countExerciseTimesCompleted += log.times.length

    log.times.forEach((time) => {
      countWeight += time.weight
    })
  })

  const minutes = Math.ceil(countExerciseTimesCompleted * 2.3)

  const workouts = await WorkoutLog.find({
    user: user._id,
    completed: true,
  }).countDocuments()

  res.json({ ...user, minutes, workouts, countWeight })
})
