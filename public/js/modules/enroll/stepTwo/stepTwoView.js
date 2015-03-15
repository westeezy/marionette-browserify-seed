var View = require('common/view'),
    Form = require('common/behaviors/form'),
    Radio = require('backbone.radio'),
    Backbone = require('backbone'),
    validator = require('../validations/validateContactInfo');
template = require('./templates/stepTwo.hbs');

module.exports = View.extend({
  template: template,
  className: 'contact-view container fadeInRight',
  nextStep: 'three',

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
