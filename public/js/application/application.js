var $ = require('jquery'),
    _ = require('underscore'),
    Radio = require('backbone.radio'),
    Application = require('../common/application'),
    LayoutView = require('./ApplicationView');

var routerChannel = Radio.channel('router');

module.exports = Application.extend({
  initialize: function() {
    this.$body = $(document.body);
    this.layout = new LayoutView();
    this.layout.render();

    this.listenTo(routerChannel, {
      'before:enter:route': this.onBeforeEnterRoute,
      'enter:route': this.onEnterRoute,
      'error:route': this.onErrorRoute
    });
  },

  onBeforeEnterRoute: function() {
    this.transitioning = true;
  },

  onEnterRoute: function() {
    this.transitioning = false;
    this.$body.scrollTop(0);
  },

  onErrorRoute: function() {}
});
