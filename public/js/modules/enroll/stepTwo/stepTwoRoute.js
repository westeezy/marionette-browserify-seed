var Route = require('common/route'),
    View = require('./stepTwoView');

module.exports = Route.extend({
  initialize: function(options) {
    this.container = options.container;
    this.model = options.model;
  },

  render: function() {
    this.view = new View({
      model: this.model
    });
    this.container.show(this.view);
  }
});
