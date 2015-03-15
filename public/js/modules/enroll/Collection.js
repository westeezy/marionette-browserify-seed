var Collection = require('common/collection'),
 	Model = require('./EnrollModel');

module.exports = Collection.extend({
  url: '/app/application',
  model: Model
});
