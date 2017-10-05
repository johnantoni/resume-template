module.exports = function(grunt) {
  require( 'load-grunt-tasks' )( grunt );

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-rename');
  grunt.loadNpmTasks('grunt-newer');

  grunt.initConfig({
    clean: {
      img: ['docs/img/'],
      css: ['docs/css/*.css'],
      js: ['docs/js/*.js']
    },
    concat: {
      options: {
        separator: ';',
      },
      cssLib: {
        src: ['node_modules/normalize-css/normalize.css',
              'node_modules/magnific-popup/dist/magnific-popup.css'],
        dest: 'docs/css/lib.css',
      },
      css: {
        src: ['css/theme.css',
              'css/app.css'],
        dest: 'docs/css/app.css',
      },
      jsLib: {
        src: ['node_modules/jquery/dist/jquery.js',
              'node_modules/jquery-easing/jquery.easing.js',
              'node_modules/jquery-mousewheel/jquery.mousewheel.js',
              'node_modules/jquery.scrollTo/jquery.scrollTo.js',
              'node_modules/magnific-popup/dist/jquery.magnific-popup.js'],
        dest: 'docs/js/lib.js',
      },
      js: {
        src: ['js/app.js'],
        dest: 'docs/js/app.js',
      },
      ie: {
        src: ['js/ie/html5shiv.js',
              'js/ie/respond.min.js'],
        dest: 'docs/js/ie.js',
      }
    },
    copy: {
      fonts: {
        expand: true,
        src: 'fonts/*',
        dest: 'docs/',
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'docs/css/app.min.css': ['docs/css/app.css'],
          'docs/css/lib.min.css': ['docs/css/lib.css']
        }
      }
    },
    uglify: {
      main: {
        files: {
          'docs/js/lib.min.js': ['docs/js/lib.js'],
          'docs/js/app.min.js': ['docs/js/app.js'],
          'docs/js/ie.min.js': ['docs/js/ie.js']
        }
      }
    },
    imagemin: {                          // Task
      quick: {                         // Another target
        options: {                       // Target options
          optimizationLevel: 0,
          svgoPlugins: [{ removeViewBox: false }]
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          src: ['img/**/*.{png,jpg,gif,svg,mp4,ogv,webm}'],   // Actual patterns to match
          dest: 'docs'                  // Destination path prefix
        }]
      },
      slow: {                         // Another target
        options: {                       // Target options
          optimizationLevel: 7,
          svgoPlugins: [{ removeViewBox: false }]
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          src: ['img/**/*.{png,jpg,gif,svg,mp4,ogv,webm}'],   // Actual patterns to match
          dest: 'docs'                  // Destination path prefix
        }]
      }
    },
    watch: {
      styles: {
        files: ['js/*',
                'css/*'],
        tasks: ['source'],
        options: {
          interrupt : true,
          atBegin : true,
          livereload : true
        }
      }
    }
  });

  grunt.registerTask('default', ['concat', 'copy', 'cssmin', 'uglify', 'newer:imagemin:quick']);
  grunt.registerTask('source', ['concat', 'copy', 'cssmin', 'uglify']);
  grunt.registerTask('optim', ['clean:img', 'imagemin:slow']);
};
