module.exports = (grunt) ->
  grunt.initConfig
    coffee:
      compile:
        files: [
          expand: true
          cwd: 'src'
          src: '**/*.coffee'
          dest: 'target'
          ext: '.js'
        ]
    coffeelint:
      app: 'src/**/*.coffee'
    nodemon:
      dev: 
        script: 'server.js'
    watch:
      files: ['Gruntfile.coffee', 'src/**/*.coffee']
      tasks: ['coffeelint', 'coffee', 'nodemon']
      options: 
        livereload: true

  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-nodemon'

  grunt.registerTask 'default', ['watch']
