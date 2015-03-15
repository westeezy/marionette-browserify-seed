var matchers = require('validations/generic');

module.exports = {
  validate: function(attrs) {
    var errors = [];
    if(!matchers.notEmpty(attrs.name)) {
      errors.push('Please Enter a Name');
    }

    if(!matchers.pattern(attrs.age, 'number')) {
      errors.push('Please Enter a Numeric Age');
    }

    return errors;
  }
};
