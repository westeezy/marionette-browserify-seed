var Marionette = require('backbone.marionette'),
    Backbone = require('backbone');

module.exports = Marionette.Object.extend({

  _triggerMethod: function(name, args) {
    if(this.router) {
      this.router.triggerMethod(name + ':route', args);
    }
    this.triggerMethod(name, args);
  },

  enter: function(args) {
    var that = this;
    this._triggerMethod('before:enter', args);
    this._triggerMethod('before:fetch', args);

    return Promise.resolve(this.fetch(args))
      .then(function() {
        that._triggerMethod('fetch', args);
        that._triggerMethod('before:render', args);
      })
      .then(function() {
        that.render(args);
      })
      .then(function() {
        that._triggerMethod('render', args);
        that._triggerMethod('enter', args);
      })
      .catch(function() {
        that._triggerMethod('error', args);
      });
  },

  navigate: function() {
    Backbone.history.navigate(arguments);
  },

  fetch: function() {},
  render: function() {}
});