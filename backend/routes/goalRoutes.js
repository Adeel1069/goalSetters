const express = require('express')
const router = express.Router()
const {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
} = require('../controllers/goalController')
const { protect } = require('../middleware/authMiddleware')

// router.get('/', getGoals)

// router.post('/', setGoals)

// router.put('/:id', updateGoal)

// router.delete('/:id', deleteGoal)

// More concise way
router.route('/').get(protect, getGoals).post(protect, setGoals)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

module.exports = router