module.exports = function(grunt){
	grunt.initConfig({
		jshint: {
			all: [ 'gruntfile.js', 'daisy.js', 'tests.js'],
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				camelcase: true,
				forin: true,
				freeze: true,
				funcscope: true,
				latedef: true,
				maxparams: 5,				
			}
		},

		jasmine: {
			pivotal: {
				src: 'daisy.js',
				options: {
					specs: 'tests.js'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.registerTask('default', ['jshint', 'jasmine']);
};