module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  var tasks = require('load-grunt-configs')(grunt, {
    config: {
      src: ['tasks/*.js']
    },
    pkg: grunt.file.readJSON('package.json'),
    now: new Date().getTime()
  });

  grunt.initConfig(tasks);
  grunt.registerTask('default', ['build', 'express', 'watch']);
  grunt.registerTask('build', ['clean:build', 'jshint', 'browserify:app', 'browserify:vendors', 'clean:tmp']);
}