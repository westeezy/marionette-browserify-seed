var View = require('common/view'),
    Form = require('common/behaviors/form'),
    Radio = require('backbone.radio'),
    Backbone = require('backbone'),
    template = require('./templates/summary.hbs');

module.exports = View.extend({
  template: template,
  className: 'summary container fadeInRight',
  nextStep: '',
  events: {
    'click .complete': 'displayModal'
  },

  displayModal: function(e) {
    e.preventDefault();
    var self = this;
    Radio.request('modal', 'alert', {
      title: 'Confirm',
      text: 'Are you sure you want to do this Mr/s ' + this.model.get('name') + '?'
    }).then(function() {
      Backbone.history.navigate('#applications', {
        trigger: true
      });

    });
  }
});
