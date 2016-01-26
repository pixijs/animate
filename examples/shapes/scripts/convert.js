var fs = require('fs');

var map = fs.readFileSync('./graphics_map.txt');
var output = String(fs.readFileSync('./Fizzy.js'));
var bson = {};

map = String(map).split(/\n/);

map.forEach(function(line, i)
{
	var parts = line.split(" ");
	var name = "Graphic_" + i;
	bson[name] = JSON.parse(parts[1]);

	var regex = new RegExp('\\.f\\(\\"(#[A-F0-9]{6})\\"\\)\\.p\\(\\"' + parts[0].replace(/\+/g, "\\+") + '\\"\\)');
	var regexS = new RegExp('\\.f\\(\\)\\.s\\(\\"(#[A-F0-9]{6})\\",([0-9\\.]+)\\)\\.p\\(\\"' + parts[0].replace(/\+/g, "\\+") + '\\"\\)');

	if (regex.test(output))
	{
		bson[name].unshift('f', regex.exec(output)[1]);
		output = output.replace(regex, ".d(graphics." + name + ")");
	}
	else if (regexS.test(output))
	{
		var result = regexS.exec(output);
		bson[name].unshift('s', result[1], result[2]);
		output = output.replace(regexS, ".d(graphics." + name + ")");
	}
});

fs.writeFileSync('Fizzy_out.js', output);
fs.writeFileSync('Fizzy_graphics_.json', JSON.stringify(bson));