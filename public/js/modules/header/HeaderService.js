var _ = require('underscore'),
    Service = require('common/service'),
    Collection = require('common/collection'),
    View = require('./HeaderView');

module.exports = Service.extend({
  channelName: 'header',

  initialize: function(options) {
    this.container = options.container;
    this.collection = new Collection();
    this.start();
  },

  onStart: function() {
    this.view = new View({
      collection: this.collection
    });
    this.container.show(this.view);

    this.channel.comply({
      add: this.onAdd,
      activate: this.onActivate,
      remove: this.onRemove
    }, this);
  },

  onStop: function() {
    this.channel.reset();
  },

  onAdd: function(model) {
    var exists = this.collection.findWhere({
      name: model.name
    });

    if(!exists) {
      this.collection.add(model);
    }
  },

  onRemove: function(model) {
    model = this.collection.findWhere(model);
    this.collection.remove(model);
  },

  onActivate: function(model) {
    this.collection.invoke('set', 'active', false);
    model = this.collection.findWhere(model);
    if(model) {
      model.set('active', true);
    }
  }
});
