var Router = require('common/router'),
    Radio = require('backbone.radio'),
    IndexRoute = require('./route');

module.exports = Router.extend({
  initialize: function(options) {
    this.container = options.container;
  },

  onBeforeEnter: function() {
    Radio.command('header', 'activate', {
      path: ''
    });
  },

  routes: {
    '': 'index'
  },

  index: function() {
    return new IndexRoute({
      container: this.container
    });
  }
});
