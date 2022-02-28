const asyncHandler = require('express-async-handler')
//@desc        Get goals
//@route       GET /api/goals
//@access      Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get Goals' })
})

//@desc        Set goal
//@route       POST /api/goals
//@access      Private
const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        //custom error handling
        // res.status(400).json({message: 'Please add a text field.'})

        //express default error handling
        res.status(400)
        throw new Error('Please add a text field.')
    }
    res.status(200).json({ message: 'Set Goals' })
})

//@desc        Update goal
//@route       PUT /api/goals:id
//@access      Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update Goal ${req.params.id}` })
})

//@desc        Delete goals
//@route       DELETE /api/goals:id
//@access      Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete Goal ${req.params.id}` })
})


module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal,
}