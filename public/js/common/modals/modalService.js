var Service = require('common/service'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    LayoutView = require('./modalLayoutView'),
    AlertView = require('./alert/alertView');

module.exports = Service.extend({
  channelName: 'modal',

  initialize: function(options) {
    this.container = options.container;
    this.start();
  },

  onStart: function() {
    this.channel.reply({
      'open': this.open,
      'close': this.close,
      'alert': this.alert
    }, this);

    this.layout = new LayoutView();
    this.container.show(this.layout);

    this.listenTo(Backbone.history, {
      'route': this.onRoute
    });
  },

  onStop: function() {
    delete this.layout;
    this.container.reset();
    this.channel.reset();
  },

  onRoute: function() {
    if(this.fragment !== Backbone.history.fragment) {
      this.close();
    }
  },

  alert: function(options) {
    var deferred = $.Deferred();
    var view = new AlertView(options);

    view.on({
      'confirm': deferred.resolve,
      'cancel': deferred.resolve
    });

    return deferred;
  },

  open: function(view) {
    var self = this;
    this.fragment = Backbone.history.fragment;
    return this.close().then(function() {
      self.isOpen = true;
      return self.layout.open(view);
    });
  },

  close: function() {
    if(this.isOpen) {
      this.isOpen = false;
      return this.layout.close();
    } else {
      return $.Deferred().resolve();
    }
  }
});
