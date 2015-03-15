var Syphon = require('backbone.syphon'),
    Radio = require('backbone.radio'),
    Behavior = require('common/behavior');

module.exports = Behavior.extend({
  events: {
    'submit form': 'handleSubmit'
  },

  initialize: function() {
    this.listenTo(this.view.options.model, 'change', this.onChange);
  },

  serialize: function() {
    this.view.form = Syphon.serialize(this);
  },

  deserialize: function() {
    return Syphon.deserialize(this, this.view.form);
  },

  onChange: function() {
    this.view.form = this.view.model.attributes;
    this.deserialize();
  },

  onBeforeRender: function() {
    if(this.view.form) {
      this.serialize();
    }
  },

  onDomRefresh: function() {
    if(!this.view.form) {
      this.view.form = this.view.model.attributes;
    }
    this.deserialize();
  },

  handleSubmit: function(event) {
    event.preventDefault();
    this.view.form = Syphon.serialize(this);

    if(this.view.validate && typeof this.view.validate === 'function') {
      var errors = this.view.validate();
      if(errors && errors.length) {
        this.view.model.validationError = errors;
        this.view.render();
      } else {
        //go to next step
        if(!this.view.handleSubmit) { //if the view doesn't override it just set all the properties on the model
          this.view.model.set(this.view.form);
        }
        this.view.model.validationError = undefined;
        Radio.trigger('router', 'nextStep', this.view.nextStep, this.view.model.id);
      }

    }
  }
});
