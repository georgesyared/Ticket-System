const express = require('express')
const { createNote, getNotes } = require('../Controllers/noteController')
const router = express.Router({ mergeParams: true })

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getNotes).post(protect, createNote)

module.exports = router

