var Handlebars = require('hbsfy/runtime'),
  $ = require('jquery');

//TODO: Make this better & use api

var self = this;
this.content = {};

function getContent() {
  return {
    "name": "Westin",
    "app_desc": "Super opionated dawg:"
  };
}

function initialize() {
  return $.ajax('/i18n/en').then(function(data) {
    self.content = data;
  });
}

//register handlebars helper
Handlebars.registerHelper('cms', function(key) {
  return self.content[key] || 'cms not found';
});

module.exports = initialize();
