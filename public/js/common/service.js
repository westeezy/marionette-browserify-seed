var Marionette = require('backbone.marionette'),
  	Radio = require('backbone.radio'),
  	_ = require('underscore');

var Service = Marionette.Object.extend({
  constructor: function(options) {
    if(this.channelName || options.channelName) {
      this.channel = Radio.channel(_.result(this, 'channelName'));
    }
    Marionette.Object.apply(this, arguments);
  },

  start: function() {
    this.triggerMethod('before:start');
    this._isStarted = true;
    this.triggerMethod('start');
  },

  stop: function() {
    this.triggerMethod('before:stop');
    this._isStarted = false;
    this.triggerMethod('stop');
  },

  isStarted: function() {
    return !!(this._isStarted);
  }
});

module.exports = Service;
