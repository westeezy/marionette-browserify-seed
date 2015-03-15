var Marionette = require('backbone.marionette'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    Radio = require('backbone.radio'),
    Route = require('./route');

module.exports = Marionette.AppRouter.extend({
  constructor: function() {
    this.channel = Radio.channel('router');

    this.on('all', this._onRouterEvent);
    this.listenTo(Backbone.history, 'route', this._onHistoryRoute);
    Marionette.AppRouter.apply(this, arguments);
  },

  _onRouterEvent: function(name, args) {
    this.channel.trigger(name, this, args);
  },

  _onHistoryRoute: function(router) {
    if(this === router) {
      this.active = true;
    } else {
      this.active = false;
    }
  },

  execute: function(callback, args) {
    var that = this;
    if(!this.active) {
      this.triggerMethod('before:enter', args);
    }

    this.triggerMethod('before:route', args);

    $.when(this._execute(callback, args)).then(function() {
      if(!this.active) {
        that.triggerMethod('enter', args);
      }
      that.triggerMethod('route', args);
    });
  },

  _execute: function(callback, args) {
    var route = callback.apply(this, args);

    if(route instanceof Route) {
      route.router = this;
      return route.enter(args);
    }
  },

  triggerMethod: Marionette.triggerMethod
});
