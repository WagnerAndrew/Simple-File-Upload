var db = require("../models");

module.exports = function(app) {

  app.get("/", function(req, res) {
    db.Document.findAll({}).then(function(dbDocument) {
      console.log("Doc",dbDocument);
      res.render("index", {
        documents: dbDocument
      });
    });
  });

  app.get("/search", function(req, res) {
    db.Document.findOne({ where: { id: req.params.id } }).then(function(dbDocument) {
      res.render("search", {
        documents: dbDocument
      });
    });
  });

  app.get("/add", function(req, res) {
    res.render("add");
  });

  
};
