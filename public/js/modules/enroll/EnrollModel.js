var Model = require('common/model');

module.exports = Model.extend({
  urlRoot: '/app/application',

  defaults: {
    active: false
  },

  validate: function(attrs) {}
});
