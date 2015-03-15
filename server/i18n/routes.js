var fixture = require('./fixture');

//TODO: More langs
module.exports = function(app) {
  app.route('/i18n/:lang')
  .get(function(req, res) {
    res.json(fixture);
  });
};
