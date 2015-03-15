/*
 * TODO: Find a use for this.
 */
var Backbone = require('backbone'),
    Class = require('./class');

var Store = Class.extend({

  model: Backbone.Model,
  collection: Backbone.Collection,

  constructor: function() {
    this.records = new Backbone.Collection();
    this.listenTo(this.records, 'sync', function() {
      this._hasSynced = true;
    });

    this._super.apply(this, arguments);
  },

  find: function(model) {
    var record = this.records.get(model);
    if(record) {
      return Promise.resolve(record);
    } else {
      model = this._ensureModel(model);
      return Promise.resolve(model.fetch()).then(function() {
        return this.insert(model);
      });
    }
  },
  findAll: function() {
    if(this._hasSynced) {
      return Promise.resolve(this.records);
    } else {
      return Promise.resolve(this.records.fetch()).then(function() {
        return this.records;
      });
    }
  },
  save: function(model) {
    var record = this.records.get(model);
    model = record || this._ensureModel(model);
    return Promise.resolve(model.save()).then(function() {
      if(!record) {
        this.insert(model);
      }
      return model;
    });
  },

  insert: function(model) {
    model = this.records.add(model);
    return Promise.resolve(model);
  },

  _ensureModel: function(model) {
    if(model instanceof this.model) {
      return model;
    } else if(typeof model === 'object') {
      return new this.model(model);
    } else {
      return new this.model({
        id: model
      });
    }
  }
});

module.exports = Store;
