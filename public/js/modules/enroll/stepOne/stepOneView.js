var View = require('common/view'),
    Form = require('common/behaviors/form'),
    Radio = require('backbone.radio'),
    Backbone = require('backbone'),
    validator = require('../validations/validatePersonalInfo');
template = require('./templates/stepOne.hbs');

module.exports = View.extend({
  template: template,
  className: 'personal-view container fadeInRight',
  nextStep: 'two',

  behaviors: {
    form: {
      behaviorClass: Form
    }
  },

  events: {
    'submit form': 'handleSubmit'
  },

  templateHelpers: function() {
    return {
      errors: this.model.validationError
    };
  },

  validate: function() {
    return validator.validate(this.form);
  }
});
