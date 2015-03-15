var LayoutView = require('common/layoutview'),
    _ = require('underscore'),
    template = require('./templates/applicationLayout.hbs');

module.exports = LayoutView.extend({
  el: '.application',
  template: template,
  
  regions: {
    header: '.application__header',
    content: '.application__content',
    overlay: '.application__overlay',
    footer: '.application__footer'
  }
});
