var Route = require('common/route'),
    View = require('./summaryView');

module.exports = Route.extend({
  initialize: function(options) {
    this.container = options.container;
    this.model = options.model;
  },

  render: function() {
    this.view = new View({
      //collection: this.collection,
      model: this.model
    });
    this.container.show(this.view);
  }
});
