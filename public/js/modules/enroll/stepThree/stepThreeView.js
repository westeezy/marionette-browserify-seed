var View = require('common/view'),
    Form = require('common/behaviors/form'),
    Radio = require('backbone.radio'),
    Backbone = require('backbone'),
    validator = require('../validations/validateSignInfo');
template = require('./templates/stepThree.hbs');

module.exports = View.extend({
  template: template,
  className: 'sign-view container fadeInRight',
  nextStep: 'summary',

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
    return validator.validate(this.form, this.model);
  }
});
