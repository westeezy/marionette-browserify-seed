var matchers = require('validations/generic');

module.exports = {
  validate: function(attrs, model) {
    var errors = [];
    if(!matchers.equals(attrs.name, model.get('name'))) {
      errors.push('Name Must Match');
    }

    if(!matchers.equals(attrs.nameConfirm, 'I agree')) {
      errors.push('Please Enter the Correct Text');
    }

    return errors;
  }
};
