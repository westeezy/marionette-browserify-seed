var _ = require('underscore'),
    Backbone = require('backbone'),
    View = require('common/view'),
    template = require('./templates/footer.hbs');

module.exports = View.extend({
  template: template,
  tagName: 'nav',
  className: 'footer',

  attributes: {
    role: 'navigation'
  },

  collectionEvents: {
    'all': 'render'
  },

  templateHelpers: function() {
    return {
      stepName: 'Welcome',
      primaryItems: this.serializeWhere({
        type: 'primary'
      }),
      secondaryItems: this.serializeWhere({
        type: 'secondary'
      })
    };
  },

  serializeWhere: function(props) {
    return _.invoke(this.collection.where(props), 'toJSON');
  },

  ui: {
    collapse: '#navbar-collapse'
  },

  events: {
    'show.bs.collapse #navbar-collapse': 'onCollapseShow'
  },

  onCollapseShow: function() {
    this.listenToOnce(Backbone.history, 'route', function() {
      this.ui.collapse.collapse('hide');
    });
  }
});
