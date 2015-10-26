'use strict';

module.exports = function(grunt) {
  var path = require('path');
  var fs = require('fs');

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    config: grunt.file.readJSON('config.json'),
    banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.

    // -- Clean Config ---------------------------------------------------------
    clean: {
      build: ['<%=config.destination.font%>','<%=config.destination.css%>','<%=config.destination.html%>/<%=config.name%>.html'],
      rename:['src/**/icons_*.svg'],
      prepare: ['<%=config.source%>'],
      process: ["<%=config.destination.html%>/<%=config.name%>.less", "<%=config.destination.html%>/<%=config.name%>.html", "<%=config.destination.temp%>"]
    },
    
    // -- concat config ------------------------------------------------------
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      less: {
        src: ['<%=config.destination.less%>/<%=config.name%>.less'],
        dest: '<%=config.destination.less%>/<%=config.name%>.less'
      },
      scss: {
        src: ['<%=config.destination.scss%>/<%=config.name%>.scss'],
        dest: '<%=config.destination.scss%>/<%=config.name%>.scss'
      },
      css: {
        src: ['<%=config.destination.css%>/<%=config.name%>.css'],
        dest: '<%=config.destination.css%>/<%=config.name%>.css'
      }
    },

    // -- copy Config ----------------------------------------------------------
    copy: {
      rename: {
        expand: true,
        cwd: '<%=config.raw_source%>/',
        src: ['**/*.svg'],
        dest: '<%=config.raw_source%>/',
        rename: function (path, name) {
          return path + name.replace(/icons_/g,"");
        }
      },
      variables: {
        files: {
          '<%=config.destination.less%>/variables.less': "<%=config.destination.html%>/<%=config.name%>.less",
        }
      },
      icons: {
        files: {
          '<%=config.destination.less%>/icons.less': "<%=config.destination.html%>/<%=config.name%>.less",
          '<%=config.destination.html%>/index.html': "<%=config.destination.html%>/<%=config.name%>.html",
        }
      }
    },

    // -- less Config ----------------------------------------------------------
    less: {
      dist: {
        files: {
          '<%=config.destination.css%>/<%=config.name%>.css': "<%=config.destination.less%>/<%=config.name%>.less"
        }
      }
    },

    // -- sass Config ----------------------------------------------------------
    sass: {
      options: {
        precision: 6,
        sourcemap: 'none', // 'auto'
        style: 'expanded',
        trace: true,
        bundleExec: false
      },
      dist: {
        files: {
          '<%=config.destination.css%>/<%=config.name%>.css': "<%=config.destination.scss%>/<%=config.name%>.scss"
        }
      }
    },

    // -- svgmin Config ----------------------------------------------------------
    svgmin: {
      options: {
          plugins: [
            { removeViewBox: false },
            { removeUselessStrokeAndFill: false },
            { convertPathData: false }
          ]
      },
      dist: {
          files: [{
              expand: true,
              cwd: '<%=config.source%>',
              src: ['**/*.svg'],
              dest: '<%=config.source%>',
              ext: '.svg'
          }]
      },
      src: {
          files: [{
              expand: true,
              cwd: '<%=config.raw_source%>',
              src: ['**/*.svg'],
              dest: '<%=config.raw_source%>',
              ext: '.svg'
          }]
      }
    },

    // -- prepareicons Config ----------------------------------------------------------
    prepareicons: {
      src: {
        options: {
          icons: '<%=config.icons_file%>',
          dest: '<%=config.source%>',
        },
        expand: true,
        cwd: '<%=config.raw_source%>',
        src: ['**/*.svg'],
        dest: '<%=config.source%>'
      }
    },

    // -- replace Config ----------------------------------------------------------
    replace: {
        bower: {
            src: ['bower.json'],
            overwrite: true, // overwrite matched source files
            replacements: [{
                from: /("version": ")([0-9\.]+)(")/g,
                to: "$1<%= pkg.version %>$3"
            }]
        },
        less: {
            src: ['<%=config.destination.less%>/variables.less'],
            overwrite: true, // overwrite matched source files
            replacements: [{
                from: /(version\s*:\s+")([0-9\.]+)(")/g,
                to: "$1<%= pkg.version %>$3"
            }]
        },
        scss: {
            src: ['<%=config.destination.scss%>/_variables.scss'],
            overwrite: true, // overwrite matched source files
            replacements: [{
                from: /(version\s*:\s+")([0-9\.]+)(")/g,
                to: "$1<%= pkg.version %>$3"
            }]
        },
        variables: {
          src: '<%=config.destination.less%>/variables.less',
          dest: '<%=config.destination.scss%>/_variables.scss',
          replacements: [{
              from: /@((?!media|include|charset|document|font-face|import|keyframes|page|supports)[a-zA-Z_]+)/gi,
              to: '$$$1'
          }]
        },
        icons: {
          src: '<%=config.destination.less%>/icons.less',
          dest: '<%=config.destination.scss%>/_icons.scss',
          replacements: [{
              from: /@((?!media|include|charset|document|font-face|import|keyframes|page|supports)[a-zA-Z_]+)/gi,
              to: '$$$1'
          },{
              from: /@\{([a-zA-Z-]+)\}/gi,
              to: '#{$$$1}'
          }, {
              from: /~"(.*)"/gi,
              to: "#{\"$1\"}"
          }]
        }
    },

    // -- webfont Config ----------------------------------------------------------
    webfont: {
      icons: {
        options: {
          types:'eot,woff2,woff,ttf,svg',
          syntax: 'bootstrap',
          stylesheet: 'less',
          font: '<%=config.name%>',
          htmlDemo: true,
          destHtml: '<%=config.destination.html%>',
          htmlDemoTemplate: '<%=config.templates.html%>',
          autoHint: true,
          relativeFontPath: '../fonts',
          hashes: false,
          ie7: false,
          template: '<%=config.templates.icons%>',
          templateOptions: '<%=config.templateOptions%>',
          rename: function(name) {
            return path.basename(name).replace(/^\d*-/, '');
          }
        },
        expand: true,
        cwd: '<%=config.source%>',
        src: ['**/*.svg'],
        dest: '<%=config.destination.font%>',
        destCss: '<%=config.destination.html%>'
      },
      variables: {
        options: {
          types:'eot,woff2,woff,ttf,svg',
          syntax: 'bootstrap',
          stylesheet: 'less',
          font: '<%=config.name%>',
          htmlDemo: true,
          destHtml: '<%=config.destination.html%>',
          htmlDemoTemplate: '<%=config.templates.html%>',
          autoHint: true,
          relativeFontPath: '../fonts',
          hashes: false,
          ie7: false,
          template: '<%=config.templates.variables%>',
          templateOptions: '<%=config.templateOptions%>',
          rename: function(name) {
            return path.basename(name).replace(/^\d*-/, '');
          }
        },
        expand: true,
        cwd: '<%=config.source%>',
        src: ['**/*.svg'],
        dest: '<%=config.destination.temp%>',
        destCss: '<%=config.destination.html%>'
      }
    }
  });

  grunt.registerMultiTask('prepareicons', 'Prepare icons', function() {
      var options = this.options({
          icons: {}
      });

      if(typeof options.icons === 'string') {
        options.icons = grunt.file.readJSON(options.icons);
      }

      var count = 1;
      var icons = {};
      for(var icon in options.icons) {
        if(options.icons[icon] === true){
          icons[icon] = count;
          count ++;
        }
      }

      var dir = options.dest;
      grunt.file.mkdir(dir);

      this.files.forEach(function (f) {
        var dest = f.dest;
  //var dir = path.dirname(dest);

        f.src.filter(function (file) {
          var slug = path.basename(file, '.svg');

          if(icons.hasOwnProperty(slug) === false){
            grunt.file.delete(file);
          } else {
            //grunt.file.mkdir(dir);
            var order = icons[slug].toString();
            if(order.length === 1){
              order = '00'+order;
            }
            if(order.length === 2){
              order = '0'+order;
            }
            dest = path.join(dir, order +'-'+slug+'.svg');

            grunt.file.copy(file, dest);
          }
        });
      });
      count = count -1;
      grunt.log.write('✔'.green + ' ' + count + ' icons prepared');
      grunt.log.writeln();
  });

  // Load npm plugins to provide necessary tasks.
  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-*']
  });

  // Default task.
  grunt.registerTask('rename', ['copy:rename', 'clean:rename']);

  grunt.registerTask('default', ['prepare', 'build']);

  grunt.registerTask('build', ['clean:build','webfont:variables','copy:variables','webfont:icons','copy:icons', 'version',  'replace:variables', 'replace:icons', 'less', 'clean:process','concat']);

  grunt.registerTask('prepare', ['clean:prepare', 'prepareicons', 'svgmin']);

  grunt.registerTask('version', [
    'replace:bower',
    'replace:less',
    'replace:scss'
  ]);
};