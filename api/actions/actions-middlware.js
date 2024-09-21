// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionId (req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if (action) {
            req.action = action
            next()
        } else {
            next({
                status: 404, message: "actions not found"
            })
        }
    } catch (err) {
        next(err)
    }
}

function validateAction (req, res, next) {
    const { project_id, description, notes, completed } = req.body

    if (typeof project_id !== "number") {
        return res.status(400).json({ message: "Project ID must be a number" })
    } 
    if (!description || typeof description !== "string") {
        return res.status(400).json({ message: "Missing required description field" })
    }
    if (!notes || typeof notes !== 'string') {
        return res.status(400).json({ message: "Notes must be a string" })
    }
    if (typeof completed !== "boolean") {
        return res.status(400).json({ message: 'Completed field must be a boolean'})
    }

    next()
}

module.exports = {
    validateActionId,
    validateAction,
}