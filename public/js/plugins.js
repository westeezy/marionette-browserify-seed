/*
 * Backbone/Application Dependencies
 */
window.$ = window.jQuery = require('jquery'); //need to set this for bootstrap :(
var Bootstrap = require('bootstrap'),
  	Backbone = require('backbone');

Backbone.$ = $; //another bit of nastiness

var Marionette = require('backbone.marionette');

//start marionette inspector has to come before app bundle and after vendor
//so right here.
if(window.__agent) {
  window.__agent.start(Backbone, Marionette);
}

/*
 * Custom Plugins
 */
var cms = require('./util/cms');


/*
 * Export and promises you need resolved before application
 */
module.exports = [cms];
