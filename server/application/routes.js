var Backbone = require('backbone');
var fixture = require('./fixture');
var collection = new Backbone.Collection(fixture);
var inProgressApp = require('./inprogress_fixture');

var id = collection.length;

module.exports = function(app) {
  app.route('/app/inprogress')
  .get(function(req, res) {
    res.json(collection);
  })

  app.route('/app/application/:id')
  .get(function(req, res) {
  	if(isNaN(req.params.id)) {
  		res.json({});
  	} else {
    	res.json(inProgressApp);	
  	}
  });
};
