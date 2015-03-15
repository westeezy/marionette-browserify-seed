var Route = require('common/route'),
    View = require('./stepOneView');

module.exports = Route.extend({
  initialize: function(options) {
    this.container = options.container;
    this.model = options.model;
  },

  /*fetch: function() {
    this.model = new Model();
    return storage.findAll().then(collection => {
      this.collection = collection;
    });
  },*/

  render: function() {
    this.view = new View({
      //collection: this.collection,
      model: this.model
    });
    this.container.show(this.view);
  }
});
