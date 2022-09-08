// @desc   Create new workout
// @route  POST /api/workouts
// @access Private

import asyncHandler from 'express-async-handler'
import Workout from '../../models/workoutModel.js'

export const createNewWorkout = asyncHandler(async (req, res) => {
  const { name, exercisesId } = req.body

  const workout = await Workout.create({
    name,
    exercises: exercisesId,
  })

  res.json(workout)
})

// @desc   Get workout
// @route  GET /api/workouts/:id
// @access Private

export const getWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id)
    .populate('exercises')
    .lean()

  const minutes = Math.ceil(workout.exercises.length * 3.7)

  res.json({ ...workout, minutes })
})

// @desc   Update workout
// @route  PUT /api/workouts
// @access Private
export const updateWorkout = asyncHandler(async (req, res) => {
  const { name, exercisesId, workoutId } = req.body

  const currentWorkout = await Workout.findById(workoutId)

  if (!currentWorkout) {
    res.status(404)
    throw new Error('Данная тренировка не найдена!')
  }

  currentWorkout.name = name
  currentWorkout.exercises = exercisesId

  const updatedWorkout = await currentWorkout.save()

  res.json(updatedWorkout)
})

// @desc   Delete workout
// @route  DELETE /api/workouts
// @access Private
export const deleteWorkout = asyncHandler(async (req, res) => {
  const { workoutId } = req.body
  const currentWorkout = await Workout.findById(workoutId)

  if (!currentWorkout) {
    res.status(404)
    throw new Error('Данная тренировка не найдена!')
  }

  await currentWorkout.remove()

  res.json({ message: 'Тренировка удалена' })
})
