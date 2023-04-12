const express = require('express')
const Job = require('../models/Job')
const multer = require("multer");
const jobsCtrl = require('../controllers/jobsController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

router.use(requireAuth) //require auth for all workout routes
router.get('/', jobsCtrl.getAllJobs);
router.get('/profile', jobsCtrl.getUserJobs);
// router.post('/create', jobsCtrl.createJob);
router.get('/:id', jobsCtrl.showJob);
router.delete('/:id', jobsCtrl.deleteJob);
router.patch('/:id', jobsCtrl.updateJob);
router.post('/create', multer({
    dest: 'temp/',
    limits: { fieldSize: 8 * 1024 * 1024 }
  }).single('photo'), jobsCtrl.createJob);


module.exports = router;

