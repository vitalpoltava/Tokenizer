"use strict";

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        html2js: {
            options: {
                rename: function(path) {
                    return path.split('/').pop();
                },
                module: 'tokenizer.templates'
            },
            main: {
                src: ['templates/*.tmpl.html'],
                dest: 'templates.js'
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-html2js');

    // Default task.
    grunt.registerTask('default', ['html2js']);


};