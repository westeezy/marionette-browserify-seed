var View = require('common/view'),
  	template = require('./templates/view.hbs');

module.exports = View.extend({
  template: template,
  className: 'index'
});
