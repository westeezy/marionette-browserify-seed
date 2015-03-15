var Collection = require('common/collection'),
  	Model = require('./ApplicationsModel');

module.exports = Collection.extend({
  url: '/app/inprogress',
  model: Model
});
