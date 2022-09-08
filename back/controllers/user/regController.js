// @desc   Register user
// @route  POST /api/users
// @access Public

import User from '../../models/userModel.js'
import asyncHandler from 'express-async-handler'
import { generateToken } from '../../helpers/generateToken.js'

export const regUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const isExistUser = await User.findOne({ email })

  if (isExistUser) {
    res.status(400)
    throw new Error('Данный пользователь уже существует')
  }

  const user = await User.create({
    email,
    password,
  })

  const token = generateToken(user._id)

  //Create token

  res.json({ user, token })
})
