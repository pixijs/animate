module.exports = function(grunt)
{
	require('library-grunt')(grunt,
	{
        themePath: 'node_modules/yuidoc-bootstrap-theme',
		modulesPath: '<%= distFolder %>/plugins'
	});
};