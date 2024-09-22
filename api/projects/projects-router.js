// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')
const { validateProjectId, validateProject} = require('./projects-middleware')

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(next)
});

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
});

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
    .then(project => {
        console.log(project)
        res.status(201).json(project)
    })
    .catch(next)
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    const { id } = req.params

    Projects.update(id, req.body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(next)
})

router.delete('/:id', validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
    .then(
        res.status(200).send()
    )
    .catch(next)
})

// Action routes within the Projects
const actionsRouter = express.Router();
router.use('/', actionsRouter)

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const { id } = req.params
        const actions = await Projects.getProjectActions(id);
        console.log(actions); // Log the actions to see the data being returned
        res.status(200).json(actions);
    } catch (err) {
        next(err);
    }
});

router.use((error, req, res, next) => { //eslint-disable-line
    res.status(error.status || 500).json({
      message: error.message,
      customMessage: 'Oh no its broke in the projects router'
    })
  })

module.exports = router