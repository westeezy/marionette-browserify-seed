var Collection = require('../ApplicationsCollection'),
    Route = require('common/route'),
    Model = require('../ApplicationsModel'),
    Collection = require('../ApplicationsCollection'),
    LayoutView = require('./ApplicationsLayoutView');

module.exports = Route.extend({
  initialize: function(options) {
    this.page = options.page;
    this.container = options.container;
    this.model = new Model();
    this.collection = new Collection();
  },

  fetch: function() {
    return this.collection.fetch();
  },

  render: function(params) {
    this.layoutView = new LayoutView({
      collection: this.collection,
      page: this.page
    });

    this.container.show(this.layoutView);
  }
});
