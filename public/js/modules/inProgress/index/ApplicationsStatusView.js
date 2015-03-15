var ItemView = require('common/view'),
    _ = require('underscore'),
    template = require('./templates/applicationStatus.hbs');

module.exports = ItemView.extend({
  tagName: 'a',
  className: 'colors__item list-group-item',
  template: template, 

  templateHelpers: function() {
    return {
      hex: '#'+Math.floor(Math.random()*16777215).toString(16)
    };
  },

  attributes: function() {
    return {
      href: '#enroll/application/' + this.model.get('id')
    };
  },

  modelEvents: {
    'all': 'render'
  }
});