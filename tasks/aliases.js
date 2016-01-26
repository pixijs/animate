module.exports = function(grunt)
{
	grunt.registerTask(
		'format',
		'Auto-format the JavaScript and JSON files within the project', [
			'jsbeautifier:all'
		]
	);

	grunt.registerTask(
		'default',
		'Default task to build all the library in minified concat modes', [
			'clean:all',
			'format',
			'build-debug',
			'build'
		]
	);
};