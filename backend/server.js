require("dotenv").config({ path: "./.env" });
const express = require('express');

const mongoose = require('mongoose');
const jobsCtrl = require('./routes/jobs');
const usersRouter = require('./routes/users');
const jobsRouter = require('./routes/jobs');
const multer = require("multer");
const AWS = require("aws-sdk");
const path = require("path");
const Job = require('./models/Job'); // import the Job model


// express app
const app = express();

//middleware
app.use(express.json());



app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});



// routes
app.use('/api/jobs', jobsRouter);
app.use('/api/users', usersRouter)

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

//connect to db
mongoose.connect(process.env.DATABASE)
.then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
        console.log('listening on port', process.env.PORT);
    });
})

.catch((error) => {
    console.log(error);
});

// configure the AWS SDK with your access and secret keys
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// create an S3 instance
const s3 = new AWS.S3();

// configure multer middleware to handle file uploads
const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, "");
    },
});

const upload = multer({ storage }).single("file");

// define a route for handling file uploads
app.post("/upload-photo", upload, async (req, res) => {
    const file = req.file;

    // create a unique filename for the uploaded file
    const filename = `finders-${file.originalname}`;

    // define the parameters for uploading the file to S3
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename,
        Body: file.buffer,
        ACL: "public-read",
    };

    // upload the file to S3
    s3.upload(params, async (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error uploading file to S3" });
        }

        // generate the URL for the uploaded file
        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${filename}`;

      // return the file URL in the response
      res.json({ url: fileUrl });
    });
  });


