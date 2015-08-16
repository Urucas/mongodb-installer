module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    mkdir: {
      all: {
        options: {
          mode: 0755,
          create: ['dist']
        },
      },
    },
    babel: {
      options: { sourceMap: false },
      dist: {
        files: [{
          cwd: './',
          src: ['lib/*.js'],
          dest: 'dist',
          ext: '.js',
          expand: true
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('build', ['mkdir','babel']);
}
