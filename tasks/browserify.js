path = require('path'),
remapify = require('remapify');

module.exports = function(grunt, options) {
  var vendors = 'jquery underscore backbone backbone.marionette backbone.radio bootstrap'.split(' ');
  return {
    app: {
      src: 'public/js/main.js',
      dest: 'public/dist/app.js',
      options: {
        browserifyOptions: {
          debug: true,
          extensions: ['.hbs'],
          transform: ['hbsfy'],
          external: vendors
        },

        preBundleCB: function (b) {
          b.plugin(remapify, [{
            cwd: 'public/js/common/', // set the directory to look in
            src: '**/*.js', // glob for the files to remap
            expose: 'common' // this will expose `__dirname + /client/views/home.js` as `views/home.js`
          },
          {
            cwd: 'public/js/validations/', // set the directory to look in
            src: '**/*.js', // glob for the files to remap
            expose: 'validations' // this will expose `__dirname + /client/views/home.js` as `views/home.js`
          }]);
        }
      }
    },

    vendors: {
      files: {
        'public/dist/vendors.js': []
      },

      options: {
        'require': vendors
      }
    }
  };
};
