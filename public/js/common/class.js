/*
 * 	TODO: Document this so people know how to use it later
 */
var Backbone = require('backbone'),
    _ = require('underscore');

var Class = function(opts) {
    this.initialize(opts);
};

Class.prototype.initialize = _.noop;
_.extend(Class, {
    extend: function(protoProps, staticProps) {
        var Parent = this;
        var Child;

        //resolves how to pass through constructors
        if(!protoProps || !_.has(protoProps, 'constructor')) {
            Child = function() { Parent.apply(this, arguments); };
        } else if(CONTAINS_SUPER.test(protoProps.constructor)) {
            Child = _wrap(protoProps.constructor, Parent.prototype.constructor);
        } else {
            Child = protoProps.constructor;
        }

        //mixin static props
        _.extend(Child, Parent);
        if(staticProps) {
            _wrapAll(Child, staticProps);
        }

        //Set the prototype chain to inherit from parent, without calling
        //parent's constructor function.
        var Surrogate = function() {
            this.constructor = Child;
        };
        Surrogate.prototype = Parent.prototype;
        Child.prototype = new Surrogate();

        //mixin instance properties to subclass
        if(protoProps) {
            _wrapAll(Child.prototype, protoProps);
        }

        //conveniences
        Child.superclass = Parent;
        Child.__super__ = Parent.prototype;

        //mixin backbone events
        _wrapAll(this.prototype, Backbone.Events);

        return Child;
    }
});

module.exports = Class;

//test function decomp then if avail test for super
//http://ejohn.org/blog/simple-javascript-inheritance/ for more info on this concept
var CONTAINS_SUPER = (/xyz/.test(function(){xyz;})) ? /\b_super\b/ : /.*/; // jshint ignore:line

function _wrap(method, superMethod) {
  return function() {
    var prevSuper = this._super;
    this._super = superMethod;
    var ret = method.apply(this, arguments);
    this._super = prevSuper;
    return ret;
  };
}

function _wrapAll(dest, source) {
    var keys = _.keys(source),
        length = keys.length,
        i, name, method, superMethod, hasSuper;

    for(i = 0; i < length; i++) {
        name = keys[i];
        method = source[name];
        superMethod = dest[name];
        hasSuper = CONTAINS_SUPER.test(method);

        //determine if we need to wrap the super
        if(hasSuper && _.isFunction(method) && _.isFunction(superMethod)) {
            dest[name] = _wrap(method, superMethod);
        } else {
            dest[name] = method;
        }
    }
}
