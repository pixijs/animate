module.exports = function(grunt)
{
	require('library-grunt')(grunt,
	{
		modulesPath: '<%= distFolder %>/plugins'
	});
};