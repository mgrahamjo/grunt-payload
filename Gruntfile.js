/*
 * grunt-payload
 * https://github.com/mgrahamjo/grunt-payload
 *
 * Copyright (c) 2015 Mike Johnson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    payload: {
      options: {
        separator: '; ',
        singleQuotes: false
      },
      single: {
        files: {
          'tmp/dist.js': ['mock/file.js', 'mock/folder/*.js']
        }
      },
      expand: {
        files: [{
          expand: true,
          src: ['mock/file.js', 'mock/folder/*.js'],
          dest: 'tmp',
          ext: '.js'
        }]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'payload', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
