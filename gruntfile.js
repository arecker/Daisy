module.exports = function(grunt){
	grunt.initConfig({
		jshint: {
			all: ['daisy.js', 'tests.js'],
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
				src: 'daisy.js',
				options: {
					specs: 'tests.js',
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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks("grunt-coveralls");
	grunt.registerTask('default', ['jshint', 'jasmine']);
};