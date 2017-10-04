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
      img: ['htdocs/img/'],
      css: ['htdocs/css/*.css'],
      js: ['htdocs/js/*.js']
    },
    concat: {
      options: {
        separator: ';',
      },
      cssLib: {
        src: ['bower_components/normalize-css/normalize.css',
              'bower_components/magnific-popup/dist/magnific-popup.css'],
        dest: 'htdocs/css/lib.css',
      },
      css: {
        src: ['css/theme.css',
              'css/app.css'],
        dest: 'htdocs/css/app.css',
      },
      jsLib: {
        src: ['bower_components/jquery/dist/jquery.js',
              'bower_components/jquery-easing/jquery.easing.js',
              'bower_components/jquery-mousewheel/jquery.mousewheel.js',
              'bower_components/jquery.scrollTo/jquery.scrollTo.js', 
              'bower_components/magnific-popup/dist/jquery.magnific-popup.js'],
        dest: 'htdocs/js/lib.js',
      },
      js: {
        src: ['js/app.js'],
        dest: 'htdocs/js/app.js',
      },
      ie: {
        src: ['js/ie/html5shiv.js', 
              'js/ie/respond.min.js'],
        dest: 'htdocs/js/ie.js',
      }
    },
    copy: {
      fonts: {
        expand: true,
        src: 'fonts/*',
        dest: 'htdocs/',
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'htdocs/css/app.min.css': ['htdocs/css/app.css'],
          'htdocs/css/lib.min.css': ['htdocs/css/lib.css']
        }
      }
    },        
    uglify: {
      main: {
        files: {
          'htdocs/js/lib.min.js': ['htdocs/js/lib.js'],
          'htdocs/js/app.min.js': ['htdocs/js/app.js'],
          'htdocs/js/ie.min.js': ['htdocs/js/ie.js']
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
          dest: 'htdocs'                  // Destination path prefix
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
          dest: 'htdocs'                  // Destination path prefix
        }]
      }
    },
    // rename: {
    //   main: {
    //     files: [
    //       {src: ['htdocs/_img'], dest: 'htdocs/img'},
    //     ]
    //   }
    // },
    // watch: {
    //   styles: {
    //     files: ['js/*',
    //             'styl/*',
    //             'styl/base/*',
    //             'styl/modules/*',
    //             'styl/pages/*',
    //             'htdocs/*.php'],
    //     tasks: ['clean', 'stylus', 'concat'],
    //     options: {
    //       interrupt : true,
    //       atBegin : true,
    //       livereload : true
    //     }
    //   }
    // }
  });

  grunt.registerTask('default', ['concat', 'copy', 'cssmin', 'uglify', 'newer:imagemin:quick']);
  grunt.registerTask('optim', ['clean:img', 'imagemin:slow']);
};
