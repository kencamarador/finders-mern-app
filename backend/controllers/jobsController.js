const Job = require('../models/Job')
const mongoose = require('mongoose')
const AWS = require("aws-sdk");
const fs = require("fs");
//create a new job

// const createJob = async(req, res) => {
//     const {title, description, pay, contactEmail, city, province, contactNumber, photo} = req.body
//     try{
//         const tasks = await Job.create({title, description, city, province, pay, contactEmail, contactNumber, photo})
//     res.status(200).json(tasks)
//     } catch (error){
//         res.status(400).json({error: error.message})
//     }
// }

const getUserJobs = async (req, res) => {
  const user_id = req.user._id
    const tasks = await Job.find({user_id}).sort({_id: - 1})
    res.status(200).json(tasks)
}   

const getAllJobs = async (req, res) => {
  const tasks = await Job.find({}).sort({_id: - 1})
  res.status(200).json(tasks)
}   

const showJob = async (req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such job'})
    }
    const tasks = await Job.findById(id)

    if (!tasks) {
        return res.status(404).json({error: 'No such job'})
    }
    res.status(200).json(tasks)
}

const deleteJob = async (req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such job'})
    }
    const tasks = await Job.findOneAndDelete({_id: id})
    if (!tasks) {
        return res.status(404).json({error: 'No such job'})
    }
    res.status(200).json(tasks)
}

const updateJob = async (req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such job'})
    }
    const tasks = await Job.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!tasks) {
        return res.status(404).json({error: 'No such job'})
    }
    res.status(200).json(tasks)
}

const createJob = async (req, res) => {
        AWS.config.setPromisesDependency();
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });

      const s3 = new AWS.S3();
      const user_id = req.user._id

      if(!req.file){
        res.status(400).json({message: 'no file uploaded'})
        return;
      }
      var params = {
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET_NAME,
      Body: fs.createReadStream(req.file.path),
      Key: `userAvatar/${req.file.originalname}`
    };

    s3.upload(params, (err, data) => {
        if (err) {
          console.log('Please attach a photo', err);
        }
  
        if (data) {
          fs.unlinkSync(req.file.path); 
          const locationUrl = data.Location;
          let newPost = new Job({ ...req.body, photo: locationUrl, user_id});
          newPost
            .save()
            .then(post => {
              res.json({ message: 'Post created successfully', post });
            })
            .catch(err => {
              console.log('Error occured while trying to save to DB');
            });
        }
      });
    }
  
module.exports = { createJob, showJob, deleteJob, updateJob, getAllJobs, getUserJobs }

