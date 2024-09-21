// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')
const { validateProjectId, validateProject,} = require('./projects-middleware')

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



router.use((error, req, res, next) => { //eslint-disable-line
    res.status(error.status || 500).json({
      message: error.message,
      customMessage: 'Oh no its broke in the projects router'
    })
  })

module.exports = router