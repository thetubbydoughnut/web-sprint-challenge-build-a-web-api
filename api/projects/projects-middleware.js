// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if (project) {
            req.project = project
            next()
        } else {
            next({
                status: 404, message: "project not found"
            })
        }
    } catch (err) {
        next(err)
    }
}

function validateProject(req, res, next) {
    const { name, description, completed } = req.body

    if (!name || typeof name !== "string" || !name.trim()) {
        return res.status(400).json({ message: "Missing required name field" })
    } 
    else if (!description || typeof description !== "string") {
        return res.status(400).json({ message: "Missing required description field" })
    }
    else if (typeof completed !== "boolean") {
        return res.status(400).json({ message: "Completed field must be a boolean" })
    }

    req.name = name.trim();
    next()
}

module.exports = {
    validateProjectId,
    validateProject
}
