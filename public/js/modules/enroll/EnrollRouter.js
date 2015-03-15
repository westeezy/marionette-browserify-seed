var Backbone = require('backbone'),
    Router = require('common/router'),
    Radio = require('backbone.radio'),
    Model = require('./EnrollModel'),
    stepOneRoute = require('./stepOne/stepOneRoute'),
    stepTwoRoute = require('./stepTwo/stepTwoRoute'),
    stepThreeRoute = require('./stepThree/stepThreeRoute'),
    summaryRoute = require('./summary/summaryRoute');

var routerChannel = Radio.channel('router');

module.exports = Router.extend({
  initialize: function(options) {
    this.container = options.container;
    this.listenTo(routerChannel, {
      'nextStep': this.handleNextStep
    });
  },

  handleNextStep: function(nextStep, id) {
    Backbone.history.navigate('enroll/application/' + id + '/' + nextStep, {
      trigger: true
    });
  },

  onBeforeEnter: function() {
    this.model = new Model();
    //todo get the id in a cleaner way
    this.model.set("id", arguments[0][0]);
    this.model.fetch();
    Radio.command('header', 'add', {
      name: 'Enroll',
      path: 'enroll',
      type: 'primary'
    });

    Radio.command('header', 'activate', {
      path: 'enroll'
    });
  },

  routes: {
    'enroll/application/:id': 'stepOne',
    'enroll/application/:id/two': 'stepTwo',
    'enroll/application/:id/three': 'stepThree',
    'enroll/application/:id/summary': 'summary'
  },

  stepOne: function(id) {
    return new stepOneRoute({
      container: this.container,
      model: this.model,
      id: id
    });
  },

  stepTwo: function(id) {
    return new stepTwoRoute({
      container: this.container,
      model: this.model,
      id: id
    });
  },

  stepThree: function(id) {
    return new stepThreeRoute({
      container: this.container,
      model: this.model,
      id: id
    });
  },

  summary: function(id) {
    return new summaryRoute({
      container: this.container,
      model: this.model,
      id: id
    });
  }
});
