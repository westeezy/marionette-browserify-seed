var matchers = require('validations/generic');

module.exports = {
  validate: function(attrs) {
    var errors = [];

    if(!matchers.pattern(attrs.email, 'email')) {
      errors.push('Please Enter a Valid Email');
    }

    if(!matchers.length(attrs.phone, {equals: 10})) {
      errors.push('Please Enter a 10 Digit Phone Number');
    }

    return errors;
  }
};
