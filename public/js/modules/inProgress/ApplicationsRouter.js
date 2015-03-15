var Router = require('common/router'),
    Radio = require('backbone.radio'),
    ApplicationIndexRoute = require('./index/ApplicationsIndexRoute');

module.exports = Router.extend({
  initialize: function(options) {
    this.container = options.container;

    Radio.command('header', 'add', {
      name: 'Applications',
      path: 'applications',
      type: 'primary'
    });
  },

  onBeforeEnter: function() {
    Radio.command('header', 'activate', {
      path: 'applications'
    });

    Radio.command('header', 'remove', {
      name: 'Enroll',
      path: 'enroll',
      type: 'primary'
    });
  },

  routes: {
    'applications': 'showApplications',
    'applications/page/:id': 'showApplications',
    'applications/new': 'create',
    'applications/:id': 'show',
    'applications/:id/edit': 'edit'
  },

  showApplications: function(pageId) {
    return new ApplicationIndexRoute({
      container: this.container,
      page: pageId || 1
    });
  },

  create: function() {
    return new CreateRoute({
      container: this.container
    });
  },

  show: function() {
    return new ShowRoute({
      container: this.container
    });
  },

  edit: function() {
    return new EditRoute({
      container: this.container
    });
  }
});
