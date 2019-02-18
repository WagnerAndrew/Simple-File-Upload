var db = require("../models");
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const fileUpload = require('express-fileupload');


AWS.config.credentials = {
  accessKeyId: process.env.IDKEY,
  secretAccessKey: process.env.SECRETKEY,
  region: process.env.REGION
};

var s3Bucket = new AWS.S3({params: {Bucket: process.env.BUCKET}});
const baseAWSURL = `https://s3-us-west-1.amazonaws.com/${process.env.BUCKET}/`;
console.log ("URL IS: ", baseAWSURL);

module.exports = function(app) {

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true}));
app.use(fileUpload());

  app.get("/api/Document", function(req, res) {
    db.Document.findAll({}).then(function(dbDocument) {
      console.log(dbDocument,"Records fetched");
      res.json(dbDocument);
    });
  });


  app.post('/users', function(req, res) {
    console.log("req.body IS: " + JSON.stringify(req.body));
    console.log("req.files.upload IS: " + JSON.stringify(req.files.upload));
    let uploadData = {
      Key: Date.now() + req.files.upload.name,
      Body: req.files.upload.data,
      ContentType: req.files.upload.mimetype,  
      ACL: 'public-read'
    }
    s3Bucket.putObject(uploadData, function(err, data){
      if(err){
        console.log(err);
        return;
      }
      console.log ("For Sequelize req.files: " + req.files.upload)
      db.Document.create({
        source: req.body.source,
        document_name: req.body.title,
        docdate: req.body.docdate,
        category: req.body.category,
        description: req.body.description,
        image: baseAWSURL + uploadData.Key

      }).then(()=>{
        res.redirect('/');
      })
    });
  });
}
