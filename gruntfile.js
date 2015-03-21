module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: ['src/daisy.js', 'test/tests.js'],
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				camelcase: true,
				forin: true,
				funcscope: true,
				latedef: true,
				maxparams: 5,				
			}
		},

		jasmine: {
			pivotal: {
				src: 'src/daisy.js',
				options: {
					specs: 'test/specs.js',
					vendor: ['test/clobber.js'],
					template : require("grunt-template-jasmine-istanbul"),
					templateOptions: {
						coverage: "reports/coverage.json",
						report: [
							{
								type: "html",
								options: {
									dir: "reports/html"
								}
							},
							{
								type: "lcov",
								options: {
									dir: "reports/lcov"
								}
							},
						]
					},
				}
			}
		},

		coveralls: {
			options: { force: true },
			main_target: { src: "reports/lcov/lcov.info" }
		},

		uglify: {
			options: {
				banner: '/**\n' + 
						' *  <%= pkg.name %> - v<%= pkg.version %> \n' +
        				' *  <%= pkg.description %> \n' +
        				' *  <%= pkg.repository.url %> \n' +
        				' **/\n',
        		mangle: true
    		},
			my_target: {
				files: {
					'dist/daisy.min.js': ['src/daisy.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks("grunt-coveralls");
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['jshint', 'jasmine']);
	grunt.registerTask('build', ['jshint', 'jasmine', 'uglify']);
};