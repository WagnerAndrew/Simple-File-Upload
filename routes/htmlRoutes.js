var db = require("../models");

module.exports = function(app) {

  app.get("/", function(req, res) {
    db.Document.findAll({}).then(function(dbDocument) {

      res.render("index", {
        documents: dbDocument
      });
    });
  });

  app.get("/add", function(req, res) {
    res.render("add");
  });

  
};
