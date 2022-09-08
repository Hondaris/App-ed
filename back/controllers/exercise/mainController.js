import asyncHandler from 'express-async-handler'
import Exercise from '../../models/exerciseModel.js'

// @desc   Create new exercise
// @route  POST /api/exercises
// @access Private
export const createNewExercise = asyncHandler(async (req, res) => {
  const { name, times, imageId } = req.body

  const exercise = await Exercise.create({
    name,
    times,
    image: imageId,
  })

  res.json(exercise)
})

// @desc   Update exercise
// @route  PUT /api/exercises
// @access Private
export const updateExercise = asyncHandler(async (req, res) => {
  const { exerciseId, name, times, imageId } = req.body
  const currentExercise = await Exercise.findById(exerciseId)

  if (!currentExercise) {
    res.status(404)
    throw new Error('Данное упражнение не найдено!')
  }

  currentExercise.name = name
  currentExercise.times = times
  currentExercise.imageId = imageId

  const updatedExercise = await currentExercise.save()

  res.json(updatedExercise)
})

// @desc   Delete exercise
// @route  DELETE /api/exercises
// @access Private
export const deleteExercise = asyncHandler(async (req, res) => {
  const { exerciseId } = req.body
  const currentExercise = await Exercise.findById(exerciseId)

  if (!currentExercise) {
    res.status(404)
    throw new Error('Данное упражнение не найдено!')
  }

  await currentExercise.remove()

  res.json({ message: 'Упражнение удалено' })
})
