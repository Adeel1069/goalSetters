const express = require('express')
const router = express.Router()
const {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
} = require('../controllers/goalController')

// router.get('/', getGoals)

// router.post('/', setGoals)

// router.put('/:id', updateGoal)

// router.delete('/:id', deleteGoal)

// More concise way
router.route('/').get(getGoals).post(setGoals)
router.route('/:id').delete(deleteGoal).put(updateGoal)

module.exports = router